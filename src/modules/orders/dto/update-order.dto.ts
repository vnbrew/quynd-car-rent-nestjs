import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  readonly order_status_id: number;

  readonly detail?: string;
}
