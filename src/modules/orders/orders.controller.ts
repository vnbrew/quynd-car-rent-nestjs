import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('v1')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(204)
  @Post('orders')
  async createOrder(
    @Req() request: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.createOrder(
      request.user.id,
      createOrderDto,
    );
  }

  @HttpCode(204)
  @Patch('payment/:id')
  async paymentOrder(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.paymentOrder(
      request.user.id,
      +id,
      updateOrderDto,
    );
  }

  @HttpCode(204)
  @Patch('cancel/:id')
  async cancelOrder(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.cancelOrder(
      request.user.id,
      +id,
      updateOrderDto,
    );
  }

  @Get('orders/:id')
  async findOne(
    @Req() request,
    @Param('id') id: string,
  ): Promise<OrderResponseDto> {
    return this.ordersService.findOne(request.user.id, +id);
  }
}
