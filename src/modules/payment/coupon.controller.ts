import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { CouponService } from "./coupon.service";
import { SetRoles } from "../../core/constants";
import { Role } from "../../shared/enum/role";
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Controller("v1")
export class CouponController {
  constructor(private readonly couponService: CouponService) {
  }

  @HttpCode(204)
  @SetRoles(Role.admin)
  @Post("coupon")
  async create(@Body() createCouponDto: CreateCouponDto) {
    return await this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.couponService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.couponService.remove(+id);
  }
}
