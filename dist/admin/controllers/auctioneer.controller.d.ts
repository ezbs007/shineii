import { AuctioneerService } from '../services/auctioneer.service';
import { CreateAuctioneerDto } from '../dto/create-auctioneer.dto';
export declare class AuctioneerController {
    private readonly auctioneerService;
    constructor(auctioneerService: AuctioneerService);
    getAll(): Promise<{
        auctioneers: import("../../entities/auctioneer.entity").Auctioneer[];
    }>;
    getCreateForm(): {
        auctioneer: any;
    };
    create(createAuctioneerDto: CreateAuctioneerDto): Promise<import("../../entities/auctioneer.entity").Auctioneer>;
    getOne(id: number): Promise<{
        auctioneer: import("../../entities/auctioneer.entity").Auctioneer;
    }>;
    update(id: number, updateAuctioneerDto: CreateAuctioneerDto): Promise<import("../../entities/auctioneer.entity").Auctioneer>;
    remove(id: number): Promise<import("../../entities/auctioneer.entity").Auctioneer>;
}
