import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Bid } from './bid.entity';
import { Job } from './job.entity';

@Entity()
export class Bidder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  bio_discription: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column({ nullable: true })
  address: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude: number;

  @ManyToOne(() => User, user => user.bidder)
  user: User;

  @OneToMany(() => Bid, bid => bid.bidder)
  bids: Bid[];

  @OneToMany(() => Job, job => job.bidder)
  jobs: Job[];
}