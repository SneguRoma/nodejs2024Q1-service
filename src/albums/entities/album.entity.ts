import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from '../interfaces/album.interface';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(partial: Partial<Album>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
