import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
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
