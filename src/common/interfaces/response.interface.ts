export interface BaseResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    details?: string;
  };
}

export interface DataResponse<T> extends BaseResponse {
  data?: T;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}