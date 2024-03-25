import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tracks' })
export class Track {
  @PrimaryGeneratedColumn('uuid', { name: 'trackId' })
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column()
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
