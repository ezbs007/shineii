import { JobPost } from '../../entities/job-post.entity';
import { IJobPost } from '../interfaces/job-post.interface';
export declare class JobPostMapper {
    static toDTO(jobPost: JobPost, currentUserId?: number): IJobPost;
}
