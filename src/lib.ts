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

interface PiStats {
  cpu: number;
  gpu: number;
  armClockSpeedMhz: number;
  coreVolts: number;
  throttled: {
    rawResult: string;
    isNominal: boolean;
    hexValue: number;
  };
}

export const getTemps = async (): Promise<PiStats> => {
  const cpu = await getCpuTemp();
  const gpu = await getGpuTemp();
  const armClockSpeedMhz = await getArmClockSpeedMhz();
  const coreVolts = await getCoreVolts();
  const throttled = await getThrottled();

  const output = {
    cpu,
    gpu,
    armClockSpeedMhz,
    coreVolts,
    throttled: { ...throttled },
  };

  logger.debug("printemps temperature readings:", output);
  return output;
};

const getCpuTemp = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "cat /sys/class/thermal/thermal_zone0/temp"
  );
  return parseInt(stdout.trim()) / 1000.0;
};

const getGpuTemp = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "/opt/vc/bin/vcgencmd measure_temp"
  );
  return parseFloat(stdout.trim().replace("temp=", "").replace("'C", ""));
};

const getArmClockSpeedMhz = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "/opt/vc/bin/vcgencmd measure_clock arm"
  );
  return (
    parseFloat(stdout.trim().replace("frequency(48)=", "")) / Math.pow(10, 6)
  );
};

const getCoreVolts = async (): Promise<number> => {
  const { stdout, stderr } = await execPromise(
    "/opt/vc/bin/vcgencmd measure_volts core"
  );
  return parseFloat(stdout.trim().replace("volt=", "").replace("V", ""));
};

const getThrottled = async () => {
  const { stdout, stderr } = await execPromise(
    "/opt/vc/bin/vcgencmd get_throttled"
  );
  const hexValue = parseInt(stdout.trim().replace("throttled=", ""), 16);
  return {
    rawResult: stdout,
    hexValue,
    isNominal: hexValue === 0x0,
  };
};
