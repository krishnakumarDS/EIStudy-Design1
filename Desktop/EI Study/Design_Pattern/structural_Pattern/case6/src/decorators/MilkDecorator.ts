import { CoffeeDecorator } from "./CoffeeDecorator";

export class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    this.logger.info("Adding milk cost");
    return super.getCost() + 1.5;
  }

  getDescription(): string {
    this.logger.info("Adding milk to description");
    return super.getDescription() + ", Milk";
  }
}
