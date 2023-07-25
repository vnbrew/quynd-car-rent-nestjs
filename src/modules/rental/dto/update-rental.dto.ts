import { IsNumber } from 'class-validator';

export class UpdateRentalDto {
  @IsNumber()
  readonly rental_status_id: number;
}
