"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilkDecorator = void 0;
const CoffeeDecorator_1 = require("./CoffeeDecorator");
class MilkDecorator extends CoffeeDecorator_1.CoffeeDecorator {
    getCost() {
        this.logger.info("Adding milk cost");
        return super.getCost() + 1.5;
    }
    getDescription() {
        this.logger.info("Adding milk to description");
        return super.getDescription() + ", Milk";
    }
}
exports.MilkDecorator = MilkDecorator;
//# sourceMappingURL=MilkDecorator.js.map