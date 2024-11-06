import { ILoginResponse, IRefreshToken } from "@/interfaces/user.interface";
import { apiService } from "./api.service";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { redirect } from "next/navigation";
export class AuthService {
  public static async loginUser(
    payload: Partial<Record<"email" | "password", unknown>>
  ): Promise<ILoginResponse | { statusCode: number; message: string }> {
    try {
      const response = await apiService.post<ILoginResponse>({
        endpoint: "/auth/login",
        body: payload,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async refreshToken(
    refresToken: string
  ): Promise<IRefreshToken | IApiError> {
    try {
      const response = await apiService.post<IRefreshToken>({
        endpoint: "/auth/refresh",
        body: { "refresh-token": refresToken },
      });

      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
