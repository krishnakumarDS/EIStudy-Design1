"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSSubscriber = void 0;
const SubscriberType_1 = require("../models/SubscriberType");
const Logger_1 = require("../services/Logger");
class SMSSubscriber {
    constructor(name, phone) {
        this.logger = new Logger_1.Logger("SMSSubscriber");
        this.id = this.generateId();
        this.name = name;
        this.phone = phone;
    }
    update(news) {
        this.logger.info(`Sending SMS to ${this.phone} (${this.name}) about: ${news.title}`);
        console.log(`[SMS] ${this.name} (${this.phone}): ${news.title}`);
        console.log(`  ${news.content.substring(0, 50)}${news.content.length > 50 ? "..." : ""}`);
    }
    getSubscriberType() {
        return SubscriberType_1.SubscriberType.SMS;
    }
    getContactInfo() {
        return this.phone;
    }
    generateId() {
        return ("sms_" + Date.now().toString(36) + Math.random().toString(36).substr(2));
    }
}
exports.SMSSubscriber = SMSSubscriber;
//# sourceMappingURL=SMSSubscriber.js.map