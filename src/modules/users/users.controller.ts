import { Body, Controller, Post } from "@nestjs/common";
import { UsersRegisterDto } from "./dto/users.register.dto";

@Controller("v1/users")
export class UsersController {

  @Post("register")
  async register(@Body() usersRegisterDto: UsersRegisterDto) {
    return usersRegisterDto;
  }
}
