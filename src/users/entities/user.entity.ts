import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @Column()
  login: string;

  @Column()
  password: string;

  constructor(partial: Partial<User>) {
    this.id = 'uuidv4()';
    Object.assign(this, partial);
    this.version = 1;
    this.createdAt = Date.now(); // timestamp of creation
    this.updatedAt = Date.now(); // timestamp of last update
  }
}
