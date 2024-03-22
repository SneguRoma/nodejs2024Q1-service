import { v4 as uuidv4 } from 'uuid';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn('uuid', { name: 'albumId' })
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: Artist | string;

  @OneToMany(() => Track, (track) => track.albumId, { eager: false })
  tracks: Track[];

  constructor(partial: Partial<Album>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
