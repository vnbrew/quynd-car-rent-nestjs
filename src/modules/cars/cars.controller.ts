import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CreateCarResponseDto } from "./dto/create-car-response.dto";
import { SetPublic, SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";
import { UpdateCarResponseDto } from "./dto/update-car-response.dto";
import { CarResponseDto } from "./dto/car-response.dto";

@Controller("v1")
export class CarsController {
  constructor(
    private readonly carsService: CarsService
  ) {
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Post("cars")
  async create(@Body() createCarDto: CreateCarDto): Promise<CreateCarResponseDto> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @SetPublic()
  @Get("cars/:id")
  async findOne(@Param("id") id: string): Promise<CarResponseDto> {
    return await this.carsService.findOne(+id);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Patch("cars/:id")
  async update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto): Promise<UpdateCarResponseDto> {
    return await this.carsService.update(+id, updateCarDto);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Delete("cars/:id")
  async remove(@Param("id") id: string) {
    return await this.carsService.remove(+id);
  }
}
