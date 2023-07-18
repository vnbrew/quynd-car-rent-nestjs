import { RentalResponseDto } from "./rental-response.dto";
import { Rental } from "../entities/rental.entity";
import { PaginationDto } from "../../../shared/dto/pagination.dto";

export class AllRentalResponseDto {
  readonly items: RentalResponseDto[];
  readonly pagination: PaginationDto;

  constructor(items: Rental[]) {
    this.items = items.map((item) => new RentalResponseDto(item));
    this.pagination = new PaginationDto(items.length, 0, items.length);
  }
}