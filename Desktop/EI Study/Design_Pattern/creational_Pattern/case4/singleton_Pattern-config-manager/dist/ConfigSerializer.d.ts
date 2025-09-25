import { ConfigItem } from "./models/ConfigItem";
export declare class ConfigSerializer {
    private logger;
    serialize(config: Map<string, ConfigItem>): string;
    deserialize(jsonString: string): Map<string, ConfigItem>;
}
//# sourceMappingURL=ConfigSerializer.d.ts.map