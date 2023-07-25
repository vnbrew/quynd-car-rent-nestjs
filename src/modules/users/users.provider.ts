import {
  USER_TOKENS_REPOSITORY,
  USERS_REPOSITORY,
} from '../../shared/constants';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: USER_TOKENS_REPOSITORY,
    useValue: UserToken,
  },
];
