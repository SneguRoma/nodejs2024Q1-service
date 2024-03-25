import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from 'src/albums/entities/album.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid', { name: 'artistId' })
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
