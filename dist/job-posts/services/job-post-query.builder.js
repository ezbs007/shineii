"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostQueryBuilder = void 0;
const common_1 = require("@nestjs/common");
let JobPostQueryBuilder = class JobPostQueryBuilder {
    static createBaseQuery(repository) {
        return repository
            .createQueryBuilder('job_post')
            .leftJoinAndSelect('job_post.auctioneer', 'auctioneer')
            .leftJoinAndSelect('auctioneer.user', 'user')
            .leftJoinAndSelect('job_post.bids', 'bids');
    }
    static applyLocationFilter(query, bidder, radius) {
        return query.andWhere(`ST_DWithin(
        ST_SetSRID(ST_MakePoint(job_post.location->>'longitude', job_post.location->>'latitude')::geometry, 4326),
        ST_SetSRID(ST_MakePoint(:longitude, :latitude)::geometry, 4326),
        :distance
      )`, {
            latitude: bidder.latitude,
            longitude: bidder.longitude,
            distance: radius * 1000,
        });
    }
    static applyBoatLengthFilter(query, filterDto) {
        if (filterDto.boatLengthFrom !== undefined) {
            query.andWhere('job_post.boatLength >= :boatLengthFrom', {
                boatLengthFrom: filterDto.boatLengthFrom,
            });
        }
        if (filterDto.boatLengthTo !== undefined) {
            query.andWhere('job_post.boatLength <= :boatLengthTo', {
                boatLengthTo: filterDto.boatLengthTo,
            });
        }
        return query;
    }
    static applyServicesFilter(query, services) {
        if (services.length > 0) {
            return query.andWhere('job_post.additionalServices @> ARRAY[:...services]', {
                services,
            });
        }
        return query;
    }
    static addDistanceOrdering(query, bidder) {
        return query.orderBy(`ST_Distance(
        ST_SetSRID(ST_MakePoint(job_post.location->>'longitude', job_post.location->>'latitude')::geometry, 4326),
        ST_SetSRID(ST_MakePoint(:longitude, :latitude)::geometry, 4326)
      )`, 'ASC');
    }
};
exports.JobPostQueryBuilder = JobPostQueryBuilder;
exports.JobPostQueryBuilder = JobPostQueryBuilder = __decorate([
    (0, common_1.Injectable)()
], JobPostQueryBuilder);
//# sourceMappingURL=job-post-query.builder.js.map