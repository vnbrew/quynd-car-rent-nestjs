import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarResponseDto } from './dto/create-car-response.dto';
import { SetPublic, SetRoles } from '../../shared/constants';
import { Role } from '../../common/enum/role';
import { UpdateCarResponseDto } from './dto/update-car-response.dto';
import { CarResponseDto } from './dto/car-response.dto';
import { CreateUserFavoriteCarResponseDto } from './dto/create-user-favorite-car-response.dto';
import { CreateUserFavoriteCarDto } from './dto/create-user-favorite-car.dto';
import { CreateUserReviewCarDto } from './dto/create-user-review-car.dto';
import { CreateUserReviewCarResponseDto } from './dto/create-user-review-car-response.dto';
import { UpdateUserReviewCarDto } from './dto/update-user-review-car.dto';
import { UpdateUserReviewCarResponseDto } from './dto/update-user-review-car-response.dto';
import { UserFavoriteCarResponseDto } from './dto/user-favorite-car-response.dto';
import { UserFavoriteCarsResponseDto } from './dto/user-favorite-cars-response.dto';
import { AllCarResponseDto } from './dto/all-car-response.dto';
import { PagingCarDto } from './dto/paging-car.dto';

@Controller('v1')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Post('cars')
  async create(
    @Body() createCarDto: CreateCarDto,
  ): Promise<CreateCarResponseDto> {
    return this.carsService.create(createCarDto);
  }

  @SetPublic()
  @Get('cars')
  async findAll(
    @Query() pagingCarDto: PagingCarDto,
  ): Promise<AllCarResponseDto> {
    return await this.carsService.findAll(pagingCarDto);
  }

  @SetPublic()
  @Get('cars/:id')
  async findOne(@Param('id') id: string): Promise<CarResponseDto> {
    return await this.carsService.findOne(+id);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Patch('cars/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<UpdateCarResponseDto> {
    return await this.carsService.update(+id, updateCarDto);
  }

  @SetRoles(Role.admin)
  @HttpCode(204)
  @Delete('cars/:id')
  async remove(@Param('id') id: string) {
    return await this.carsService.remove(+id);
  }

  @HttpCode(204)
  @Post('cars/favorite/:id')
  async favorite(
    @Req() request,
    @Param('id') id: string,
    @Body() createUserFavoriteCarDto: CreateUserFavoriteCarDto,
  ): Promise<CreateUserFavoriteCarResponseDto> {
    const userId = request.user.id;
    return this.carsService.favorite(userId, +id, createUserFavoriteCarDto);
  }

  @Get('cars/favorite/:id')
  async isFavorite(
    @Req() request,
    @Param('id') id: string,
  ): Promise<UserFavoriteCarResponseDto> {
    const userId = request.user.id;
    return await this.carsService.isFavorite(userId, +id);
  }

  @HttpCode(204)
  @Post('cars/review/:id')
  async createReview(
    @Req() request,
    @Param('id') id: string,
    @Body() createUserReviewCarDto: CreateUserReviewCarDto,
  ): Promise<CreateUserReviewCarResponseDto> {
    const userId = request.user.id;
    return this.carsService.createReview(userId, +id, createUserReviewCarDto);
  }

  @HttpCode(204)
  @Patch('cars/review/:id')
  async updateReview(
    @Req() request,
    @Param('id') id: string,
    @Body() updateUserReviewCarDto: UpdateUserReviewCarDto,
  ): Promise<UpdateUserReviewCarResponseDto> {
    const userId = request.user.id;
    return await this.carsService.updateReview(
      userId,
      +id,
      updateUserReviewCarDto,
    );
  }

  @Get('cars/users/favorite')
  async getFavoriteCarByUser(
    @Req() request,
  ): Promise<UserFavoriteCarsResponseDto> {
    const userId = request.user.id;
    return await this.carsService.getFavoriteCarByUser(userId);
  }
}
