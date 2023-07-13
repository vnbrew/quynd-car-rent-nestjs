import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { SetPublic, SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";

@Controller("v1/users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @SetPublic()
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.usersService.register(createUserDto);
  }

  @SetPublic()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @SetRoles(Role.user)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
