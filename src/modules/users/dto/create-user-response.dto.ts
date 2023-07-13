import { UserDto } from "./user.dto";
import { User } from "../entities/user.entity";

export class CreateUserResponseDto extends UserDto {
  constructor(user: User) {
    super(user);
  }
}