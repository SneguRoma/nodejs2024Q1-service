import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorage } from './store/artists.storage';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { AlbumsStorage } from 'src/albums/store/albums.storage';

@Injectable()
export class ArtistsService {
  constructor(
    private storage: ArtistsStorage,
    private trackStorage: TracksStorage,
    private albumStorage: AlbumsStorage,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.createArtist(createArtistDto);
  }

  findAll() {
    return this.storage.get();
  }

  findOne(id: string) {
    return this.storage.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.updateArtist(updateArtistDto, id);
  }

  remove(id: string) {
    this.albumStorage.deleteArtist(id);
    this.trackStorage.deleteArtist(id);
    this.storage.deleteArtist(id);
  }
}
