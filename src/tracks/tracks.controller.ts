import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    try {
      if (!createTrackDto.name || !createTrackDto.duration) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'name and duration are required' });
      }

      return res
        .status(HttpStatus.CREATED)
        .json(this.tracksService.create(createTrackDto));
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid trackId format' });
    } else {
      const findedTrack = this.tracksService.findOne(id);
      if (findedTrack)
        return res.status(HttpStatus.OK).json(this.tracksService.findOne(id));
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'track does not exist' });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid trackId format' });
      }
      const { name, duration } = updateTrackDto;
      if (!name || !duration) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid DTO format' });
      }
      const findedTrack = this.tracksService.findOne(id);
      if (findedTrack) {
        return res
          .status(HttpStatus.OK)
          .json(this.tracksService.update(id, updateTrackDto));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'track does not exist' });
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid trackId format' });
    } else {
      const findedTrack = this.tracksService.findOne(id);

      if (findedTrack) {
        return res
          .status(HttpStatus.NO_CONTENT)
          .send(this.tracksService.remove(id));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'track does not exist' });
    }
  }
}
