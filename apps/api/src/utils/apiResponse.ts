export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: any;
  error?: string | null;
}

export class ResponseUtil {
  public static success<T>(data: T, meta?: any): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: meta || undefined,
      error: null,
    };
  }

  public static error(message: string): ApiResponse<null> {
    return {
      success: false,
      data: null,
      error: message,
    };
  }
}
