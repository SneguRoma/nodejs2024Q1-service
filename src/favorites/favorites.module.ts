import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsStorage } from 'src/artists/store/artists.storage';
import { AlbumsStorage } from 'src/albums/store/albums.storage';
import { FavoritesStorage } from './store/favorites.storage';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TracksStorage,
    ArtistsStorage,
    AlbumsStorage,
    FavoritesStorage,
  ],
  imports: [TracksModule, AlbumsModule, ArtistsModule],
})
export class FavoritesModule {}
