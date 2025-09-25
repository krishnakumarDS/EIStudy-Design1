"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerCaseFormatter = void 0;
const Logger_1 = require("../services/Logger");
class LowerCaseFormatter {
    constructor() {
        this.logger = new Logger_1.Logger("LowerCaseFormatter");
    }
    format(text) {
        this.logger.info(`Converting text to lowercase: "${text}"`);
        return text.toLowerCase();
    }
    getName() {
        return "Lowercase";
    }
}
exports.LowerCaseFormatter = LowerCaseFormatter;
//# sourceMappingURL=LowerCaseFormatter.js.map