import { AudioPlayer } from "./players/AudioPlayer";
import { Logger } from "./services/Logger";
import { InputValidator } from "./services/InputValidator";
import { ErrorHandler } from "./services/ErrorHandler";
import * as readline from "readline";

export class MediaPlayerApp {
  private audioPlayer: AudioPlayer;
  private logger: Logger;
  private rl: readline.Interface;

  constructor() {
    this.audioPlayer = new AudioPlayer();
    this.logger = new Logger("MediaPlayerApp");
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async run(): Promise<void> {
    this.logger.info("Starting Media Player Application");

    try {
      await this.showMainMenu();
    } catch (error) {
      ErrorHandler.handle(error as Error, "Main Application Loop");
    } finally {
      this.rl.close();
      this.logger.info("Application terminated");
    }
  }

  private async showMainMenu(): Promise<void> {
    let running = true;

    while (running) {
      try {
        console.log("\n=== Media Player ===");
        console.log("1. Play Media");
        console.log("2. Supported Formats");
        console.log("3. Exit");

        const choice = await this.promptUser("Enter your choice (1-3): ");
        InputValidator.validateChoice(choice, ["1", "2", "3"]);

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
      } catch (error) {
        ErrorHandler.handle(error as Error, "Main Menu");
        console.log(`Error: ${(error as Error).message}`);
      }
    }
  }

  private async playMedia(): Promise<void> {
    console.log("\n=== Play Media ===");
    console.log("Available formats:");
    console.log("1. MP3");
    console.log("2. VLC");
    console.log("3. MP4");

    const formatChoice = await this.promptUser("Select format (1-3): ");
    InputValidator.validateChoice(formatChoice, ["1", "2", "3"]);

    let format: string;
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
    InputValidator.validateFileName(fileName);

    try {
      console.log("\nPlaying media...");
      this.audioPlayer.play(format, fileName);
    } catch (error) {
      ErrorHandler.handle(error as Error, "Play Media");
      throw error;
    }
  }

  private async showSupportedFormats(): Promise<void> {
    console.log("\n=== Supported Formats ===");
    console.log("MP3: Built-in support (no adapter needed)");
    console.log("VLC: Supported via MediaAdapter");
    console.log("MP4: Supported via MediaAdapter");

    await this.promptUser("\nPress Enter to continue...");
  }

  private promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}
