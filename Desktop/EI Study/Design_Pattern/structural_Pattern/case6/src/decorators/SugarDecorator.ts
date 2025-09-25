import { CoffeeDecorator } from "./CoffeeDecorator";
import { Logger } from "../services/Logger";

export class SugarDecorator extends CoffeeDecorator {
  protected logger: Logger = new Logger("SugarDecorator");

  getCost(): number {
    this.logger.info("Adding sugar cost");
    return super.getCost() + 0.5;
  }

  getDescription(): string {
    this.logger.info("Adding sugar to description");
    return super.getDescription() + ", Sugar";
  }
}
