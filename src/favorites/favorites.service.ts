import { Injectable } from '@nestjs/common';

import { FavoritesStorage } from './store/favorites.storage';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { AlbumsStorage } from 'src/albums/store/albums.storage';
import { ArtistsStorage } from 'src/artists/store/artists.storage';

@Injectable()
export class FavoritesService {
  constructor(
    private storage: FavoritesStorage,
    private trackStorage: TracksStorage,
    private albumStorage: AlbumsStorage,
    private artistStorage: ArtistsStorage,
  ) {}

  addTrack(id: string) {
    const track = this.trackStorage.getTrack(id);
    if (track) {
      this.storage.addTrack(id);
      return 201;
    } else return 422;
  }

  addAlbum(id: string) {
    const item = this.albumStorage.getAlbum(id);
    if (item) {
      this.storage.addAlbum(id);
      return 201;
    } else return 422;
  }

  addArtist(id: string) {
    const item = this.artistStorage.getArtist(id);
    if (item) {
      this.storage.addArtist(id);
      return 201;
    } else return 422;
  }

  deleteTrack(id: string) {
    return this.storage.deleteTrack(id);
  }

  deleteAlbum(id: string) {
    return this.storage.deleteAlbum(id);
  }

  deleteArtist(id: string) {
    return this.storage.deleteArtist(id);
  }
  findAll() {
    return this.storage.get();
  }
}
