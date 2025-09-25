"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatterContext = void 0;
const Logger_1 = require("./services/Logger");
class TextFormatterContext {
    constructor(formatter) {
        this.logger = new Logger_1.Logger("TextFormatterContext");
        this.formatter = formatter;
    }
    setFormatter(formatter) {
        this.logger.info(`Changing formatter from ${this.formatter.getName()} to ${formatter.getName()}`);
        this.formatter = formatter;
    }
    formatText(text) {
        this.logger.info(`Formatting text using ${this.formatter.getName()} strategy`);
        return this.formatter.format(text);
    }
    getCurrentFormatterName() {
        return this.formatter.getName();
    }
}
exports.TextFormatterContext = TextFormatterContext;
//# sourceMappingURL=TextFormatterContext.js.map