import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserFavoriteCarDto {
  @IsBoolean()
  readonly favorite: boolean;
}
