import { ICoffee } from "../interfaces/ICoffee";
import { Logger } from "../services/Logger";

export class SimpleCoffee implements ICoffee {
  private logger: Logger = new Logger("SimpleCoffee");

  getCost(): number {
    this.logger.info("Getting cost of simple coffee");
    return 5.0;
  }

  getDescription(): string {
    this.logger.info("Getting description of simple coffee");
    return "Simple Coffee";
  }
}
