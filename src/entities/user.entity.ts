import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bidder } from './bidder.entity';
import { Auctioneer } from './auctioneer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false,})
  first_name: string;

  @Column({nullable:false,})
  last_name: string;

  @Column({nullable:false,unique:true})
  email: string;

  @Column({nullable:false})
  password: string;

  @Column({nullable:false})
  user_type: number;

  @Column({ nullable: true })
  service_range: number;

  @Column({ nullable: true })
  profile_pic: string;

  @OneToMany(() => Bidder, bidder => bidder.user)
  bidder: Bidder;

  @OneToMany(() => Auctioneer, auctioneer => auctioneer.user)
  auctioneer: Auctioneer;
}