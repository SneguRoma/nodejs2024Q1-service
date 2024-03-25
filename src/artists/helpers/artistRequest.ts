import { Artist } from '../entities/artist.entity';

export const artistResponse = (newItem: Artist) => {
  return {
    id: newItem.id,
    name: newItem.name,
    grammy: newItem.grammy,
  };
};
