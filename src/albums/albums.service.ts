import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { albumResponse } from './helpers/albumRequest';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private storage: Repository<Album>) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.storage.save(new Album(createAlbumDto));
    return albumResponse(newAlbum);
  }

  async findAll() {
    return (await this.storage.find()).map((album) => albumResponse(album));
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
    const response = await this.storage.save(updatedAlbum);
    return albumResponse(response);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
