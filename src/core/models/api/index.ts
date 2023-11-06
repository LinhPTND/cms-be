import { AxiosObservable } from "@/core/api/AxiosObservable";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Subscriber } from "rxjs";

export interface AxiosObservableRequestConfig<D = any>
  extends AxiosRequestConfig<D> {
  uploadProgressSubscriber?: Subscriber<any>;
  downloadProgressSubscriber?: Subscriber<any>;
}

export interface ApiRequestConfig<D = any>
  extends AxiosObservableRequestConfig<D> {
  tokenType?: TokenTypes | null;
  cache?: boolean;
  showLoading?: boolean;
  preparedData?: boolean;
  contentType?: "formData" | "urlEncoded" | "json";
}

export interface Interceptor {
  request?: (
    config: ApiRequestConfig
  ) => ApiRequestConfig | Promise<AxiosRequestConfig>;
  response?: {
    success?: (
      response: AxiosResponse<any>
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

    error?: (
      error: any,
      handleError: (error?: any) => any,
      axios: AxiosObservable
    ) => any;
  };
}

export enum RequestHeaderContentType {
  Json = "application/json",
  UrlEncoded = "application/x-www-form-urlencoded",
}
