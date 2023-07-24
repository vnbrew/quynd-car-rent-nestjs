import { CarResponseDto } from "./car-response.dto";
import { PaginationDto } from "../../../common/dto/pagination.dto";

export class AllCarResponseDto {
  readonly items: CarResponseDto[];
  readonly pagination: PaginationDto;

  constructor(items: CarResponseDto[], total: number, offset: number, limit: number) {
    this.items = items;
    this.pagination = new PaginationDto(total, offset, limit);
  }
}