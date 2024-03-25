import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksStorage } from './store/tracks.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksStorage],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
