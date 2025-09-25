import { ITextFormatter } from "./interfaces/ITextFormatter";
export declare class TextFormatterContext {
    private formatter;
    private logger;
    constructor(formatter: ITextFormatter);
    setFormatter(formatter: ITextFormatter): void;
    formatText(text: string): string;
    getCurrentFormatterName(): string;
}
//# sourceMappingURL=TextFormatterContext.d.ts.map