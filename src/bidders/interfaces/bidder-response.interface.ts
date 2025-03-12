export interface BidderResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    title?: string;
    bio_description?: string;
    contact_number?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  error?: {
    code: string;
    details?: string;
  };
}