export class UserFavoriteCarResponseDto {
  readonly favorite: boolean;

  constructor(favorite: boolean) {
    this.favorite = favorite;
  }
}
