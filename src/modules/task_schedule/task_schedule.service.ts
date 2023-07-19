import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { RentalService } from "../rental/rental.service";

@Injectable()
export class TaskScheduleService {

  constructor(
    private readonly rentalService: RentalService
  ) {
  }

  @Cron("45 * * * * *")
  async cronToCheckRentalStatus() {
    console.log("Start cronToCheckRentalStatus...");
    let rentals = await this.rentalService.findAllRentalAsAffective();
    console.log("cronToCheckRentalStatus completed " + rentals.length);
  }
}
