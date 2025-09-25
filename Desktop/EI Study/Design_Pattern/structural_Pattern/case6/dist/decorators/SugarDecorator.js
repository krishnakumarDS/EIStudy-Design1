"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarDecorator = void 0;
const CoffeeDecorator_1 = require("./CoffeeDecorator");
const Logger_1 = require("../services/Logger");
class SugarDecorator extends CoffeeDecorator_1.CoffeeDecorator {
    constructor() {
        super(...arguments);
        this.logger = new Logger_1.Logger("SugarDecorator");
    }
    getCost() {
        this.logger.info("Adding sugar cost");
        return super.getCost() + 0.5;
    }
    getDescription() {
        this.logger.info("Adding sugar to description");
        return super.getDescription() + ", Sugar";
    }
}
exports.SugarDecorator = SugarDecorator;
//# sourceMappingURL=SugarDecorator.js.map