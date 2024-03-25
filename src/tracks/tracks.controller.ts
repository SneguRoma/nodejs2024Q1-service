import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const findedTrack = await this.tracksService.findOne(id);
      if (findedTrack === '') {
        throw new HttpException(`track not found`, HttpStatus.NOT_FOUND);
      }
      return findedTrack;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findedTrack = await this.tracksService.findOne(id);

    if (findedTrack === '') {
      throw new HttpException(`track not found`, HttpStatus.NOT_FOUND);
    }

    if (findedTrack) {
      const artist = await this.tracksService.update(
        findedTrack,
        updateTrackDto,
      );
      return artist;
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const findedTrack = await this.tracksService.findOne(id);

      if (findedTrack === '') {
        throw new HttpException(`track not found`, HttpStatus.NOT_FOUND);
      }

      if (findedTrack) {
        return this.tracksService.remove(id);
      }
    }
  }
}
