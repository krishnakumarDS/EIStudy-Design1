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
exports.MediaPlayerApp = void 0;
const AudioPlayer_1 = require("./players/AudioPlayer");
const Logger_1 = require("./services/Logger");
const InputValidator_1 = require("./services/InputValidator");
const ErrorHandler_1 = require("./services/ErrorHandler");
const readline = __importStar(require("readline"));
class MediaPlayerApp {
    constructor() {
        this.audioPlayer = new AudioPlayer_1.AudioPlayer();
        this.logger = new Logger_1.Logger("MediaPlayerApp");
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async run() {
        this.logger.info("Starting Media Player Application");
        try {
            await this.showMainMenu();
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Main Application Loop");
        }
        finally {
            this.rl.close();
            this.logger.info("Application terminated");
        }
    }
    async showMainMenu() {
        let running = true;
        while (running) {
            try {
                console.log("\n=== Media Player ===");
                console.log("1. Play Media");
                console.log("2. Supported Formats");
                console.log("3. Exit");
                const choice = await this.promptUser("Enter your choice (1-3): ");
                InputValidator_1.InputValidator.validateChoice(choice, ["1", "2", "3"]);
                switch (choice) {
                    case "1":
                        await this.playMedia();
                        break;
                    case "2":
                        await this.showSupportedFormats();
                        break;
                    case "3":
                        running = false;
                        break;
                }
            }
            catch (error) {
                ErrorHandler_1.ErrorHandler.handle(error, "Main Menu");
                console.log(`Error: ${error.message}`);
            }
        }
    }
    async playMedia() {
        console.log("\n=== Play Media ===");
        console.log("Available formats:");
        console.log("1. MP3");
        console.log("2. VLC");
        console.log("3. MP4");
        const formatChoice = await this.promptUser("Select format (1-3): ");
        InputValidator_1.InputValidator.validateChoice(formatChoice, ["1", "2", "3"]);
        let format;
        switch (formatChoice) {
            case "1":
                format = "mp3";
                break;
            case "2":
                format = "vlc";
                break;
            case "3":
                format = "mp4";
                break;
            default:
                throw new Error("Invalid format choice");
        }
        const fileName = await this.promptUser("Enter file name: ");
        InputValidator_1.InputValidator.validateFileName(fileName);
        try {
            console.log("\nPlaying media...");
            this.audioPlayer.play(format, fileName);
        }
        catch (error) {
            ErrorHandler_1.ErrorHandler.handle(error, "Play Media");
            throw error;
        }
    }
    async showSupportedFormats() {
        console.log("\n=== Supported Formats ===");
        console.log("MP3: Built-in support (no adapter needed)");
        console.log("VLC: Supported via MediaAdapter");
        console.log("MP4: Supported via MediaAdapter");
        await this.promptUser("\nPress Enter to continue...");
    }
    promptUser(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
}
exports.MediaPlayerApp = MediaPlayerApp;
//# sourceMappingURL=app.js.map