export interface FetchOptions {
  headers?: HeadersInit;
  cache?: "force-cache" | "no-store";
  revalidate?: false | 0 | number;
  tags?: string[];
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Generic request handler
  private async request<T>(
    endpoint: string,
    method: string,
    body?: object,
    options?: FetchOptions
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: options?.cache,
      next: {
        revalidate: options?.revalidate,
        tags: options?.tags,
      },
    });

    // if (!response.ok) {
    //   return { status: response.status, message: response.statusText };
    // }

    return response.json() as Promise<T>;
  }

  // GET request
  public get<T>(
    endpoint: string,
    params?: object,
    options?: FetchOptions
  ): Promise<T> {
    const queryString = params
      ? "?" + new URLSearchParams(params as any).toString()
      : "";
    return this.request<T>(
      `${endpoint}${queryString}`,
      "GET",
      undefined,
      options
    );
  }

  // POST request
  public post<T>(
    endpoint: string,
    data: object,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", data, options);
  }

  // PUT request
  public put<T>(
    endpoint: string,
    data: object,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", data, options);
  }

  // DELETE request
  public delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, options);
  }
}

export const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_URL as string
);
