"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAdapter = void 0;
const VlcPlayer_1 = require("../players/VlcPlayer");
const Mp4Player_1 = require("../players/Mp4Player");
const Logger_1 = require("../services/Logger");
class MediaAdapter {
    constructor(audioType) {
        this.logger = new Logger_1.Logger("MediaAdapter");
        if (audioType.toLowerCase() === "vlc") {
            this.advancedMusicPlayer = new VlcPlayer_1.VlcPlayer();
        }
        else if (audioType.toLowerCase() === "mp4") {
            this.advancedMusicPlayer = new Mp4Player_1.Mp4Player();
        }
        else {
            throw new Error(`Unsupported media type: ${audioType}`);
        }
    }
    play(audioType, fileName) {
        this.logger.info(`Adapting ${audioType} format for playback`);
        if (audioType.toLowerCase() === "vlc") {
            this.advancedMusicPlayer.playVlc(fileName);
        }
        else if (audioType.toLowerCase() === "mp4") {
            this.advancedMusicPlayer.playMp4(fileName);
        }
    }
}
exports.MediaAdapter = MediaAdapter;
//# sourceMappingURL=MediaAdapter.js.map