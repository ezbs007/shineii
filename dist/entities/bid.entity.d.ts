import { JobPost } from './job-post.entity';
import { Bidder } from './bidder.entity';
import { ChatRoom } from './chat-room.entity';
export declare class Bid {
    id: number;
    job_post: JobPost;
    bid_amount: number;
    negosiation: boolean;
    message: string;
    bidder: Bidder;
    chatRooms: ChatRoom[];
}
