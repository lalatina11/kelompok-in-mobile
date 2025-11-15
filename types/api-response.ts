export interface ApiResponse<T> {
  success: boolean;
  messages: string;
  data: T;
}
