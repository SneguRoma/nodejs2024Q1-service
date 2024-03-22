import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid', { name: 'artistId' })
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: Artist | string;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  albumId: Album | string;

  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
