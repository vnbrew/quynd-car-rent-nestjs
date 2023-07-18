import { Inject, Injectable } from "@nestjs/common";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { RENTAL_STATUSES_REPOSITORY, RENTALS_REPOSITORY } from "../../core/constants";
import { RentalStatus } from "./entities/rental-status.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nService } from "nestjs-i18n";
import { Rental } from "./entities/rental.entity";

@Injectable()
export class RentalService {

  constructor(
    @Inject(RENTAL_STATUSES_REPOSITORY) readonly rentalStatusesRepository: typeof RentalStatus,
    @Inject(RENTALS_REPOSITORY) readonly rentalsRepository: typeof Rental,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  create(createRentalDto: CreateRentalDto) {
    return "This action adds a new rental";
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
