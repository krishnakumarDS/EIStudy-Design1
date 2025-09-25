import { ITextFormatter } from "../interfaces/ITextFormatter";
import { Logger } from "../services/Logger";

export class ReverseFormatter implements ITextFormatter {
  private logger: Logger = new Logger("ReverseFormatter");

  format(text: string): string {
    this.logger.info(`Reversing text: "${text}"`);
    return text.split("").reverse().join("");
  }

  getName(): string {
    return "Reverse";
  }
}
