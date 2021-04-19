# Pi Printemps

Print the temps (temperature readings) for Raspberry Pi. Created in spring 2021, hence the pun.

## Usage

### Install

```
npm i pi-printemps
```

Import as a module

```
import { getTemps } from "pi-printemps"
```

or using require

```
const { getTemps } = require("pi-printemps")
```

### Run async

Simple example

```
const { gpu, cpu } = await getTemps();
```
