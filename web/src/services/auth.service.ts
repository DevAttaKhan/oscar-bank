import { ILoginResponse } from "@/interfaces/user.interface";
import { apiService } from "./api.service";
export class AuthService {
  public static async loginUser(
    payload: Partial<Record<"email" | "password", unknown>>
  ): Promise<ILoginResponse | { statusCode: number; message: string }> {
    try {
      const response = await apiService.post<ILoginResponse>(
        "/auth/login",
        payload
      );
      return response;
    } catch (error: any) {
      console.log("error service", error.message);
      return error.message;
    }
  }
}
