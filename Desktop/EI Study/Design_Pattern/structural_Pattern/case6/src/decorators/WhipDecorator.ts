import { CoffeeDecorator } from "./CoffeeDecorator";
import { Logger } from "../services/Logger";

export class WhipDecorator extends CoffeeDecorator {
  protected logger: Logger = new Logger("WhipDecorator");

  getCost(): number {
    this.logger.info("Adding whip cost");
    return super.getCost() + 2.0;
  }

  getDescription(): string {
    this.logger.info("Adding whip to description");
    return super.getDescription() + ", Whip";
  }
}
