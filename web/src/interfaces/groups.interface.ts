import { IPermission } from "./types";

export interface IGroup {
  id: number;
  name: string;
  description?: string;
  permissions?: IPermission[];
}
