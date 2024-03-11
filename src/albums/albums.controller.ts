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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    try {
      if (!createAlbumDto.name || !createAlbumDto.year) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'name and year are required' });
      }

      return res
        .status(HttpStatus.CREATED)
        .json(this.albumsService.create(createAlbumDto));
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid Id format' });
    } else {
      const findedItem = this.albumsService.findOne(id);
      if (findedItem)
        return res.status(HttpStatus.OK).json(this.albumsService.findOne(id));
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'album does not exist' });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      }
      const { name, year } = updateAlbumDto;
      if (!name || !year) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid DTO format' });
      }
      const findedItem = this.albumsService.findOne(id);
      if (findedItem) {
        return res
          .status(HttpStatus.OK)
          .json(this.albumsService.update(id, updateAlbumDto));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'album does not exist' });
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
      const findedItem = this.albumsService.findOne(id);

      if (findedItem) {
        return res
          .status(HttpStatus.NO_CONTENT)
          .send(this.albumsService.remove(id));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'album does not exist' });
    }
  }
}
