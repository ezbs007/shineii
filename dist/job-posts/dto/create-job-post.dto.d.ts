export declare class LocationDto {
    address: string;
    latitude: number;
    longitude: number;
}
export declare class CreateJobPostDto {
    boatLength: number;
    additionalServices: string[];
    notes?: string;
    location?: LocationDto;
    preferredDate?: string;
    max_bid_amount?: number;
    bid_start_date?: Date;
    bid_end_date?: Date;
    job_start_date?: Date;
    job_end_date?: Date;
}
