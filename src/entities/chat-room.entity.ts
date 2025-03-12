import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bid } from './bid.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bid, bid => bid.chatRooms)
  bid: Bid;

  @Column()
  job: string;
}