import { apiService } from "./api.service";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { IGroup } from "@/interfaces/groups.interface";
import { CreateGroupSchemaInputType } from "@/lib/schema/groups.schema";
import { RequestConfig } from "@/interfaces/api.interface";

export class GroupsService {
  public static async createGroup(
    payload: CreateGroupSchemaInputType,
    token?: string
  ): Promise<IApiResponse<IGroup> | IApiError> {
    try {
      const response = await apiService.post<IApiResponse<IGroup>>({
        endpoint: "/groups",
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
  ): Promise<IApiResponse<IGroup> | IApiError> {
    try {
      const { params, options, token } = config;
      const response = await apiService.get<IApiResponse<IGroup>>({
        endpoint: "/groups",
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
    payload: CreateGroupSchemaInputType,
    token?: string
  ): Promise<IApiResponse<IGroup> | IApiError> {
    try {
      const { id, ...body } = payload;
      const response = await apiService.patch<IApiResponse<IGroup>>({
        endpoint: `/groups/${id}`,
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
  ): Promise<IApiResponse<IGroup> | IApiError> {
    try {
      const params = Array.isArray(ids) ? { ids: ids.join(",") } : { ids: ids };
      const response = await apiService.delete<IApiResponse<IGroup>>({
        endpoint: `/groups`,
        token,
        params,
      });
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
