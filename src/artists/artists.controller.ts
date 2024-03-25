import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { validate } from 'uuid';
import { artistResponse } from './helpers/artistRequest';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
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
      const findedArtist = await this.artistsService.findOne(id);
      if (findedArtist === '') {
        throw new HttpException(`artist not found`, HttpStatus.NOT_FOUND);
      }
      return artistResponse(findedArtist);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findedArtist = await this.artistsService.findOne(id);

    if (findedArtist === '') {
      throw new HttpException(`album not found`, HttpStatus.NOT_FOUND);
    }

    if (findedArtist) {
      const artist = await this.artistsService.update(
        findedArtist,
        updateArtistDto,
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
      const findedArtist = await this.artistsService.findOne(id);

      if (findedArtist === '') {
        throw new HttpException(`artist not found`, HttpStatus.NOT_FOUND);
      }

      if (findedArtist) {
        return this.artistsService.remove(id);
      }
    }
  }
}
