#!/usr/bin/env node
import { getTemps } from "./lib";

(async () => {
  const { gpu, cpu } = await getTemps();
  console.log({ gpu, cpu });
})();
