import { IsNumber, IsString } from "class-validator";

export class CreateUserReviewCarDto {
  @IsNumber()
  readonly rate: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly comment: string;
}
