import defaults from "./defaults";
import parse from "parse-strings-in-object";
import rc from "rc";
import { getLogger } from "log4js";
import { exec } from "child_process";

const config: typeof defaults = parse(rc("printemps", defaults));

const logger = getLogger("printemps");
logger.level = config.loglevel;

logger.info("started with config", config);

interface TempData {
  cpu: number;
  gpu: number;
}

export const getTemps = async (): Promise<TempData> =>
  new Promise((resolve, reject) => {
    exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
      const cpu = parseInt(stdout.trim()) / 1000.0;

      exec("/opt/vc/bin/vcgencmd measure_temp", (err, stdout, stderr) => {
        const gpu = parseFloat(
          stdout.trim().replace("temp=", "").replace("'C", "")
        );
        const output = { cpu, gpu };

        logger.info("printemps temperature readings:", output);
        resolve(output);
      });
    });
  });
