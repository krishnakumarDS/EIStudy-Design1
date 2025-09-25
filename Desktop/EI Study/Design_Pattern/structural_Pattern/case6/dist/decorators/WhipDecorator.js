"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhipDecorator = void 0;
const CoffeeDecorator_1 = require("./CoffeeDecorator");
const Logger_1 = require("../services/Logger");
class WhipDecorator extends CoffeeDecorator_1.CoffeeDecorator {
    constructor() {
        super(...arguments);
        this.logger = new Logger_1.Logger("WhipDecorator");
    }
    getCost() {
        this.logger.info("Adding whip cost");
        return super.getCost() + 2.0;
    }
    getDescription() {
        this.logger.info("Adding whip to description");
        return super.getDescription() + ", Whip";
    }
}
exports.WhipDecorator = WhipDecorator;
//# sourceMappingURL=WhipDecorator.js.map