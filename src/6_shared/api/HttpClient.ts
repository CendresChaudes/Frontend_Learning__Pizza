import axios, { type AxiosRequestConfig } from 'axios';

export interface IHttpClientRequestConfig {
  readonly signal?: AbortSignal;
  readonly params?: Record<string, string | number | boolean>;
  readonly headers?: Record<string, string>;
}

export class HttpClient {
  private static readonly instance = axios.create({
    baseURL: 'https://juniorsbootcamp.ru/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  public static get<TResponse>(
    url: string,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    return HttpClient.send<TResponse>('GET', url, undefined, config);
  }

  public static post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    return HttpClient.send<TResponse>('POST', url, body, config);
  }

  public static put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    return HttpClient.send<TResponse>('PUT', url, body, config);
  }

  public static patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    return HttpClient.send<TResponse>('PATCH', url, body, config);
  }

  public static delete<TResponse>(
    url: string,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    return HttpClient.send<TResponse>('DELETE', url, undefined, config);
  }

  private static async send<TResponse>(
    method: string,
    url: string,
    body?: unknown,
    config?: IHttpClientRequestConfig,
  ): Promise<TResponse> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      ...HttpClient.toAxiosConfig(config),
    };

    if (body !== undefined) {
      requestConfig.data = body;
    }

    const { data } = await HttpClient.instance.request<TResponse>(requestConfig);

    return data;
  }

  private static toAxiosConfig(config?: IHttpClientRequestConfig): AxiosRequestConfig {
    const axiosConfig: AxiosRequestConfig = {};

    if (!config) {
      return axiosConfig;
    }

    if (config.signal !== undefined) {
      axiosConfig.signal = config.signal;
    }

    if (config.params !== undefined) {
      axiosConfig.params = config.params;
    }

    if (config.headers !== undefined) {
      axiosConfig.headers = config.headers;
    }

    return axiosConfig;
  }
}
