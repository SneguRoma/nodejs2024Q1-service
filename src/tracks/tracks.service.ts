import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { trackResponse } from './helpers/trackRequest';

@Injectable()
export class TracksService {
  constructor(@InjectRepository(Track) private storage: Repository<Track>) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.storage.save(new Track(createTrackDto));
    return trackResponse(newTrack);
  }

  async findAll() {
    return (await this.storage.find()).map((item) => trackResponse(item));
  }

  async findOne(id: string) {
    const track = await this.storage.findOneBy({ id });
    if (!track) {
      return '';
    }
    return track;
  }

  async update(updatedTrack: Track, updateTrackDto: UpdateTrackDto) {
    updatedTrack.name = updateTrackDto.name;
    updatedTrack.artistId = updateTrackDto.artistId;
    updatedTrack.albumId = updateTrackDto.albumId;
    updatedTrack.duration = updateTrackDto.duration;
    const response = await this.storage.save(updatedTrack);
    return trackResponse(response);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
