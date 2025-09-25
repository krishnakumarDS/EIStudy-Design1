"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(context = "App") {
        this.context = context;
    }
    static getInstance(context) {
        if (!Logger.instance) {
            Logger.instance = new Logger(context);
        }
        return Logger.instance;
    }
    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] [${this.context}]: ${message}`;
    }
    info(message) {
        console.log(this.formatMessage("INFO", message));
    }
    warn(message) {
        console.warn(this.formatMessage("WARN", message));
    }
    error(message) {
        console.error(this.formatMessage("ERROR", message));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map