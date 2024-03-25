import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('track/:id')
  async createTrack(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.addTrack(id);
      if (resp === '')
        throw new HttpException(
          `track does not exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      if (resp) return resp;
    }
  }

  @Post('album/:id')
  async createAlbum(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.addAlbum(id);
      if (resp === '')
        throw new HttpException(
          `album does not exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      if (resp) return resp;
    }
  }

  @Post('artist/:id')
  async createArtist(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.addArtist(id);
      if (resp === '')
        throw new HttpException(
          `artist does not exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      if (resp) return resp;
    }
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.deleteTrack(id);

      if (resp === '') {
        throw new HttpException(`track not found`, HttpStatus.NOT_FOUND);
      }

      if (resp) return resp;
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.deleteAlbum(id);
      if (resp === '') {
        throw new HttpException(`album not found`, HttpStatus.NOT_FOUND);
      }

      if (resp) return resp;
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const resp = await this.favoritesService.deleteArtist(id);
      if (resp === '') {
        throw new HttpException(`artist not found`, HttpStatus.NOT_FOUND);
      }

      if (resp) return resp;
    }
  }
}
