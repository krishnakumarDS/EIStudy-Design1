"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationManager = void 0;
const ConfigItem_1 = require("./models/ConfigItem");
const ConfigType_1 = require("./models/ConfigType");
const Logger_1 = require("./services/Logger");
const ConfigSerializer_1 = require("./ConfigSerializer");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ConfigurationManager {
    constructor() {
        this.logger = Logger_1.Logger.getInstance("ConfigurationManager");
        this.serializer = new ConfigSerializer_1.ConfigSerializer();
        this.configFilePath = path.join(__dirname, "..", "config.json");
        this.config = new Map();
        this.loadDefaultConfig();
        this.loadConfigFromFile();
    }
    static getInstance() {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
        }
        return ConfigurationManager.instance;
    }
    loadDefaultConfig() {
        this.logger.info("Loading default configuration");
        // Add default configuration items
        this.config.set("app.name", new ConfigItem_1.ConfigItem("app.name", "Design Patterns Demo", ConfigType_1.ConfigType.STRING, "Application name"));
        this.config.set("app.version", new ConfigItem_1.ConfigItem("app.version", "1.0.0", ConfigType_1.ConfigType.STRING, "Application version"));
        this.config.set("app.debug", new ConfigItem_1.ConfigItem("app.debug", "false", ConfigType_1.ConfigType.BOOLEAN, "Debug mode flag"));
        this.config.set("server.port", new ConfigItem_1.ConfigItem("server.port", "3000", ConfigType_1.ConfigType.NUMBER, "Server port number"));
        this.config.set("database.enabled", new ConfigItem_1.ConfigItem("database.enabled", "true", ConfigType_1.ConfigType.BOOLEAN, "Database enabled flag"));
    }
    loadConfigFromFile() {
        try {
            if (fs.existsSync(this.configFilePath)) {
                this.logger.info(`Loading configuration from file: ${this.configFilePath}`);
                const configData = fs.readFileSync(this.configFilePath, "utf8");
                const fileConfig = this.serializer.deserialize(configData);
                // Merge file config with default config (file config takes precedence)
                fileConfig.forEach((item, key) => {
                    this.config.set(key, item);
                });
                this.logger.info("Configuration loaded successfully from file");
            }
            else {
                this.logger.info("No configuration file found, using defaults");
                this.saveConfigToFile();
            }
        }
        catch (error) {
            this.logger.error(`Failed to load configuration from file: ${error}`);
            this.logger.info("Using default configuration");
        }
    }
    saveConfigToFile() {
        try {
            const configData = this.serializer.serialize(this.config);
            fs.writeFileSync(this.configFilePath, configData, "utf8");
            this.logger.info(`Configuration saved to file: ${this.configFilePath}`);
        }
        catch (error) {
            this.logger.error(`Failed to save configuration to file: ${error}`);
        }
    }
    getConfig(key) {
        return this.config.get(key);
    }
    setConfig(key, value, type, description = "") {
        this.config.set(key, new ConfigItem_1.ConfigItem(key, value, type, description));
        this.saveConfigToFile();
        this.logger.info(`Configuration updated: ${key} = ${value}`);
    }
    removeConfig(key) {
        if (this.config.has(key)) {
            this.config.delete(key);
            this.saveConfigToFile();
            this.logger.info(`Configuration removed: ${key}`);
            return true;
        }
        return false;
    }
    getAllConfig() {
        return new Map(this.config);
    }
    resetToDefaults() {
        this.config.clear();
        this.loadDefaultConfig();
        this.saveConfigToFile();
        this.logger.info("Configuration reset to defaults");
    }
}
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map