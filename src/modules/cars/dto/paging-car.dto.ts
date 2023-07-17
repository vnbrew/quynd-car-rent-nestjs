import { IsNumber, IsOptional, Min } from "class-validator";
import { Transform, Type } from "class-transformer";

export class PagingCarDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly offset?: number;

  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsNumber({}, { each: true })
  public types?: number[];

  @IsOptional()
  @Transform((params) => params.value.split(',').map(Number))
  @IsNumber({}, { each: true })
  public capacities?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public price?: number;
}