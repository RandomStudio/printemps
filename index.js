const { exec } = require("child_process");

let output = {};

exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
  const cpuTemp = parseInt(stdout.trim()) / 1000.0;
  output = { ...output, cpuTemp };

  exec("/opt/vc/bin/vcgencmd measure_temp", (err, stdout, stderr) => {
    const gpuTemp = parseFloat(stdout.trim().replace("temp=", "").replace("'C", ""));
    output = { ...output, gpuTemp };

    outputFinalResults(output);

  })
});

function outputFinalResults(data) {
  console.log({ ...data });
}