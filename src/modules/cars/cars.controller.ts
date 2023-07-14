import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { CreateCarResponseDto } from "./dto/create-car-response.dto";
import { SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";

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

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carsService.remove(+id);
  }
}
