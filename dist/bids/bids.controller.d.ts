import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
export declare class BidsController {
    private readonly bidsService;
    constructor(bidsService: BidsService);
    create(req: any, createBidDto: CreateBidDto): Promise<import("../entities/bid.entity").Bid>;
}
