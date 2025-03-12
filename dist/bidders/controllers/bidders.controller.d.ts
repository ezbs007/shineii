import { BiddersService } from '../services/bidders.service';
import { BidderUpdateService } from '../services/bidder-update.service';
import { BidderDetailsService } from '../services/bidder-details.service';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
export declare class BiddersController {
    private readonly biddersService;
    private readonly bidderUpdateService;
    private readonly bidderDetailsService;
    constructor(biddersService: BiddersService, bidderUpdateService: BidderUpdateService, bidderDetailsService: BidderDetailsService);
    create(req: any, createBidderDto: CreateBidderDto): Promise<import("../../entities/bidder.entity").Bidder>;
    update(req: any, updateBidderDto: UpdateBidderDto): Promise<import("../interfaces/bidder-response.interface").BidderResponse>;
    getDetails(req: any): Promise<import("../interfaces/bidder-response.interface").BidderResponse>;
}
