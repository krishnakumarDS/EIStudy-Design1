import { IAdvancedMediaPlayer } from "../interfaces/IAdvancedMediaPlayer";
import { Logger } from "../services/Logger";

export class VlcPlayer implements IAdvancedMediaPlayer {
  private logger: Logger = new Logger("VlcPlayer");

  playVlc(fileName: string): void {
    this.logger.info(`Playing VLC file: ${fileName}`);
    console.log(`Playing VLC file: ${fileName}`);
  }

  playMp4(fileName: string): void {
    // Do nothing - this player only supports VLC
  }
}
