import { IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";

export class UsersRegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
  })
  @IsNotEmpty()
  readonly password: string;
}