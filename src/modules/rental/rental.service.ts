import { Inject, Injectable } from "@nestjs/common";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { RENTAL_STATUSES_REPOSITORY, RENTALS_REPOSITORY, SEQUELIZE } from "../../core/constants";
import { RentalStatus } from "./entities/rental-status.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nService } from "nestjs-i18n";
import { Rental } from "./entities/rental.entity";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class RentalService {

  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(RENTAL_STATUSES_REPOSITORY) readonly rentalStatusesRepository: typeof RentalStatus,
    @Inject(RENTALS_REPOSITORY) readonly rentalsRepository: typeof Rental,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async create(userId: number, createRentalDto: CreateRentalDto) {
    console.log({ userId, ...createRentalDto });
    try {
      await this.sequelize.transaction(async t => {
        let transactionHost = { transaction: t };
        let rental = new Rental();
        rental.user_id = userId;
        rental.car_id = createRentalDto.car_id;
        rental.rental_status_id = createRentalDto.rental_status_id;
        rental.pick_date_time = createRentalDto.pick_date_time;
        rental.drop_date_time = createRentalDto.drop_date_time;
        rental.detail = createRentalDto.detail;
        await rental.save(transactionHost);
      });
    } catch (e) {

    }
    return { userId, ...createRentalDto };
  }

  findAll() {
    return `This action returns all rental`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
