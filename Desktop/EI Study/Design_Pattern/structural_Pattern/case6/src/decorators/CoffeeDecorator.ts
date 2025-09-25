import { ICoffee } from "../interfaces/ICoffee";
import { Logger } from "../services/Logger";

export abstract class CoffeeDecorator implements ICoffee {
  protected coffee: ICoffee;
  protected logger: Logger;

  constructor(coffee: ICoffee) {
    this.coffee = coffee;
    this.logger = new Logger("CoffeeDecorator");
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription();
  }
}
