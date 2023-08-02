import {
  USER_BILLING_INFO_REPOSITORY,
  USER_TOKENS_REPOSITORY,
  USERS_REPOSITORY,
} from '../../shared/constants';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.entity';
import { BillingInfo } from './entities/billing-info.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: USER_TOKENS_REPOSITORY,
    useValue: UserToken,
  },
  {
    provide: USER_BILLING_INFO_REPOSITORY,
    useValue: BillingInfo,
  },
];
