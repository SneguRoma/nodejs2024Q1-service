import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  artistId?: string | null; // refers to Artist
}
