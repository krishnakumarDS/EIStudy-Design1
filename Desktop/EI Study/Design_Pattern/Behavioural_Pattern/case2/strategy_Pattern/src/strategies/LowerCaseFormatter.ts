import { ITextFormatter } from "../interfaces/ITextFormatter";
import { Logger } from "../services/Logger";

export class LowerCaseFormatter implements ITextFormatter {
  private logger: Logger = new Logger("LowerCaseFormatter");

  format(text: string): string {
    this.logger.info(`Converting text to lowercase: "${text}"`);
    return text.toLowerCase();
  }

  getName(): string {
    return "Lowercase";
  }
}
