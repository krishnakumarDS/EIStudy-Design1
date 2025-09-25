"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCoffee = void 0;
const Logger_1 = require("../services/Logger");
class SimpleCoffee {
    constructor() {
        this.logger = new Logger_1.Logger("SimpleCoffee");
    }
    getCost() {
        this.logger.info("Getting cost of simple coffee");
        return 5.0;
    }
    getDescription() {
        this.logger.info("Getting description of simple coffee");
        return "Simple Coffee";
    }
}
exports.SimpleCoffee = SimpleCoffee;
//# sourceMappingURL=SimpleCoffee.js.map