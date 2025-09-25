import { IAdvancedMediaPlayer } from "../interfaces/IAdvancedMediaPlayer";
import { Logger } from "../services/Logger";

export class Mp4Player implements IAdvancedMediaPlayer {
  private logger: Logger = new Logger("Mp4Player");

  playVlc(fileName: string): void {
    // Do nothing - this player only supports MP4
  }

  playMp4(fileName: string): void {
    this.logger.info(`Playing MP4 file: ${fileName}`);
    console.log(`Playing MP4 file: ${fileName}`);
  }
}
