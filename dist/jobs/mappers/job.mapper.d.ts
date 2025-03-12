import { Job } from '../../entities/job.entity';
import { IJob, ICalendarJob } from '../interfaces/job.interface';
export declare class JobMapper {
    static toDTO(job: Job): IJob;
    static toCalendarDTO(job: Job): ICalendarJob;
}
