import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsStorage } from './store/artists.storage';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsStorage } from 'src/albums/store/albums.storage';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage, TracksStorage, AlbumsStorage],
  imports: [TracksModule, AlbumsModule],
})
export class ArtistsModule {}
