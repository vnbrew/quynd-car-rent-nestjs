import { IsDate, IsNumber, IsOptional, IsString, Min } from "class-validator";
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
  @Transform((params) => params.value.split(",").map(Number))
  @IsNumber({}, { each: true })
  public types?: number[];

  @IsOptional()
  @Transform((params) => params.value.split(",").map(Number))
  @IsNumber({}, { each: true })
  public capacities?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public price?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  public name?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  public city?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public pick_date_time?: Date

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public drop_date_time?: Date
}