import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { SetPublic, SetRoles } from '../../shared/constants';
import { Role } from '../../common/enum/role';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { AllUsersResponseDto } from './dto/all-users-response.dto';
import { User } from './entities/user.entity';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserLogoutResponseDto } from './dto/user-logout-response.dto';
import { extractTokenFromHeader } from '../../common/utils/ultils';

@Controller('v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SetPublic()
  @HttpCode(204)
  @Post('users/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return await this.usersService.register(createUserDto);
  }

  @SetPublic()
  @HttpCode(200)
  @Post('users/login')
  async login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return await this.usersService.login(userLoginRequestDto);
  }

  @Post('users/logout')
  @HttpCode(204)
  async logout(@Req() request): Promise<UserLogoutResponseDto> {
    const token = extractTokenFromHeader(request);
    return await this.usersService.logout(token);
  }

  @SetRoles(Role.user, Role.admin)
  @Get('users/me')
  async findMe(@Req() request): Promise<User> {
    const user = request.user;
    return await this.usersService.findMe(user);
  }

  @SetRoles(Role.user, Role.admin)
  @HttpCode(204)
  @Patch('users/me')
  async updateMe(
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const user = request.user;
    return await this.usersService.updateMe(user.id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @Get('users/all')
  async findAll(): Promise<AllUsersResponseDto> {
    return await this.usersService.findAll();
  }

  @SetRoles(Role.admin)
  @Get('users/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Patch('users/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Delete('users/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
