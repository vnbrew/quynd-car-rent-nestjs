import { UserDto } from "./user.dto";
import { User } from "../entities/user.entity";

export class UpdateUserResponseDto extends UserDto {
  constructor(user: User) {
    super(user);
  }
}