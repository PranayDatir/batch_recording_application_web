export interface IApiResponse<T> {
    result: boolean;
    message: string;
    data?: T;
}