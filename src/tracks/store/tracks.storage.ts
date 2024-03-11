import { Injectable } from '@nestjs/common';

import { ITrackStorage } from '../interfaces/tracks-storage.interface';
import { ITrack } from '../interfaces/track.interface';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksStorage implements ITrackStorage {
  tracks: ITrack[] = [
    {
      id: '4205d419-a068-4115-9462-c64e78ad247c',
      name: 'string',
      artistId: null, // refers to Artist
      albumId: null, // refers to Album
      duration: 2,
    },
  ];

  get(): ITrack[] {
    return this.tracks;
  }

  getTrack(id: string): ITrack {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrack: CreateTrackDto): ITrack {
    const newTrack = new Track(createTrack);

    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(updateTrackDto: UpdateTrackDto, id: string): ITrack {
    const updatedTrack = this.getTrack(id);

    updatedTrack.name = updateTrackDto.name;
    updatedTrack.albumId = updateTrackDto.albumId;
    updatedTrack.artistId = updateTrackDto.artistId;
    updatedTrack.duration = updateTrackDto.duration;
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    const newTracks = this.tracks.filter(
      (track: { id: string }) => track.id !== id,
    );
    this.tracks = newTracks;
  }
}
