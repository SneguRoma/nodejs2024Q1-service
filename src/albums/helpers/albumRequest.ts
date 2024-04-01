import { Album } from '../entities/album.entity';

export const albumResponse = (newItem: Album) => {
  return {
    id: newItem.id,
    name: newItem.name,
    year: newItem.year,
    artistId: newItem.artistId,
  };
};
