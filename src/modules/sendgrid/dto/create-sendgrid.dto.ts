import { IsEmail, IsString } from "class-validator";

export class CreateSendgridDto {

  @IsEmail({}, { each: true })
  readonly to: string[];

  @IsEmail()
  readonly from: string;

  @IsString()
  readonly text: string;
}
