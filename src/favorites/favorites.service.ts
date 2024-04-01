import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { albumResponse } from 'src/albums/helpers/albumRequest';
import { Artist } from 'src/artists/entities/artist.entity';
import { artistResponse } from 'src/artists/helpers/artistRequest';
import { Track } from 'src/tracks/entities/track.entity';
import { trackResponse } from 'src/tracks/helpers/trackRequest';
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
      artists: favArtists.map((item) => artistResponse(item)),
      albums: favAlbums.map((item) => albumResponse(item)),
      tracks: favTracks.map((item) => trackResponse(item)),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackStorage.findOneBy({ id });

    if (track) {
      track.isFavorite = true;
      const result = await this.trackStorage.save(track);
      return trackResponse(result);
    } else return '';
  }

  async addArtist(id: string) {
    const artist = await this.artistStorage.findOneBy({ id });

    if (artist) {
      artist.isFavorite = true;
      const result = await this.artistStorage.save(artist);
      return artistResponse(result);
    } else return '';
  }

  async addAlbum(id: string) {
    const album = await this.albumStorage.findOneBy({ id });

    if (album) {
      album.isFavorite = true;
      const result = await this.albumStorage.save(album);
      return albumResponse(result);
    } else return '';
  }

  async deleteTrack(id: string) {
    const track = await this.trackStorage.findOneBy({ id });

    if (track.isFavorite) {
      track.isFavorite = false;
      return await this.trackStorage.save(track);
    } else {
      return '';
    }
  }

  async deleteAlbum(id: string) {
    const album = await this.albumStorage.findOneBy({ id });

    if (album.isFavorite) {
      album.isFavorite = false;
      return await this.albumStorage.save(album);
    } else return '';
  }

  async deleteArtist(id: string) {
    const artist = await this.artistStorage.findOneBy({ id });

    if (artist.isFavorite) {
      artist.isFavorite = false;
      return await this.artistStorage.save(artist);
    } else {
      return '';
    }
  }
}
