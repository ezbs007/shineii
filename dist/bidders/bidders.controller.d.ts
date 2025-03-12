import { BiddersService } from './bidders.service';
import { CreateBidderDto } from './dto/create-bidder.dto';
import { UpdateBidderDto } from './dto/update-bidder.dto';
export declare class BiddersController {
    private readonly biddersService;
    constructor(biddersService: BiddersService);
    create(req: any, createBidderDto: CreateBidderDto): Promise<import("../entities/bidder.entity").Bidder>;
    update(req: any, updateBidderDto: UpdateBidderDto): Promise<import("../entities/bidder.entity").Bidder>;
}
