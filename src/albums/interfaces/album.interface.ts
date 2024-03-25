//import { Artist } from 'src/artists/entities/artist.entity';

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}
