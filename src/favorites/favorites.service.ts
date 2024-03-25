import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private trackStorage: Repository<Track>,

    @InjectRepository(Album)
    private albumStorage: Repository<Album>,

    @InjectRepository(Artist)
    private artistStorage: Repository<Artist>,
  ) {}

  /* async findOneTrack(id: string) {
    const item = await this.trackStorage.findOneBy({ id });
    if (!item) {
      return '';
    }
    return item;
  } */

  async findAll() {
    const favArtists = await this.artistStorage.find({
      where: {
        isFavorite: true,
      },
    });
    const favAlbums = await this.albumStorage.find({
      where: {
        isFavorite: true,
      },
    });
    const favTracks = await this.trackStorage.find({
      where: {
        isFavorite: true,
      },
    });
    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async addTrack(id: string) {
    const track = await this.trackStorage.findOneBy({ id });

    if (track) {
      track.isFavorite = true;
      return this.trackStorage.save(track);
    } else return '';
  }

  async addArtist(id: string) {
    const artist = await this.artistStorage.findOneBy({ id });

    if (artist) {
      artist.isFavorite = true;
      return this.artistStorage.save(artist);
    } else return '';
  }

  async addAlbum(id: string) {
    const album = await this.albumStorage.findOneBy({ id });

    if (album) {
      album.isFavorite = true;
      return this.albumStorage.save(album);
    } else return '';
  }

  async deleteTrack(id: string) {
    const track = await this.trackStorage.findOneBy({ id });

    if (track.isFavorite) {
      track.isFavorite = false;
      return this.trackStorage.save(track);
    } else {
      return '';
    }
  }

  async deleteAlbum(id: string) {
    const album = await this.albumStorage.findOneBy({ id });

    if (album.isFavorite) {
      album.isFavorite = false;
      return this.albumStorage.save(album);
    } else return '';
  }

  async deleteArtist(id: string) {
    const artist = await this.artistStorage.findOneBy({ id });

    if (artist.isFavorite) {
      artist.isFavorite = false;
      return this.artistStorage.save(artist);
    } else {
      return '';
    }
  }
}
