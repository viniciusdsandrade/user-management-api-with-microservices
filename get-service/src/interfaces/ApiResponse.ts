// get-service/src/interfaces/ApiResponse.ts

export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: string;
}
