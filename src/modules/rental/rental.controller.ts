import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('v1')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('rental')
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
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
