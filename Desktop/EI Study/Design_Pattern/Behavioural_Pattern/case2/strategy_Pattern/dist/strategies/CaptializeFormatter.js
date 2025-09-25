"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalizeFormatter = void 0;
const Logger_1 = require("../services/Logger");
class CapitalizeFormatter {
    constructor() {
        this.logger = new Logger_1.Logger("CapitalizeFormatter");
    }
    format(text) {
        this.logger.info(`Capitalizing text: "${text}"`);
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    getName() {
        return "Capitalize";
    }
}
exports.CapitalizeFormatter = CapitalizeFormatter;
//# sourceMappingURL=CaptializeFormatter.js.map