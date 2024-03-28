import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
//import { ConfigModule, ConfigService } from '@nestjs/config';
//import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import { User } from './users/entities/user.entity';
import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Track } from './tracks/entities/track.entity'; */
import { dataSourceOptions } from './data';
import { LoggingService } from './logger/logging.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './exceprion-filter/custom-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    /*  ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        entities: [User, Album, Artist, Track],
      }),
    }), */
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
