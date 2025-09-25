import { ICoffee } from "../interfaces/ICoffee";
import { Logger } from "../services/Logger";
export declare abstract class CoffeeDecorator implements ICoffee {
    protected coffee: ICoffee;
    protected logger: Logger;
    constructor(coffee: ICoffee);
    getCost(): number;
    getDescription(): string;
}
//# sourceMappingURL=CoffeeDecorator.d.ts.map