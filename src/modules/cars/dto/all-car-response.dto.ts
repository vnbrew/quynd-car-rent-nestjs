import { CarResponseDto } from "./car-response.dto";
import { PaginationDto } from "../../../shared/dto/pagination.dto";

export class AllCarResponseDto {
  readonly item: CarResponseDto[];
  readonly pagination: PaginationDto;

  constructor(item: CarResponseDto[], total: number, offset: number, limit: number) {
    this.item = item;
    this.pagination = new PaginationDto(total, offset, limit);
  }
}