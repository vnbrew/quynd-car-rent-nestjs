import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from "@nestjs/common";
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('v1')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @HttpCode(204)
  @Post('rental')
  async create(@Req() request, @Body() createRentalDto: CreateRentalDto) {
    let userId = request.user.id;
    return await this.rentalService.create(userId, createRentalDto);
  }

  @Get('rental')
  findAll() {
    return this.rentalService.findAll();
  }

  @Get('rental/:id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(+id);
  }

  @Patch('rental/:id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(+id, updateRentalDto);
  }

  @Delete('rental/:id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(+id);
  }
}
