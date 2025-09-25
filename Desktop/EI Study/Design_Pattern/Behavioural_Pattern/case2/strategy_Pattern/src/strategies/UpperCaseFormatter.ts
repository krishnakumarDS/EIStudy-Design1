import { ITextFormatter } from "../interfaces/ITextFormatter";
import { Logger } from "../services/Logger";

export class UpperCaseFormatter implements ITextFormatter {
  private logger: Logger = new Logger("UpperCaseFormatter");

  format(text: string): string {
    this.logger.info(`Converting text to uppercase: "${text}"`);
    return text.toUpperCase();
  }

  getName(): string {
    return "Uppercase";
  }
}
