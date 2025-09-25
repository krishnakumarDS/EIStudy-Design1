import { ConfigItem } from "./models/ConfigItem";
export declare class ConfigurationManager {
    private static instance;
    private config;
    private logger;
    private serializer;
    private configFilePath;
    private constructor();
    static getInstance(): ConfigurationManager;
    private loadDefaultConfig;
    private loadConfigFromFile;
    private saveConfigToFile;
    getConfig(key: string): ConfigItem | undefined;
    setConfig(key: string, value: string, type: string, description?: string): void;
    removeConfig(key: string): boolean;
    getAllConfig(): Map<string, ConfigItem>;
    resetToDefaults(): void;
}
//# sourceMappingURL=ConfigurationManager.d.ts.map