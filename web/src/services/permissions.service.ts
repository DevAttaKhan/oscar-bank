import { apiService } from "./api.service";
import { IApiError, IApiResponse, IPermission } from "@/interfaces/types";
import { RequestConfig } from "@/interfaces/api.interface";

export class PermissionsService {
  public static async list(
    config: RequestConfig
  ): Promise<IApiResponse<IPermission> | IApiError> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<IApiResponse<IPermission>>({
        endpoint: "/permissions",
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
