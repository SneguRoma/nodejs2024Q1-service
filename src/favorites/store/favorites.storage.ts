import { Injectable } from '@nestjs/common';
import { IFavStorage } from '../interfaces/favs-storage.interface';
import { IFavorites } from '../interfaces/favs.nterfaces';
import { favoritesStore } from './favorites';

@Injectable()
export class FavoritesStorage implements IFavStorage {
  favs: IFavorites = favoritesStore;

  addTrack(id: string): void {
    this.favs.tracks.push(id);
  }
  addAlbum(id: string): void {
    this.favs.albums.push(id);
  }
  addArtist(id: string): void {
    this.favs.artists.push(id);
  }
  deleteTrack(id: string): number {
    const findItem = this.favs.tracks.find((item) => item === id);
    if (!findItem) return 404;
    const newTracks = this.favs.tracks.filter((trackId) => trackId !== id);
    this.favs.tracks = newTracks;
    return 204;
  }
  deleteAlbum(id: string): number {
    const findItem = this.favs.albums.find((item) => item === id);
    if (!findItem) return 404;
    const newAlbums = this.favs.albums.filter((albumId) => albumId !== id);
    this.favs.albums = newAlbums;
    return 204;
  }
  deleteArtist(id: string): number {
    const findItem = this.favs.artists.find((item) => item === id);
    if (!findItem) return 404;
    const newArtists = this.favs.artists.filter((artistId) => artistId !== id);
    this.favs.artists = newArtists;
    return 204;
  }

  get(): IFavorites {
    return this.favs;
  }
}
