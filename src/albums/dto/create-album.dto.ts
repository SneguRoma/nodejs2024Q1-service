import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId?: string | null; // refers to Artist
}
