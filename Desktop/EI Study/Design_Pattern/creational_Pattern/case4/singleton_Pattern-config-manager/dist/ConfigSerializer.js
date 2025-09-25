"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSerializer = void 0;
const ConfigItem_1 = require("./models/ConfigItem");
const Logger_1 = require("./services/Logger");
class ConfigSerializer {
    constructor() {
        this.logger = Logger_1.Logger.getInstance("ConfigSerializer");
    }
    serialize(config) {
        this.logger.info("Serializing configuration to JSON");
        const configObj = {};
        config.forEach((item, key) => {
            configObj[key] = {
                value: item.value,
                type: item.type,
                description: item.description,
            };
        });
        return JSON.stringify(configObj, null, 2);
    }
    deserialize(jsonString) {
        this.logger.info("Deserializing configuration from JSON");
        try {
            const configObj = JSON.parse(jsonString);
            const config = new Map();
            for (const key in configObj) {
                const item = configObj[key];
                config.set(key, new ConfigItem_1.ConfigItem(key, item.value, item.type, item.description || ""));
            }
            return config;
        }
        catch (error) {
            this.logger.error(`Failed to deserialize configuration: ${error}`);
            throw new Error("Invalid configuration format");
        }
    }
}
exports.ConfigSerializer = ConfigSerializer;
//# sourceMappingURL=ConfigSerializer.js.map