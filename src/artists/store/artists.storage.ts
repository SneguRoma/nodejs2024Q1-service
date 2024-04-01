import { Injectable } from '@nestjs/common';
import { IArtistStorage } from '../interfaces/artists-storage.interface';
import { IArtist } from '../interfaces/artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistsStorage implements IArtistStorage {
  artists: IArtist[] = [
    {
      id: '4205d419-a068-4115-9462-c64e78ad247c',
      name: 'string',
      grammy: true,
    },
  ];

  get(): IArtist[] {
    return this.artists;
  }
  getArtist(id: string): IArtist {
    return this.artists.find((artist) => artist.id === id);
  }
  createArtist(createArtist: CreateArtistDto): IArtist {
    const newArtist = new Artist(createArtist);

    this.artists.push(newArtist);
    return newArtist;
  }
  updateArtist(updateArtistDto: UpdateArtistDto, id: string): IArtist {
    const updatedArtist = this.getArtist(id);

    updatedArtist.name = updateArtistDto.name;
    updatedArtist.grammy = updateArtistDto.grammy;

    return updatedArtist;
  }
  deleteArtist(id: string): void {
    const newArtists = this.artists.filter(
      (artist: { id: string }) => artist.id !== id,
    );
    this.artists = newArtists;
  }
}
