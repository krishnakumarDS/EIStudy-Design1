"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpperCaseFormatter = void 0;
const Logger_1 = require("../services/Logger");
class UpperCaseFormatter {
    constructor() {
        this.logger = new Logger_1.Logger("UpperCaseFormatter");
    }
    format(text) {
        this.logger.info(`Converting text to uppercase: "${text}"`);
        return text.toUpperCase();
    }
    getName() {
        return "Uppercase";
    }
}
exports.UpperCaseFormatter = UpperCaseFormatter;
//# sourceMappingURL=UpperCaseFormatter.js.map