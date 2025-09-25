import { ITextFormatter } from "./interfaces/ITextFormatter";
import { Logger } from "./services/Logger";

export class TextFormatterContext {
  private formatter: ITextFormatter;
  private logger: Logger = new Logger("TextFormatterContext");

  constructor(formatter: ITextFormatter) {
    this.formatter = formatter;
  }

  setFormatter(formatter: ITextFormatter): void {
    this.logger.info(
      `Changing formatter from ${this.formatter.getName()} to ${formatter.getName()}`
    );
    this.formatter = formatter;
  }

  formatText(text: string): string {
    this.logger.info(
      `Formatting text using ${this.formatter.getName()} strategy`
    );
    return this.formatter.format(text);
  }

  getCurrentFormatterName(): string {
    return this.formatter.getName();
  }
}
