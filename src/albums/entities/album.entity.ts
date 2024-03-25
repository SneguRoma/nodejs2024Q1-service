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
  @PrimaryGeneratedColumn('uuid' /* , { name: 'albumId' } */)
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | string;

  @OneToMany(() => Track, (track) => track.album, { eager: false })
  tracks: Track[];

  @Column({ select: false, default: false })
  isFavorite: boolean;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
