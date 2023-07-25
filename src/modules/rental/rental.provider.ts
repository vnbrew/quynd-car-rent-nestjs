import {
  RENTAL_STATUSES_REPOSITORY,
  RENTALS_REPOSITORY,
} from '../../shared/constants';
import { RentalStatus } from './entities/rental-status.entity';
import { Rental } from './entities/rental.entity';

export const rentalsProviders = [
  {
    provide: RENTAL_STATUSES_REPOSITORY,
    useValue: RentalStatus,
  },
  {
    provide: RENTALS_REPOSITORY,
    useValue: Rental,
  },
];
