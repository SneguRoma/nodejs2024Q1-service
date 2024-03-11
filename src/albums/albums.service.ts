import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsStorage } from './store/albums.storage';
import { TracksStorage } from 'src/tracks/store/tracks.storage';

@Injectable()
export class AlbumsService {
  constructor(
    private storage: AlbumsStorage,
    private trackStorage: TracksStorage,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.storage.get();
  }

  findOne(id: string) {
    return this.storage.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.updateAlbum(updateAlbumDto, id);
  }

  remove(id: string) {
    this.trackStorage.deleteArtist(id);
    this.storage.deleteAlbum(id);
  }
}
