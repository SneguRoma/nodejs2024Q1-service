import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsStorage } from './store/albums.storage';
import { TracksStorage } from 'src/tracks/store/tracks.storage';
import { TracksModule } from 'src/tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Track } from 'src/tracks/entities/track.entity';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsStorage, TracksStorage],
  imports: [TracksModule, TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
