import { Bid } from '../../entities/bid.entity';
import { IBid } from '../interfaces/bid.interface';

export class BidMapper {
  static toDTO(bid: Bid): IBid {
    return {
      id: bid.id,
      bid_amount: bid.bid_amount,
      message: bid.message,
      negosiation: bid.negosiation,
      bidder: {
        id: bid.bidder.id,
        title: bid.bidder.title,
        user: {
          id: bid.bidder.user.id,
          email: bid.bidder.user.email,
          first_name: bid.bidder.user.first_name,
          last_name: bid.bidder.user.last_name,
        },
      },
    };
  }
}