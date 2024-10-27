import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../constants/common.enum';

export const PERMISSIONS_KEY = 'permissions';
export const SetPermissions = (...permissions: [Permissions, ...Permissions[]]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
