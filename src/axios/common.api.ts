import { AxiosResponse, AxiosError } from "axios";

interface IAxiosError {
  sataus: string;
  code: string;
  message: string;
}

export type AxiosErrors = AxiosError<IAxiosError>;

export type AxiosResposes<T> = AxiosResponse<T>;
