export declare class Logger {
    private static instance;
    private context;
    private constructor();
    static getInstance(context?: string): Logger;
    private formatMessage;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
//# sourceMappingURL=Logger.d.ts.map