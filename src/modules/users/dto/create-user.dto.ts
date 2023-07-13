import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
  })
  @Length(8, 20)
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  readonly phone_number: string;
}
