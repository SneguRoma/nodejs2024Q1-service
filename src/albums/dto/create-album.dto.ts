import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
//import { Artist } from 'src/artists/entities/artist.entity';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId?: string | null; // refers to Artist
}
