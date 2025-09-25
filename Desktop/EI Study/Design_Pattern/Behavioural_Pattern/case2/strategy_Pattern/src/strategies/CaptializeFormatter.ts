import { ITextFormatter } from "../interfaces/ITextFormatter";
import { Logger } from "../services/Logger";

export class CapitalizeFormatter implements ITextFormatter {
  private logger: Logger = new Logger("CapitalizeFormatter");

  format(text: string): string {
    this.logger.info(`Capitalizing text: "${text}"`);
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  getName(): string {
    return "Capitalize";
  }
}
