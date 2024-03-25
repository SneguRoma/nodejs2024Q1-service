import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { ArtistsStorage } from 'src/artists/store/artists.storage';
import { AlbumsStorage } from 'src/albums/store/albums.storage';
import { FavoritesStorage } from './store/favorites.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TracksStorage,
    ArtistsStorage,
    AlbumsStorage,
    FavoritesStorage,
  ],
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
})
export class FavoritesModule {}
