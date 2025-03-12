import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { JobPost } from './job-post.entity';
import { Job } from './job.entity';

@Entity()
export class Auctioneer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column()
  address: string;

  @ManyToOne(() => User, user => user.auctioneer)
  user: User;

  @OneToMany(() => JobPost, jobPost => jobPost.auctioneer)
  jobPosts: JobPost[];

  @OneToMany(() => Job, job => job.auctioneer)
  jobs: Job[];


}