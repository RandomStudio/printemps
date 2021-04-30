import util from "util";

import defaults from "./defaults";
import parse from "parse-strings-in-object";
import rc from "rc";
import { getLogger } from "log4js";
import { exec } from "child_process";
const execPromise = util.promisify(exec);

const config: typeof defaults = parse(rc("printemps", defaults));

const logger = getLogger("printemps");
logger.level = config.loglevel;

logger.info("started with config", config);

interface TempData {
  cpu: number;
  gpu: number;
}

export const getTemps = async (): Promise<TempData> => {
  let output = {};

  {
    const { stdout, stderr } = await execPromise(
      "cat /sys/class/thermal/thermal_zone0/temp"
    );
    const cpu = parseInt(stdout.toString().trim()) / 1000.0;
    output = { ...output, cpu };
  }

  {
    const { stdout, stderr } = await execPromise(
      "/opt/vc/bin/vcgencmd measure_temp"
    );
    const gpu = parseFloat(
      stdout.toString().trim().replace("temp=", "").replace("'C", "")
    );
    output = { ...output, gpu };
  }

  logger.info("printemps temperature readings:", output);
  return output as TempData;
};
