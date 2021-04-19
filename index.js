const { exec } = require("child_process");

exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
  const cpuTemp = parseInt(stdout.trim()) / 1000.0;
  console.log({ cpuTemp });
});

exec("/opt/vc/bin/vcgencmd measure_temp", (err, stdout, stderr) => {
  const gpuTemp = parseFloat(stdout.trim().replace("temp=", "").replace("'C", ""));
  console.log({ gpuTemp });
})