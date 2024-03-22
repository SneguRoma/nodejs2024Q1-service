import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null | Artist; // refers to Artist
  albumId: string | null | Album; // refers to Album
  duration: number; // integer number
}
