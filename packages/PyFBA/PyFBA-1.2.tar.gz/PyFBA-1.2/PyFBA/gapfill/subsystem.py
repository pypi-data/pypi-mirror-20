import os
import sys
import io

import PyFBA

# We want to find the path to the Biochemistry/SEED/ files. This is a relative path and is two levels above us
pyfbadir, tail = os.path.split(__file__)
pyfbadir, tail = os.path.split(pyfbadir)
SS_FILE_PATH = os.path.join(pyfbadir, "Biochemistry/SEED/Subsystems/SS_functions.txt")


def suggest_reactions_from_subsystems(reactions, reactions2run, ssfile=SS_FILE_PATH, threshold=0, verbose=False):
    """
    Identify a set of reactions that you should add to your model for growth based on the subsystems that are present
    in your model and their coverage.

    Read roles and subsystems from the subsystems file (which has role, subsystem, classification 1, classification 2)
    and make suggestions for missing reactions based on the subsystems that only have partial reaction coverage.

    :param threshold: The minimum fraction of the genes that are already in the subsystem for it to be added (default=0)
    :type threshold: float
    :param reactions: our reactions dictionary from parsing the model seed
    :type reactions: dict
    :param reactions2run: set of reactions that  we are going to run
    :type reactions2run: set
    :param ssfile: a subsystem file (really the output of dump_functions.pl on the seed machines)
    :type ssfile: str
    :param verbose: add additional output
    :type verbose: bool
    :return: A set of proposed reactions that should be added to your model to see if it grows
    :rtype: set
    """

    if not os.path.exists(ssfile):
        sys.stderr.write("FATAL: The subsystems file {} does not exist from working directory {}.".format(ssfile, os.getcwd()) +
                         " Please provide a path to that file\n")
        return set()

    # read the ss file
    subsys_to_roles = {}
    roles_to_subsys = {}
    with io.open(ssfile, 'r', encoding="utf-8", errors='replace') as sin:
        for l in sin:
            # If using Python2, must convert unicode object to str object
            if sys.version_info.major == 2:
                l = l.encode('utf-8', 'replace')
            if l.startswith('#'):
                continue
            p = l.strip().split("\t")
            if len(p) < 2:
                if verbose:
                    sys.stderr.write("Too few columns in subsystem file at line: {}\n".format(l.strip()))
                continue
            if p[1] not in subsys_to_roles:
                subsys_to_roles[p[1]] = set()
            for role in PyFBA.parse.roles_of_function(p[0]):
                if role not in roles_to_subsys:
                    roles_to_subsys[role] = set()
                subsys_to_roles[p[1]].add(role)
                roles_to_subsys[role].add(p[1])

    # now convert our reaction ids in reactions2run into roles
    # we have a hash with keys = reactions and values = set of roles
    reacts = PyFBA.filters.reactions_to_roles(reactions2run)

    # foreach subsystem we need to know the fraction of roles that are present
    # this is complicated by multifunctional enzymes, as if one function is present they all should be
    # but for the moment (??) we are going to assume that each peg has the multi-functional annotation
    ss_present = {}
    ss_roles = {}
    for r in reacts:
        for rl in reacts[r]:
            if rl in roles_to_subsys:
                for s in roles_to_subsys[rl]:
                    if s not in ss_present:
                        ss_present[s] = set()
                        ss_roles[s] = set()
                    ss_present[s].add(rl)
                    ss_roles[s].add(r)

    ss_fraction = {}
    for s in ss_present:
        ss_fraction[s] = 1.0 * len(ss_present[s]) / len(subsys_to_roles[s])

    if verbose:
        for s in ss_roles:
            print("{}\t{}\t{}".format(s, ss_fraction[s], ss_roles[s], "; ".join(ss_present)))

    # now we can suggest the roles that should be added to complete subsystems.
    suggested_ss = set()
    for s in ss_fraction:
        if ss_fraction[s] >= threshold:
            suggested_ss.add(s)

    if verbose:
        sys.stderr.write("Suggesting " + str(len(suggested_ss)) + " subsystems\n")

    # suggested_ss = {s for s, f in ss_fraction.items() if f>0}
    suggested_roles = set()
    for s in suggested_ss:
        for r in subsys_to_roles[s]:
            if r not in reactions2run:
                suggested_roles.add(r)

    if verbose:
        sys.stderr.write("Suggesting " + str(len(suggested_roles)) + " roles\n")

    # finally, convert the roles to reactions
    new_reactions = PyFBA.filters.roles_to_reactions(suggested_roles)

    if verbose:
        sys.stderr.write("Found " + str(len(new_reactions)) + " reactions\n")

    suggested_reactions = set()
    for rl in new_reactions:
        suggested_reactions.update(new_reactions[rl])

    if verbose:
        sys.stderr.write("Suggested reactions is " + str(len(suggested_reactions)) + "\n")

    suggested_reactions = {r for r in suggested_reactions if r in reactions and r not in reactions2run}

    if verbose:
        sys.stderr.write("Suggested reactions is " + str(len(suggested_reactions)) + "\n")

    return suggested_reactions
