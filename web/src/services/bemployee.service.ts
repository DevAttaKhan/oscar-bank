import { apiService } from "./api.service";
import { CreateBranchInputType } from "@/lib/schema/branches.schema";
import { IApiError, IApiResponse } from "@/interfaces/types";

import { RequestConfig } from "@/interfaces/api.interface";
import { IEmployee } from "@/interfaces/employee.interface";
export class EmployeeService {
  public static async createBranch(
    payload: CreateBranchInputType,
    token?: string
  ): Promise<IApiResponse<IEmployee> | IApiError> {
    try {
      const response = await apiService.post<IApiResponse<IEmployee>>({
        endpoint: "/employees",
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
  ): Promise<IApiResponse<IEmployee> | IApiError> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<IApiResponse<IEmployee>>({
        endpoint: "/employees",
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
