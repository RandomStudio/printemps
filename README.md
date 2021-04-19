# Pi Printemps

Print the temps (temperature readings) for Raspberry Pi. Created in spring 2021, hence the pun.

## Usage in your project

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

## CLI tool

You can also run a simple script straight from the command-line (NodeJS must still be installed on your system, of course):

### Install globally (optional)

```
npm install -g printemps
```

then just run:

```
printemps
```

### Run using `npx` (no install needed!)

Just run:

```
npx printemps
```
