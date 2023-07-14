import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { SetPublic, SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";
import { UpdateUserResponseDto } from "./dto/update-user-response.dto";
import { AllUsersResponseDto } from "./dto/all-users-response.dto";
import { User } from "./entities/user.entity";

@Controller("v1")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @SetPublic()
  @Post("users/register")
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.usersService.register(createUserDto);
  }

  @SetRoles(Role.user)
  @Get("users/me")
  async findMe(@Req() request): Promise<User> {
    let user = request.user;
    return await this.usersService.findMe(user);
  }

  @SetRoles(Role.user)
  @HttpCode(204)
  @Patch("users/me")
  async updateMe(@Req() request, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    let user = request.user;
    return await this.usersService.updateMe(user.id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @Get("users/all")
  async findAll(): Promise<AllUsersResponseDto> {
    return await this.usersService.findAll();
  }

  @SetRoles(Role.admin)
  @Get("users/:id")
  async findOne(@Param("id") id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Patch("users/:id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Delete("users/:id")
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(+id);
  }
}
