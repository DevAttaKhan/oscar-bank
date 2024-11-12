import { IAuthSession, Permissions } from "@/interfaces/user.interface";
import {
  AbilityBuilder,
  AnyMongoAbility,
  createMongoAbility,
} from "@casl/ability";

export const defineAbilityFor = (user: IAuthSession) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  user?.permissions?.forEach((el) => {
    const [subject, action] = el.split(":");
    can(action, subject);
  });

  return build();
};

export const hasAnyPermission = (
  ability: AnyMongoAbility,
  permissions?: Permissions[]
): boolean => {
  if (!permissions) return true;
  return permissions?.some((permission) => {
    const [subject, action] = permission.split(":");
    return ability.can(action, subject);
  });
};
