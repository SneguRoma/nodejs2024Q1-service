import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    try {
      if (!createArtistDto.name || !createArtistDto.hasOwnProperty('grammy')) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'name and grammy are required' });
      }

      return res
        .status(HttpStatus.CREATED)
        .json(this.artistsService.create(createArtistDto));
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid Id format' });
    } else {
      const findedArtist = this.artistsService.findOne(id);
      if (findedArtist)
        return res.status(HttpStatus.OK).json(this.artistsService.findOne(id));
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'artist does not exist' });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      }
      const { name } = updateArtistDto;
      if (
        !name ||
        typeof name !== 'string' ||
        !updateArtistDto.hasOwnProperty('grammy') ||
        typeof updateArtistDto.grammy !== 'boolean'
      ) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid DTO format' });
      }
      const findedArtist = this.artistsService.findOne(id);
      if (findedArtist) {
        return res
          .status(HttpStatus.OK)
          .json(this.artistsService.update(id, updateArtistDto));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'artist does not exist' });
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
        .json({ error: 'Invalid Id format' });
    } else {
      const findedArtist = this.artistsService.findOne(id);

      if (findedArtist) {
        return res
          .status(HttpStatus.NO_CONTENT)
          .send(this.artistsService.remove(id));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Artist does not exist' });
    }
  }
}
