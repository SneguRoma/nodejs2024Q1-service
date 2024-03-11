import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from './track.interface';

export interface ITrackStorage {
  get(): ITrack[];
  getTrack(id: string): ITrack;
  createTrack(createTrack: CreateTrackDto): ITrack;
  updateTrack(updateTrackDto: UpdateTrackDto, id: string): ITrack;
  deleteTrack(id: string): void;
  deleteArtist(id: string): void;
  deleteAlbums(id: string): void;
  tracks: ITrack[];
}
