import { Injectable } from '@nestjs/common';

import { ITrackStorage } from '../interfaces/tracks-storage.interface';
import { ITrack } from '../interfaces/track.interface';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { tracksStore } from './tracks';

@Injectable()
export class TracksStorage implements ITrackStorage {
  tracks: ITrack[] = tracksStore;

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

  deleteArtist(id: string): void {
    const newTracks = this.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      } else {
        track.artistId = track.artistId;
      }
      return track;
    });
    this.tracks = newTracks;
  }

  deleteAlbums(id: string): void {
    const newItems = this.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      } else {
        track.albumId = track.albumId;
      }
      return track;
    });
    this.tracks = newItems;
  }
}
