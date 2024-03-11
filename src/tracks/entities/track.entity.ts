import { ITrack } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  constructor(partial: Partial<Track>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
