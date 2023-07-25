export class PaginationDto {
  readonly total: number;
  readonly offset: number;
  readonly limit: number;

  constructor(total: number, offset: number, limit: number) {
    this.total = total;
    this.offset = offset;
    this.limit = limit;
  }
}
