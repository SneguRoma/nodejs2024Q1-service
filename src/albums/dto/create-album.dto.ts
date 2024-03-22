import { Artist } from 'src/artists/entities/artist.entity';

export class CreateAlbumDto {
  name: string;
  year: number;
  artistId?: string | null | Artist; // refers to Artist
}
