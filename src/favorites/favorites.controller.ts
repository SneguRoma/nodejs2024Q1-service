import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('track/:id')
  createTrack(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.addTrack(id);
        if (resp === 201)
          return res.status(HttpStatus.CREATED).send('Track added');
        return res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'track does not exist' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.addAlbum(id);
        if (resp === 201)
          return res.status(HttpStatus.CREATED).send('Album added');
        return res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'album does not exist' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.addArtist(id);
        if (resp === 201)
          return res.status(HttpStatus.CREATED).send('Artist added');
        return res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json({ error: 'album does not exist' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.deleteTrack(id);
        if (resp === 204)
          return res.status(HttpStatus.NO_CONTENT).send('Track deleted');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'track not found' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.deleteAlbum(id);
        if (resp === 204)
          return res.status(HttpStatus.NO_CONTENT).send('Album deleted');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'album not found' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string, @Res() res: Response) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid Id format' });
      } else {
        const resp = this.favoritesService.deleteArtist(id);
        if (resp === 204)
          return res.status(HttpStatus.NO_CONTENT).send('Artist deleted');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'album not found' });
      }
    } catch (err) {
      console.error('Error in create:', err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }
}
