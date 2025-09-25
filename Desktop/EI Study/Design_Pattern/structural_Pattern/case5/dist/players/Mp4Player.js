"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mp4Player = void 0;
const Logger_1 = require("../services/Logger");
class Mp4Player {
    constructor() {
        this.logger = new Logger_1.Logger("Mp4Player");
    }
    playVlc(fileName) {
        // Do nothing - this player only supports MP4
    }
    playMp4(fileName) {
        this.logger.info(`Playing MP4 file: ${fileName}`);
        console.log(`Playing MP4 file: ${fileName}`);
    }
}
exports.Mp4Player = Mp4Player;
//# sourceMappingURL=Mp4Player.js.map