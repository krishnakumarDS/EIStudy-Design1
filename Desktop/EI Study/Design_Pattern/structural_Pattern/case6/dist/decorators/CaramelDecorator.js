"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaramelDecorator = void 0;
const CoffeeDecorator_1 = require("./CoffeeDecorator");
const Logger_1 = require("../services/Logger");
class CaramelDecorator extends CoffeeDecorator_1.CoffeeDecorator {
    constructor() {
        super(...arguments);
        this.logger = new Logger_1.Logger("CaramelDecorator");
    }
    getCost() {
        this.logger.info("Adding caramel cost");
        return super.getCost() + 2.5;
    }
    getDescription() {
        this.logger.info("Adding caramel to description");
        return super.getDescription() + ", Caramel";
    }
}
exports.CaramelDecorator = CaramelDecorator;
//# sourceMappingURL=CaramelDecorator.js.map