import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  constructor(partial: Partial<User>) {
    this.id = 'uuidv4()';
    Object.assign(this, partial);
    this.version = 1;
    this.createdAt = Date.now(); // timestamp of creation
    this.updatedAt = Date.now(); // timestamp of last update
  }
}
