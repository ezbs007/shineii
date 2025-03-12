import { BidderAdminService } from '../services/bidder.service';
import { CreateBidderDto } from '../dto/create-bidder.dto';
import { UpdateBidderDto } from '../dto/update-bidder.dto';
export declare class BidderAdminController {
    private readonly bidderService;
    constructor(bidderService: BidderAdminService);
    getAll(): Promise<{
        bidders: import("../../entities/bidder.entity").Bidder[];
    }>;
    getCreateForm(): {
        bidder: any;
    };
    create(createBidderDto: CreateBidderDto): Promise<import("../../entities/bidder.entity").Bidder>;
    getOne(id: number): Promise<{
        bidder: import("../../entities/bidder.entity").Bidder;
    }>;
    update(id: number, updateBidderDto: UpdateBidderDto): Promise<import("../../entities/bidder.entity").Bidder>;
    remove(id: number): Promise<import("../../entities/bidder.entity").Bidder>;
}
