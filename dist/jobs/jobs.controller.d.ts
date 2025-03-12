import { JobsService } from './jobs.service';
import { CreateJobFromBidDto } from './dto/create-job.dto';
import { CalendarJobsDto } from './dto/calendar-jobs.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    createFromBid(req: any, createJobFromBidDto: CreateJobFromBidDto): Promise<import("../entities/job.entity").Job>;
    getAuctioneerJobs(req: any, pagination: PaginationDto): Promise<import("./interfaces/job.interface").IJobResponse>;
    getBidderJobs(req: any, pagination: PaginationDto): Promise<import("./interfaces/job.interface").IJobResponse>;
    getJobDetails(req: any, id: number): Promise<import("./interfaces/job.interface").IJobResponse>;
    getCalendarJobs(req: any, calendarJobsDto: CalendarJobsDto): Promise<import("./interfaces/job.interface").IJobResponse>;
}
