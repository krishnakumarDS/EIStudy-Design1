"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeDecorator = void 0;
const Logger_1 = require("../services/Logger");
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
        this.logger = new Logger_1.Logger("CoffeeDecorator");
    }
    getCost() {
        return this.coffee.getCost();
    }
    getDescription() {
        return this.coffee.getDescription();
    }
}
exports.CoffeeDecorator = CoffeeDecorator;
//# sourceMappingURL=CoffeeDecorator.js.map