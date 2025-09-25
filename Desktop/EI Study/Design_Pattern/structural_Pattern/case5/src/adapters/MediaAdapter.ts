import { IMediaPlayer } from "../interfaces/IMediaPlayer";
import { IAdvancedMediaPlayer } from "../interfaces/IAdvancedMediaPlayer";
import { VlcPlayer } from "../players/VlcPlayer";
import { Mp4Player } from "../players/Mp4Player";
import { Logger } from "../services/Logger";

export class MediaAdapter implements IMediaPlayer {
  private advancedMusicPlayer: IAdvancedMediaPlayer;
  private logger: Logger = new Logger("MediaAdapter");

  constructor(audioType: string) {
    if (audioType.toLowerCase() === "vlc") {
      this.advancedMusicPlayer = new VlcPlayer();
    } else if (audioType.toLowerCase() === "mp4") {
      this.advancedMusicPlayer = new Mp4Player();
    } else {
      throw new Error(`Unsupported media type: ${audioType}`);
    }
  }

  play(audioType: string, fileName: string): void {
    this.logger.info(`Adapting ${audioType} format for playback`);

    if (audioType.toLowerCase() === "vlc") {
      this.advancedMusicPlayer.playVlc(fileName);
    } else if (audioType.toLowerCase() === "mp4") {
      this.advancedMusicPlayer.playMp4(fileName);
    }
  }
}
