import { UserDto } from "./user.dto";
import { User } from "../entities/user.entity";
import { PaginationDto } from "../../../shared/dto/pagination.dto";

export class AllUsersResponseDto {
  readonly items: UserDto[];
  readonly pagination: PaginationDto;

  constructor(items: User[]) {
    this.items = items.map((item) => new UserDto(item));
    this.pagination = new PaginationDto(items.length, 0, items.length);
  }
}