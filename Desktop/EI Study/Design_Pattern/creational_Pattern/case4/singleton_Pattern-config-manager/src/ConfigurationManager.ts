import { ConfigItem } from "./models/ConfigItem";
import { ConfigType } from "./models/ConfigType";
import { Logger } from "./services/Logger";
import { ConfigSerializer } from "./ConfigSerializer";
import * as fs from "fs";
import * as path from "path";

export class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: Map<string, ConfigItem>;
  private logger: Logger;
  private serializer: ConfigSerializer;
  private configFilePath: string;

  private constructor() {
    this.logger = Logger.getInstance("ConfigurationManager");
    this.serializer = new ConfigSerializer();
    this.configFilePath = path.join(__dirname, "..", "config.json");
    this.config = new Map<string, ConfigItem>();
    this.loadDefaultConfig();
    this.loadConfigFromFile();
  }

  static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  private loadDefaultConfig(): void {
    this.logger.info("Loading default configuration");

    // Add default configuration items
    this.config.set(
      "app.name",
      new ConfigItem(
        "app.name",
        "Design Patterns Demo",
        ConfigType.STRING,
        "Application name"
      )
    );

    this.config.set(
      "app.version",
      new ConfigItem(
        "app.version",
        "1.0.0",
        ConfigType.STRING,
        "Application version"
      )
    );

    this.config.set(
      "app.debug",
      new ConfigItem(
        "app.debug",
        "false",
        ConfigType.BOOLEAN,
        "Debug mode flag"
      )
    );

    this.config.set(
      "server.port",
      new ConfigItem(
        "server.port",
        "3000",
        ConfigType.NUMBER,
        "Server port number"
      )
    );

    this.config.set(
      "database.enabled",
      new ConfigItem(
        "database.enabled",
        "true",
        ConfigType.BOOLEAN,
        "Database enabled flag"
      )
    );
  }

  private loadConfigFromFile(): void {
    try {
      if (fs.existsSync(this.configFilePath)) {
        this.logger.info(
          `Loading configuration from file: ${this.configFilePath}`
        );
        const configData = fs.readFileSync(this.configFilePath, "utf8");
        const fileConfig = this.serializer.deserialize(configData);

        // Merge file config with default config (file config takes precedence)
        fileConfig.forEach((item, key) => {
          this.config.set(key, item);
        });

        this.logger.info("Configuration loaded successfully from file");
      } else {
        this.logger.info("No configuration file found, using defaults");
        this.saveConfigToFile();
      }
    } catch (error) {
      this.logger.error(`Failed to load configuration from file: ${error}`);
      this.logger.info("Using default configuration");
    }
  }

  private saveConfigToFile(): void {
    try {
      const configData = this.serializer.serialize(this.config);
      fs.writeFileSync(this.configFilePath, configData, "utf8");
      this.logger.info(`Configuration saved to file: ${this.configFilePath}`);
    } catch (error) {
      this.logger.error(`Failed to save configuration to file: ${error}`);
    }
  }

  getConfig(key: string): ConfigItem | undefined {
    return this.config.get(key);
  }

  setConfig(
    key: string,
    value: string,
    type: string,
    description: string = ""
  ): void {
    this.config.set(key, new ConfigItem(key, value, type, description));
    this.saveConfigToFile();
    this.logger.info(`Configuration updated: ${key} = ${value}`);
  }

  removeConfig(key: string): boolean {
    if (this.config.has(key)) {
      this.config.delete(key);
      this.saveConfigToFile();
      this.logger.info(`Configuration removed: ${key}`);
      return true;
    }
    return false;
  }

  getAllConfig(): Map<string, ConfigItem> {
    return new Map(this.config);
  }

  resetToDefaults(): void {
    this.config.clear();
    this.loadDefaultConfig();
    this.saveConfigToFile();
    this.logger.info("Configuration reset to defaults");
  }
}
