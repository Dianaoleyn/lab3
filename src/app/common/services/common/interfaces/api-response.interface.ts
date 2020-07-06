export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  reason?: string;
}
