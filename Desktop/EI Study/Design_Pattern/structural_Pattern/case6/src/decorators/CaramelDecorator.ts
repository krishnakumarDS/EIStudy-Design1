import { CoffeeDecorator } from "./CoffeeDecorator";
import { Logger } from "../services/Logger";

export class CaramelDecorator extends CoffeeDecorator {
  protected logger: Logger = new Logger("CaramelDecorator");

  getCost(): number {
    this.logger.info("Adding caramel cost");
    return super.getCost() + 2.5;
  }

  getDescription(): string {
    this.logger.info("Adding caramel to description");
    return super.getDescription() + ", Caramel";
  }
}
