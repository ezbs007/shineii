import { JobPost } from '../../entities/job-post.entity';
import { IJobPost } from '../interfaces/job-post.interface';

export class JobPostMapper {
  static toDTO(jobPost: JobPost, currentUserId?: number): IJobPost {
    console.log(jobPost);
    const bids = jobPost.bids?.map(bid => ({
      id: bid.id,
      amount: bid.bid_amount,
      message: bid.message,
      bidder: `${bid.bidder.user.first_name} ${bid.bidder.user.last_name}`

    })) || [];

    // Find the current user's bid if userId is provided
    const mybid = currentUserId && jobPost.bids ? 
      jobPost.bids.find(bid => bid.bidder.user.id === currentUserId) ? {
        id: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).id,
        amount: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bid_amount,
        message: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).message,
        bidder: `${jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bidder.user.first_name} ${jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bidder.user.last_name}`
      } : undefined
      : undefined;

    // const mybid = undefined;

    return {
      id: jobPost.id,
      boatName: jobPost.boatName,
      boatLength: Number(jobPost.boatLength),
      additionalServices: jobPost.additionalServices,
      notes: jobPost.notes,
      location: jobPost.location,
      preferredDate: jobPost.preferredDate,
      max_bid_amount: jobPost.max_bid_amount,
      min_bid_amount: jobPost.min_bid_amount,
      bid_start_date: jobPost.bid_start_date,
      bid_end_date: jobPost.bid_end_date,
      job_start_date: jobPost.job_start_date,
      job_end_date: jobPost.job_end_date,
      auctioneer: {
        id: jobPost.auctioneer.id,
        company_name: jobPost.auctioneer.company_name,
        user: {
          id: jobPost.auctioneer.user.id,
          email: jobPost.auctioneer.user.email,
          first_name: jobPost.auctioneer.user.first_name,
          last_name: jobPost.auctioneer.user.last_name
        }
      },
      bids,
      mybid
    };
  }
}