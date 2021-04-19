const { exec } = require("child_process");

exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
  console.log({stdout});
});