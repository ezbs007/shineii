export interface IBid {
    id: number;
    bid_amount: number;
    message?: string;
    negosiation: boolean;
    bidder: {
        id: number;
        title?: string;
        user: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
        };
    };
}
