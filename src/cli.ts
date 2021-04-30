#!/usr/bin/env node
import { getTemps } from "./lib";

(async () => {
  const stats = await getTemps();
  console.log({ ...stats });
})();
