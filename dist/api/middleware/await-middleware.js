"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => (...args) => fn(...args).catch(args[2]);
