import { v4 as uuidv4 } from 'uuid';

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

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  constructor(partial: Partial<Artist>) {
    this.id = uuidv4();
    Object.assign(this, partial);
  }
}
