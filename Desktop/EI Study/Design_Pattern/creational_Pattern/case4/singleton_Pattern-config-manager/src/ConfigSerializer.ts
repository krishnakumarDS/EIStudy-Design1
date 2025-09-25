import { ConfigItem } from "./models/ConfigItem";
import { ConfigType } from "./models/ConfigType";
import { Logger } from "./services/Logger";

export class ConfigSerializer {
  private logger: Logger = Logger.getInstance("ConfigSerializer");

  serialize(config: Map<string, ConfigItem>): string {
    this.logger.info("Serializing configuration to JSON");
    const configObj: Record<string, any> = {};

    config.forEach((item, key) => {
      configObj[key] = {
        value: item.value,
        type: item.type,
        description: item.description,
      };
    });

    return JSON.stringify(configObj, null, 2);
  }

  deserialize(jsonString: string): Map<string, ConfigItem> {
    this.logger.info("Deserializing configuration from JSON");
    try {
      const configObj = JSON.parse(jsonString);
      const config = new Map<string, ConfigItem>();

      for (const key in configObj) {
        const item = configObj[key];
        config.set(
          key,
          new ConfigItem(key, item.value, item.type, item.description || "")
        );
      }

      return config;
    } catch (error) {
      this.logger.error(`Failed to deserialize configuration: ${error}`);
      throw new Error("Invalid configuration format");
    }
  }
}
