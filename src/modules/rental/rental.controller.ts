import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { AllRentalResponseDto } from './dto/all-rental-response.dto';
import { RentalResponseDto } from './dto/rental-response.dto';

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
  async findAll(@Req() request): Promise<AllRentalResponseDto> {
    return await this.rentalService.findAll(request.user.id);
  }

  @Get('rental/:id')
  async findOne(
    @Req() request,
    @Param('id') id: string,
  ): Promise<RentalResponseDto> {
    return this.rentalService.findOne(+id, request.user.id);
  }

  @HttpCode(204)
  @Patch('rental/:id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    return this.rentalService.update(+id, request.user.id, updateRentalDto);
  }

  @Delete('rental/:id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(+id);
  }
}
