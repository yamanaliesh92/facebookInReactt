import { AxiosResponse, AxiosError } from "axios";

interface IAxiosError {
  status: string;
  code: string;
  message: string;
}

export type AxiosErrors = AxiosError<IAxiosError>;

export type AxiosResponses<T> = AxiosResponse<T>;
