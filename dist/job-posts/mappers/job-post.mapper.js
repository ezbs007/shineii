"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostMapper = void 0;
class JobPostMapper {
    static toDTO(jobPost, currentUserId) {
        var _a;
        const bids = ((_a = jobPost.bids) === null || _a === void 0 ? void 0 : _a.map(bid => ({
            id: bid.id,
            amount: bid.bid_amount,
            message: bid.message,
            bidder: `${bid.bidder.user.first_name} ${bid.bidder.user.last_name}`
        }))) || [];
        const mybid = currentUserId && jobPost.bids ?
            jobPost.bids.find(bid => bid.bidder.user.id === currentUserId) ? {
                id: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).id,
                amount: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bid_amount,
                message: jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).message,
                bidder: `${jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bidder.user.first_name} ${jobPost.bids.find(bid => bid.bidder.user.id === currentUserId).bidder.user.last_name}`
            } : undefined
            : undefined;
        return {
            id: jobPost.id,
            boatLength: Number(jobPost.boatLength),
            additionalServices: jobPost.additionalServices,
            notes: jobPost.notes,
            location: jobPost.location,
            preferredDate: jobPost.preferredDate,
            max_bid_amount: jobPost.max_bid_amount,
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
exports.JobPostMapper = JobPostMapper;
//# sourceMappingURL=job-post.mapper.js.map