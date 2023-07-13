import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../shared/enum/role";
import { ROLES_KEY } from "../../core/constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // console.log(" RolesGuard " + JSON.stringify(user));
    if (!user) {
      return true;
    }
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}