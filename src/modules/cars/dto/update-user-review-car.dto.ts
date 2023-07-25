import { PartialType } from '@nestjs/swagger';
import { CreateUserReviewCarDto } from './create-user-review-car.dto';

export class UpdateUserReviewCarDto extends PartialType(
  CreateUserReviewCarDto,
) {}
