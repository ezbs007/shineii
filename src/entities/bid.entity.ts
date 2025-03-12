import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { JobPost } from './job-post.entity';
import { Bidder } from './bidder.entity';
// import { ChatRoom } from './chat-room.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPost, jobPost => jobPost.bids)
  job_post: JobPost;

  @Column()
  bid_amount: number;

  @Column({ default: true })
  negosiation: boolean;

  @Column({ nullable: true })
  message: string;

  @ManyToOne(() => Bidder, bidder => bidder.bids)
  bidder: Bidder;

  // @OneToMany(() => ChatRoom, chatRoom => chatRoom.bid)
  // chatRooms: ChatRoom[];
}