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
  const cpu = await getCpuTemp();
  const gpu = await getGpuTemp();

  const output = { cpu, gpu };

  logger.debug("printemps temperature readings:", output);
  return output;
};

const getCpuTemp = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "cat /sys/class/thermal/thermal_zone0/temp"
  );
  const cpu = parseInt(stdout.trim()) / 1000.0;
  return cpu;
};

const getGpuTemp = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "/opt/vc/bin/vcgencmd measure_temp"
  );
  const gpu = parseFloat(stdout.trim().replace("temp=", "").replace("'C", ""));
  return gpu;
};
