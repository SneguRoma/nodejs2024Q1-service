import { CreateArtistDto } from '../dto/create-artist.dto';

import { UpdateArtistDto } from '../dto/update-artist.dto';

import { IArtist } from './artist.interface';

export interface IArtistStorage {
  get(): IArtist[];
  getArtist(id: string): IArtist;
  createArtist(createArtist: CreateArtistDto): IArtist;
  updateArtist(updateArtistDto: UpdateArtistDto, id: string): IArtist;
  deleteArtist(id: string): void;
  artists: IArtist[];
}
