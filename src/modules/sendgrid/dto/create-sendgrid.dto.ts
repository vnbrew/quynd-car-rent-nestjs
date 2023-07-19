import { IsEmail, IsString } from "class-validator";

export class CreateSendgridDto {

  @IsEmail({}, { each: true })
  to: string[];
  @IsEmail()
  from: string;
  @IsString()
  subject: string;
  @IsString()
  html: string;
}
