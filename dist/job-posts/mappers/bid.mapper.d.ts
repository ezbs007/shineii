import { Bid } from '../../entities/bid.entity';
import { IBid } from '../interfaces/bid.interface';
export declare class BidMapper {
    static toDTO(bid: Bid): IBid;
}
