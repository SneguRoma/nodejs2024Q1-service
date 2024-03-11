import { IFavorites } from './favs.nterfaces';

export interface IFavStorage {
  get(): IFavorites;
  addTrack(id: string): void;
  addAlbum(id: string): void;
  addArtist(id: string): void;
  deleteTrack(id: string): number;
  deleteAlbum(id: string): number;
  deleteArtist(id: string): number;
  favs: IFavorites;
}
