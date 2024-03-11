import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { IAlbum } from './album.interface';

export interface IAlbumsStorage {
  get(): IAlbum[];
  getAlbum(id: string): IAlbum;
  createAlbum(createAlbum: CreateAlbumDto): IAlbum;
  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string): IAlbum;
  deleteAlbum(id: string): void;
  deleteArtist(id: string): void;
  albums: IAlbum[];
}
