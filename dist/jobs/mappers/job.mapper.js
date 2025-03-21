"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobMapper = void 0;
class JobMapper {
    static toDTO(job) {
        var _a;
        return {
            id: job.id,
            job: job.job,
            payment_amount: job.payment_amount,
            payment_status: job.payment_status,
            job_start_date: job.job_start_date,
            job_end_date: job.job_end_date,
            bidder: {
                id: job.bidder.id,
                title: job.bidder.title,
                user: {
                    id: job.bidder.user.id,
                    email: job.bidder.user.email,
                    first_name: job.bidder.user.first_name,
                    last_name: job.bidder.user.last_name
                }
            },
            bid: {
                id: job.bid.id,
                bid_amount: job.bid.bid_amount,
                message: job.bid.message,
                job_post: {
                    id: job.bid.job_post.id,
                    boatLength: job.bid.job_post.boatLength,
                    additionalServices: job.bid.job_post.additionalServices,
                    notes: job.bid.job_post.notes
                }
            },
            reviews: ((_a = job.reviews) === null || _a === void 0 ? void 0 : _a.map(review => ({
                id: review.id,
                rating: review.rating,
                review: review.review
            }))) || []
        };
    }
    static toCalendarDTO(job) {
        return {
            id: job.id,
            title: job.job,
            start: job.job_start_date,
            end: job.job_end_date,
            auctioneer: {
                company_name: job.auctioneer.company_name,
                contact_number: job.auctioneer.contact_number,
                user: {
                    first_name: job.auctioneer.user.first_name,
                    last_name: job.auctioneer.user.last_name
                }
            },
            job_details: {
                boat_length: job.bid.job_post.boatLength,
                additional_services: job.bid.job_post.additionalServices,
                notes: job.bid.job_post.notes
            },
            payment: {
                amount: job.payment_amount,
                status: job.payment_status
            }
        };
    }
}
exports.JobMapper = JobMapper;
//# sourceMappingURL=job.mapper.js.map