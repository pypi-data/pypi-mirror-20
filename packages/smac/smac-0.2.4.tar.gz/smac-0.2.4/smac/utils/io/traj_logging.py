__author__ = "Marius Lindauer"
__copyright__ = "Copyright 2016, ML4AAD"
__license__ = "3-clause BSD"

import os
import sys
import logging
import json
import typing

from ConfigSpace.configuration_space import ConfigurationSpace, Configuration
from ConfigSpace.hyperparameters import FloatHyperparameter, IntegerHyperparameter


class TrajLogger(object):

    """
        writes trajectory logs files 

        Attributes
        ----------
        logger : Logger oject
    """

    def __init__(self, output_dir, stats):
        """
        Constructor 

        creates output directory if not exists already

        Arguments
        ---------
        output_dir: str
            directory for logging (or None to disable logging)
        stats: Stats()
            Stats object
        """
        self.stats = stats
        self.logger = logging.getLogger("TrajLogger")

        self.output_dir = output_dir
        if output_dir is None:
            self.logger.info("No output directory for trajectory logging specified -- trajectory will not be logged.")

        else:
            if not os.path.isdir(output_dir):
                try:
                    os.makedirs(output_dir)
                except OSError:
                    self.logger.error(
                        "Could not make output directory: %s" % (output_dir))
                    sys.exit(3)
            
    
            self.old_traj_fn = os.path.join(output_dir, "traj_old.csv")
            if not os.path.isfile(self.old_traj_fn):
                with open(self.old_traj_fn, "w") as fp:
                    fp.write(
                        '"CPU Time Used","Estimated Training Performance","Wallclock Time","Incumbent ID","Automatic Configurator (CPU) Time","Configuration..."\n')
    
            self.aclib_traj_fn = os.path.join(output_dir, "traj_aclib2.json")

        self.trajectory = []

    def add_entry(self, train_perf, incumbent_id, incumbent):
        """
            adds entries to trajectory files (several formats) with using the
            same timestamps for each entry

            Parameters
            ----------
            train_perf: float
                estimated performance on training (sub)set 
            incumbent_id: int
                id of incumbent
            incumbent: Configuration()
                current incumbent configuration
        """
        ta_time_used = self.stats.ta_time_used
        wallclock_time = self.stats.get_used_wallclock_time()
        self.trajectory.append([train_perf, incumbent_id, incumbent,
                                ta_time_used, wallclock_time])
        if self.output_dir is not None:
            self._add_in_old_format(train_perf, incumbent_id, incumbent,
                                    ta_time_used, wallclock_time)
            self._add_in_aclib_format(train_perf, incumbent_id, incumbent,
                                      ta_time_used, wallclock_time)

    def _add_in_old_format(self, train_perf, incumbent_id, incumbent,
                           ta_time_used, wallclock_time):
        """
            adds entries to old SMAC2-like trajectory file

            Parameters
            ----------
            train_perf: float
                estimated performance on training (sub)set 
            incumbent_id: int
                id of incumbent
            incumbent: Configuration()
                current incumbent configuration
            ta_time_used: float
                CPU time used by the target algorithm
            wallclock_time: float
                wallclock time used so far
        """

        conf = []
        for p in incumbent:
            if not incumbent[p] is None:
                conf.append("%s='%s'" % (p, repr(incumbent[p])))

        with open(self.old_traj_fn, "a") as fp:
            fp.write("%f, %f, %f, %d, %f, %s\n" % (
                ta_time_used,
                train_perf,
                wallclock_time,
                incumbent_id,
                wallclock_time - ta_time_used,
                ", ".join(conf)
            ))

    def _add_in_aclib_format(self, train_perf, incumbent_id, incumbent,
                             ta_time_used, wallclock_time):
        """
            adds entries to AClib2-like trajectory file

            Parameters
            ----------
            train_perf: float
                estimated performance on training (sub)set 
            incumbent_id: int
                id of incumbent
            incumbent: Configuration()
                current incumbent configuration
            ta_time_used: float
                CPU time used by the target algorithm
            wallclock_time: float
                wallclock time used so far
        """

        conf = []
        for p in incumbent:
            if not incumbent[p] is None:
                conf.append("%s='%s'" % (p, repr(incumbent[p])))

        traj_entry = {"cpu_time": ta_time_used,
                      "total_cpu_time": None,  # TODO: fix this
                      "wallclock_time": wallclock_time,
                      "evaluations": self.stats.ta_runs,
                      "cost": train_perf,
                      "incumbent": conf
                      }

        with open(self.aclib_traj_fn, "a") as fp:
            json.dump(traj_entry, fp)
            fp.write("\n")

    @staticmethod
    def read_traj_aclib_format(fn: str, cs: ConfigurationSpace):
        """
            reads trajectory from file

            Parameters
            ----------
            fn: str
                filename with saved runhistory in self._add_in_aclib_format format
            cs: ConfigurationSpace
                Configuration Space to translate dict object into Confiuration object

            Returns
            -------
            trajectory: list
                each entry in the list is a dictionary of the form
                {"cpu_time": float,
                 "total_cpu_time": None, # TODO
                 "wallclock_time": float,
                 "evaluations": int
                 "cost": float,
                 "incumbent": Configuration
        """

        trajectory = []
        with open(fn) as fp:
            for line in fp:
                entry = json.loads(line)
                entry["incumbent"] = TrajLogger._convert_dict_to_config(
                    entry["incumbent"], cs=cs)
                trajectory.append(entry)

        return trajectory

    @staticmethod
    def _convert_dict_to_config(config_list: typing.List[str], cs: ConfigurationSpace):
        '''
            since we save a configurations in a dictionary str->str
            we have to try to figure out the type (int, float, str) of each parameter value

            Parameters
            ----------
            config_list: typing.List[str]
                configuration as a list of "str='str'"
            cs: ConfigurationSpace
                Configuration Space to translate dict object into Confiuration object
        '''
        config_dict = {}
        for param in config_list:
            k,v = param.split("=")
            v = v.strip("'")
            hp = cs.get_hyperparameter(k)
            if isinstance(hp, FloatHyperparameter):
                v = float(v)
            elif isinstance(hp, IntegerHyperparameter):
                v = int(v)
            config_dict[k] = v
            
        config = Configuration(configuration_space=cs, values=config_dict)
        config.origin = "External Trajectory"

        return config
