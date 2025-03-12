import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bidder } from './bidder.entity';
import { Auctioneer } from './auctioneer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  user_type: string;

  @Column({ nullable: true })
  profile_pic: string;

  @OneToMany(() => Bidder, bidder => bidder.user)
  bidder: Bidder;

  @OneToMany(() => Auctioneer, auctioneer => auctioneer.user)
  auctioneer: Auctioneer;
}