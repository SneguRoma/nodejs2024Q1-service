import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private storage: Repository<Artist>) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.storage.save(new Artist(createArtistDto));
    return newArtist;
  }

  async findAll() {
    return await this.storage.find();
  }

  async findOne(id: string) {
    const artist = await this.storage.findOneBy({ id });
    if (!artist) {
      return '';
    }
    return artist;
  }

  async update(updatedArtist: Artist, updateArtistDto: UpdateArtistDto) {
    updatedArtist.name = updateArtistDto.name;
    updatedArtist.grammy = updateArtistDto.grammy;
    return await this.storage.save(updatedArtist);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
