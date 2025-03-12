import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Auctioneer } from './auctioneer.entity';
import { Bidder } from './bidder.entity';
// import { Review } from './review.entity';
import { Bid } from './bid.entity';
import { Payment } from './payment.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job: string;

  @ManyToOne(() => Auctioneer, auctioneer => auctioneer.jobs)
  auctioneer: Auctioneer;

  @ManyToOne(() => Bidder, bidder => bidder.jobs)
  bidder: Bidder;

  @Column({ nullable: true })
  job_start_date: Date;

  @Column({ nullable: true })
  job_end_date: Date;

  @Column()
  payment_amount: number;

  @Column()
  payment_status: string;

  @OneToOne(() => Bid)
  @JoinColumn()
  bid: Bid;

  @OneToMany(() => Payment, payment => payment.job)
  payments: Payment[];

  // @OneToMany(() => Review, review => review.job)
  // reviews: Review[];
}