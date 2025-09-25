"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = void 0;
const MediaAdapter_1 = require("../adapters/MediaAdapter");
const Logger_1 = require("../services/Logger");
class AudioPlayer {
    constructor() {
        this.logger = new Logger_1.Logger("AudioPlayer");
        this.mediaAdapter = null;
    }
    play(audioType, fileName) {
        this.logger.info(`Playing ${audioType} file: ${fileName}`);
        // Built-in support for MP3 format
        if (audioType.toLowerCase() === "mp3") {
            console.log(`Playing MP3 file: ${fileName}`);
            return;
        }
        // Use adapter for other formats
        if (audioType.toLowerCase() === "vlc" ||
            audioType.toLowerCase() === "mp4") {
            this.mediaAdapter = new MediaAdapter_1.MediaAdapter(audioType);
            this.mediaAdapter.play(audioType, fileName);
            return;
        }
        console.log(`Invalid media. ${audioType} format not supported`);
    }
}
exports.AudioPlayer = AudioPlayer;
//# sourceMappingURL=AudioPlayer.js.map