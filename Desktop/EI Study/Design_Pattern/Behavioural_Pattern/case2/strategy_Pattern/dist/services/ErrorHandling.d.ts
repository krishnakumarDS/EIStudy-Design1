export declare class ErrorHandler {
    private static logger;
    static handle(error: Error, context: string): void;
    static handleAsync<T>(promise: Promise<T>, context: string): Promise<T | null>;
}
//# sourceMappingURL=ErrorHandling.d.ts.map