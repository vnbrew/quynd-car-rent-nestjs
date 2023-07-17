import { UserReviewCar } from "../entities/user-review-car.entity";

export class UserReviewCarResponseDto {
  readonly rate: number;
  readonly title: string;
  readonly comment: string;
  readonly name: string;
  readonly image_url: string;
  readonly review_date: string;

  constructor(userReviewCar: UserReviewCar) {
    this.rate = userReviewCar.rate;
    this.title = userReviewCar.title;
    this.comment = userReviewCar.comment;
    this.name = userReviewCar.user.name;
    this.image_url = userReviewCar.user.image_url;
    this.review_date = new Date(userReviewCar.updated_at.getTime() + 7 * 60 * 60 * 1000).toUTCString();
  }
}