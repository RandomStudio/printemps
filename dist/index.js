"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemps = void 0;
const defaults_1 = __importDefault(require("./defaults"));
const parse_strings_in_object_1 = __importDefault(require("parse-strings-in-object"));
const rc_1 = __importDefault(require("rc"));
const log4js_1 = require("log4js");
const child_process_1 = require("child_process");
const config = parse_strings_in_object_1.default(rc_1.default("printemps", defaults_1.default));
const logger = log4js_1.getLogger("printemps");
logger.level = config.loglevel;
logger.info("started with config", config);
const getTemps = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        child_process_1.exec("cat /sys/class/thermal/thermal_zone0/temp", (err, stdout, stderr) => {
            const cpu = parseInt(stdout.trim()) / 1000.0;
            child_process_1.exec("/opt/vc/bin/vcgencmd measure_temp", (err, stdout, stderr) => {
                const gpu = parseFloat(stdout.trim().replace("temp=", "").replace("'C", ""));
                const output = { cpu, gpu };
                resolve(output);
            });
        });
    });
});
exports.getTemps = getTemps;
//# sourceMappingURL=index.js.map