import { apiService } from "./api.service";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { RequestConfig } from "@/interfaces/api.interface";
import { IDesignation } from "@/interfaces/designation.interface";
import { DesignationInputType } from "@/lib/schema/common.schema";

export class DesignationService {
  public static async createDesignation(
    payload: DesignationInputType,
    token?: string
  ): Promise<IApiResponse<IDesignation> | IApiError> {
    try {
      const response = await apiService.post<IApiResponse<IDesignation>>({
        endpoint: "/designation",
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
  ): Promise<IApiResponse<IDesignation> | IApiError> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<IApiResponse<IDesignation>>({
        endpoint: "/designation",
        params,
        options: options,
        token,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async update(
    payload: DesignationInputType,
    token?: string
  ): Promise<IApiResponse<IDesignation> | IApiError> {
    try {
      const { id, ...body } = payload;
      const response = await apiService.patch<IApiResponse<IDesignation>>({
        endpoint: `/designation/${id}`,
        body,
        token,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  public static async delete(
    ids: number[] | number,
    token?: string
  ): Promise<IApiResponse<IDesignation> | IApiError> {
    try {
      const params = Array.isArray(ids) ? { ids: ids.join(",") } : { ids: ids };
      const response = await apiService.delete<IApiResponse<IDesignation>>({
        endpoint: `/designation`,
        token,
        params,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
