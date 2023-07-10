import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
