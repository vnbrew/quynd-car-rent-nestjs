import { IsBoolean } from 'class-validator';

export class CreateUserFavoriteCarDto {
  @IsBoolean()
  readonly favorite: boolean;
}
