"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationSubscriber = void 0;
const SubscriberType_1 = require("../models/SubscriberType");
const Logger_1 = require("../services/Logger");
class PushNotificationSubscriber {
    constructor(name, deviceId) {
        this.logger = new Logger_1.Logger("PushNotificationSubscriber");
        this.id = this.generateId();
        this.name = name;
        this.deviceId = deviceId;
    }
    update(news) {
        this.logger.info(`Sending push notification to device ${this.deviceId} (${this.name}) about: ${news.title}`);
        console.log(`[PUSH] ${this.name} (Device: ${this.deviceId}): ${news.title}`);
        console.log(`  ${news.content.substring(0, 30)}${news.content.length > 30 ? "..." : ""}`);
    }
    getSubscriberType() {
        return SubscriberType_1.SubscriberType.PUSH;
    }
    getContactInfo() {
        return this.deviceId;
    }
    generateId() {
        return ("push_" + Date.now().toString(36) + Math.random().toString(36).substr(2));
    }
}
exports.PushNotificationSubscriber = PushNotificationSubscriber;
//# sourceMappingURL=PushNotificationSubscriber.js.map