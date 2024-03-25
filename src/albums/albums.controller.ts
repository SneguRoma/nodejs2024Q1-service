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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { albumResponse } from './helpers/albumRequest';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
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
      const findedAlbum = await this.albumsService.findOne(id);
      if (findedAlbum === '') {
        throw new HttpException(`album not found`, HttpStatus.NOT_FOUND);
      }
      return albumResponse(findedAlbum);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findedAlbum = await this.albumsService.findOne(id);

    if (findedAlbum === '') {
      throw new HttpException(`album not found`, HttpStatus.NOT_FOUND);
    }

    if (findedAlbum) {
      const album = await this.albumsService.update(
        findedAlbum,
        updateAlbumDto,
      );
      return album;
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
      const findedAlbum = await this.albumsService.findOne(id);

      if (findedAlbum === '') {
        throw new HttpException(`album not found`, HttpStatus.NOT_FOUND);
      }

      if (findedAlbum) {
        return this.albumsService.remove(id);
      }
    }
  }
}
