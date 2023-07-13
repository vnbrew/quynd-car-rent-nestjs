import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { SetPublic, SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";
import { UpdateUserResponseDto } from "./dto/update-user-response.dto";

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
  findMe(@Req() request) {
    let user = request.user;
    return this.usersService.findMe(user);
  }

  @SetRoles(Role.user)
  @Patch("users/me")
  async updateMe(@Req() request, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    let user = request.user;
    return await this.usersService.updateMe(user.id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @Get("admin/all")
  findAll() {
    return this.usersService.findAll();
  }

  @SetRoles(Role.admin)
  @Get("admin/:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @SetRoles(Role.admin)
  @Patch("admin/:id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @Delete("admin/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
