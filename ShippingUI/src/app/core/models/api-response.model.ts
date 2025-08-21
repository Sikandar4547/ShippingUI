export enum ApiStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  // ... add other status codes as needed
}

export interface ApiResponse<T> {
  statusCode: ApiStatusCode;
  errorMessage?: string;
  successMessage?: string;
  data?: T;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}