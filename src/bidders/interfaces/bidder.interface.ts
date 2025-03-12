export interface IBidder {
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
}

export interface IBidderResponse {
  success: boolean;
  message: string;
  data?: IBidder;
}