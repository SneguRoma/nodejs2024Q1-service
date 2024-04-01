import { Injectable } from '@nestjs/common';
import { IAlbumsStorage } from '../interfaces/albums-storage.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { IAlbum } from '../interfaces/album.interface';
import { albumsStore } from './albums';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsStorage implements IAlbumsStorage {
  albums: IAlbum[] = albumsStore;
  get(): IAlbum[] {
    return this.albums;
  }
  getAlbum(id: string): IAlbum {
    return this.albums.find((alb) => alb.id === id);
  }
  createAlbum(createAlbum: CreateAlbumDto): IAlbum {
    const newItem = new Album(createAlbum);

    this.albums.push(newItem);
    return newItem;
  }
  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string): IAlbum {
    const updatedItem = this.getAlbum(id);
    updatedItem.name = updateAlbumDto.name;
    updatedItem.year = updateAlbumDto.year;
    updatedItem.artistId = updateAlbumDto.artistId;
    return updatedItem;
  }
  deleteAlbum(id: string): void {
    const newItems = this.albums.filter(
      (track: { id: string }) => track.id !== id,
    );
    this.albums = newItems;
  }

  deleteArtist(id: string): void {
    const newItems = this.albums.map((item) => {
      if (item.artistId === id) {
        item.artistId = null;
      } else {
        item.artistId = item.artistId;
      }
      return item;
    });
    this.albums = newItems;
  }
}
