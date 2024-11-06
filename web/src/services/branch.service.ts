import {
  IAuthSession,
  ILoginResponse,
  IUser,
} from "@/interfaces/user.interface";
import { apiService } from "./api.service";
import { CreateBranchInputType } from "@/lib/schema/branches.schema";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { IBranch } from "@/interfaces/branch.interface";
import { Session } from "next-auth";
import { RequestConfig } from "@/interfaces/api.interface";
export class BranchService {
  public static async createBranch(
    payload: CreateBranchInputType,
    token?: string
  ): Promise<IApiResponse<IBranch> | IApiError> {
    try {
      const response = await apiService.post<IApiResponse<IBranch>>({
        endpoint: "/branch",
        body: payload,
        token,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async list(
    config: RequestConfig
  ): Promise<IApiResponse<IBranch> | IApiError> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<IApiResponse<IBranch>>({
        endpoint: "/branch",
        params,
        options: options,
        token,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
