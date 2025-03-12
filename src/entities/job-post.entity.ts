import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Auctioneer } from './auctioneer.entity';
import { Bid } from './bid.entity';

export type JobPostStatus = 'active' | 'bid_placed' | 'newcomment' | 'bid_accepted' | 'cancelled';

@Entity()
export class JobPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auctioneer, auctioneer => auctioneer.jobPosts)
  auctioneer: Auctioneer;

  @Column({ nullable: false, default: "20" })
  boatLength: string;

  @Column("text", { array: true })
  additionalServices: string[];

  @Column({ nullable: true })
  notes: string;

  @Column('json', { nullable: true })
  location: {
    latitude: number;
    longitude: number;
    dockNumber: string;
    address: string;
    placeId: string;
  };

  @Column({ default: 1, nullable: false })
  dirtinessLevel: number;

  @Column({ nullable: true })
  preferredDate: string;

  @Column({ nullable: true })
  max_bid_amount: number;

  @Column({ nullable: true })
  min_bid_amount: number;

  @Column({ nullable: true })
  bid_start_date: Date;

  @Column({ nullable: true })
  bid_end_date: Date;

  @Column({ nullable: true })
  job_start_date: Date;

  @Column({ nullable: true })
  job_end_date: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'bid_placed', 'newcomment', 'bid_accepted', 'cancelled'],
    default: 'active'
  })
  status: JobPostStatus;

  @Column({ nullable: true })
  boatName: string; // Add this line

  @OneToMany(() => Bid, bid => bid.job_post)
  bids: Bid[];
}