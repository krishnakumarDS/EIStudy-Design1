"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseFormatter = void 0;
const Logger_1 = require("../services/Logger");
class ReverseFormatter {
    constructor() {
        this.logger = new Logger_1.Logger("ReverseFormatter");
    }
    format(text) {
        this.logger.info(`Reversing text: "${text}"`);
        return text.split("").reverse().join("");
    }
    getName() {
        return "Reverse";
    }
}
exports.ReverseFormatter = ReverseFormatter;
//# sourceMappingURL=ReverseFormatter.js.map