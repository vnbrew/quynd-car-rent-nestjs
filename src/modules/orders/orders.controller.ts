import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";

@Controller("v1")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @HttpCode(204)
  @Post("orders")
  async createOrder(@Req() request, @Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(request.user.id, createOrderDto);
  }

  @HttpCode(204)
  @Patch("orders/:id")
  async completeOrder(@Req() request, @Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.completeOrder(request.user.id, +id, updateOrderDto);
  }

  @Get("orders/:id")
  async findOne(@Req() request, @Param("id") id: string): Promise<OrderResponseDto> {
    return this.ordersService.findOne(request.user.id, +id);
  }
}
