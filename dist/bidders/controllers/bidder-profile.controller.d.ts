import { BidderProfileService } from '../services/bidder-profile.service';
import { CreateBidderDto, UpdateBidderDto } from '../dto/bidder.dto';
export declare class BidderProfileController {
    private readonly bidderProfileService;
    constructor(bidderProfileService: BidderProfileService);
    create(user: any, createBidderDto: CreateBidderDto): Promise<import("../interfaces/bidder.interface").IBidderResponse>;
    update(user: any, updateBidderDto: UpdateBidderDto): Promise<import("../interfaces/bidder.interface").IBidderResponse>;
    getDetails(user: any): Promise<import("../interfaces/bidder.interface").IBidderResponse>;
}
