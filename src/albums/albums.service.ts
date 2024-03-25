import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private storage: Repository<Album>) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.storage.save(new Album(createAlbumDto));
    return this.storage.save(newAlbum);
  }

  async findAll() {
    return await this.storage.find();
  }

  async findOne(id: string) {
    const album = await this.storage.findOneBy({ id });
    if (!album) {
      return '';
    }
    return album;
  }

  async update(updatedAlbum: Album, updateAlbumDto: UpdateAlbumDto) {
    updatedAlbum.artistId = updateAlbumDto.artistId;
    updatedAlbum.year = updateAlbumDto.year;
    updatedAlbum.name = updateAlbumDto.name;
    return this.storage.save(updatedAlbum);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
