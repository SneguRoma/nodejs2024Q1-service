import { v4 as uuidv4 } from 'uuid';
import { IArtist } from '../interfaces/artist.interface';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
