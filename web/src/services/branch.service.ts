import {
  IAuthSession,
  ILoginResponse,
  IUser,
} from "@/interfaces/user.interface";
import { apiService } from "./api.service";
import { CreateBranchInputType } from "@/lib/schema/branches.schema";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { IBranch } from "@/interfaces/branch.interface";
export class BranchService {
  public static async createBranch(
    payload: CreateBranchInputType,
    user?: IAuthSession
  ): Promise<IApiResponse<IBranch> | IApiError> {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await apiService.post<IApiResponse<IBranch>>(
        "/branch",
        payload,
        { headers }
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async getAll(
    params,
    user?: IAuthSession,
    tags?: string[]
  ): Promise<IApiResponse<IBranch> | IApiError> {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await apiService.get<IApiResponse<IBranch>>(
        "/branch",
        params,
        { headers, tags }
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
