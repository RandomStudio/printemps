const { exec } = require("child_process");

exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
  const cpuTemp = parseInt(stdout.trim()) / 1000.0;
  console.log({ cpuTemp });
});

