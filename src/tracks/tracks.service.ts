import { Injectable } from '@nestjs/common';
import { TracksStorage } from './store/tracks.storage';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private storage: TracksStorage) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.createTrack(createTrackDto);
  }

  findAll() {
    return this.storage.get();
  }

  findOne(id: string) {
    return this.storage.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.updateTrack(updateTrackDto, id);
  }

  remove(id: string) {
    this.storage.deleteTrack(id);
  }
}
