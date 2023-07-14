import { User } from "../../modules/users/entities/user.entity";
import { UserToken } from "../../modules/users/entities/user-token.entity";
import { SetMetadata } from "@nestjs/common";
import { Role } from "../../shared/enum/role";

export const SEQUELIZE = "SEQUELIZE";
export const DEVELOPMENT = "development";
export const STAGING = "staging";
export const PRODUCTION = "production";

export const USERS_REPOSITORY = "USERS_REPOSITORY";
export const USER_TOKENS_REPOSITORY = "USER_TOKENS_REPOSITORY";
export const SEQUELIZE_MODELS = [
  User, UserToken
];


export const IS_PUBLIC_KEY = "isPublic";
export const SetPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = "roles";
export const SetRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);