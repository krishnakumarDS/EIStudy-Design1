"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VlcPlayer = void 0;
const Logger_1 = require("../services/Logger");
class VlcPlayer {
    constructor() {
        this.logger = new Logger_1.Logger("VlcPlayer");
    }
    playVlc(fileName) {
        this.logger.info(`Playing VLC file: ${fileName}`);
        console.log(`Playing VLC file: ${fileName}`);
    }
    playMp4(fileName) {
        // Do nothing - this player only supports VLC
    }
}
exports.VlcPlayer = VlcPlayer;
//# sourceMappingURL=VlcPlayer.js.map