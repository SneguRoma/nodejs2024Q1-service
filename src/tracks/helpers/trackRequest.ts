import { Track } from '../entities/track.entity';

export const trackResponse = (newItem: Track) => {
  return {
    id: newItem.id,
    name: newItem.name,
    artistId: newItem.artistId,
    albumId: newItem.albumId,
    duration: newItem.duration,
  };
};
