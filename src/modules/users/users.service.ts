import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import {
  SEQUELIZE,
  USER_BILLING_INFO_REPOSITORY,
  USER_TOKENS_REPOSITORY,
  USERS_REPOSITORY,
} from '../../shared/constants';
import { User } from './entities/user.entity';
import { AppExceptionService } from '../../shared/exception/app.exception.service';
import { IDetailExceptionMessage } from '../../shared/exception/app.exception.interface';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { compare, genSalt, hash } from 'bcrypt';
import { UserToken } from './entities/user-token.entity';
import { UpdateUserResponseDto } from './dto/update-user-response.dto';
import { FindOptions, Op } from 'sequelize';
import { UpdateOptions } from 'sequelize/types/model';
import { AllUsersResponseDto } from './dto/all-users-response.dto';
import {
  BadRequestCode,
  InternalServerErrorCode,
} from '../../common/enum/exception-code';
import { InjectQueue } from '@nestjs/bull';
import { EProcessName, EQueueName } from '../../common/enum/queue.enum';
import { Queue } from 'bull';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserLogoutResponseDto } from './dto/user-logout-response.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../../shared/cache/rediscache.service';
import { BillingInfo } from './entities/billing-info.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof User,
    @Inject(USER_TOKENS_REPOSITORY)
    private readonly userTokensRepository: typeof UserToken,
    @Inject(USER_BILLING_INFO_REPOSITORY)
    private readonly billingInfoRepository: typeof BillingInfo,
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    @InjectQueue(EQueueName.register) private readonly registerQueue: Queue,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async getAllUserTokenExpired(): Promise<UserToken[]> {
    return await this.userTokensRepository.findAll({
      where: {
        expiration_time: { [Op.lt]: new Date() },
      },
    });
  }

  async getUserByEmail(email: string) {
    const options: FindOptions = {
      where: { email: email },
    };
    return await this.usersRepository.findOne<User>(options);
  }

  async getUserTokenByUserId(userId: number) {
    const options: FindOptions = {
      where: { user_id: userId },
    };
    return await this.userTokensRepository.findOne<UserToken>(options);
  }

  async addAccessTokenToDB(userId: number, access_token: string) {
    const expiration_time: Date = new Date();
    expiration_time.setSeconds(
      expiration_time.getSeconds() + parseInt(process.env.JWT_EXP_TIME),
    );
    const userToken = new UserToken();
    userToken.user_id = userId;
    userToken.token = access_token;
    userToken.expiration_time = expiration_time;
    await userToken.save();
  }

  async addOrUpdateUserAccessToken(userId: number, access_token: string) {
    const expiration_time: Date = new Date();
    expiration_time.setSeconds(
      expiration_time.getSeconds() + parseInt(process.env.JWT_EXP_TIME),
    );
    const userTokenInDB = await this.getUserTokenByUserId(userId);
    if (userTokenInDB) {
      const options: UpdateOptions = {
        where: { user_id: userId },
      };
      await this.userTokensRepository.update(
        {
          token: access_token,
          expiration_time: expiration_time,
        },
        options,
      );
    } else {
      const userToken = new UserToken();
      userToken.user_id = userId;
      userToken.token = access_token;
      userToken.expiration_time = expiration_time;
      await userToken.save();
    }
  }

  async hasTokenInDB(token: string): Promise<boolean> {
    const options: FindOptions = {
      where: { token: token },
    };
    const userTokenInDB = await this.userTokensRepository.findOne(options);
    return !!userTokenInDB;
  }

  async removeTokenInDB(token: string): Promise<boolean> {
    const options: FindOptions = {
      where: { token: token },
    };
    const userTokenInDB = await this.userTokensRepository.findOne(options);
    if (userTokenInDB) {
      await userTokenInDB.destroy();
      return true;
    }
    return false;
  }

  async getUserInformation(id: number): Promise<User | null> {
    const options: FindOptions = {
      where: { id: id },
    };
    const userInDB = await this.usersRepository.findOne<User>(options);
    if (!userInDB) {
      return null;
    }
    return userInDB;
  }

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const user = new User();
        user.email = createUserDto.email.trim().toLowerCase();
        user.name = createUserDto.name;
        user.address = createUserDto.address;
        user.city = createUserDto.city;
        user.phone_number = createUserDto.phone_number;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);
        const newUser = await user.save(transactionHost);

        const billing = new BillingInfo();
        billing.user_id = newUser.id;
        billing.name = createUserDto.name;
        billing.address = createUserDto.address;
        billing.city = createUserDto.city;
        billing.phone_number = createUserDto.phone_number;
        await billing.save(transactionHost);
        await this.registerQueue.add(EProcessName.register_completed, {
          user_name: user.name,
        });
      });
      return new CreateUserResponseDto();
    } catch (error) {
      if (error.original.code === 'ER_DUP_ENTRY') {
        if (error.errors.length > 0) {
          const transformedErrors = error.errors.map((e) => {
            const code = '';
            const field = e.path;
            const message = e.message;
            const detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          const message = this.i18n.translate('error.data_type', {
            lang: I18nContext.current().lang,
          });
          this.exceptionService.badRequestException(
            BadRequestCode.BA_EMAIL_MUST_BE_UNIQUE,
            '',
            message,
            transformedErrors,
          );
        }
      }
      const message = this.i18n.translate('error.internal_server_error', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.internalServerErrorException(
        InternalServerErrorCode.IN_COMMON_ERROR,
        '',
        message,
        [],
      );
    }
  }

  async login(
    userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;
    const userInDB = await this.getUserByEmail(email);
    if (!userInDB) {
      const code = BadRequestCode.BA_EMAIL_DOES_NOT_EXIST;
      const message = this.i18n.translate('error.email_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(code, '', message, []);
    }
    const isMatch = await compare(password, userInDB.password);
    if (!isMatch) {
      const code = BadRequestCode.BA_INVALID_PASSWORD;
      const message = this.i18n.translate('error.invalid_password', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(code, '', message, []);
    }
    const payload = {
      id: userInDB.id,
      email: userInDB.email,
      role: userInDB.role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    await this.addAccessTokenToDB(userInDB.id, access_token);
    await this.redisCacheService.addTokenToWhiteList(access_token);
    return new UserLoginResponseDto(access_token);
  }

  async logout(token: string): Promise<UserLogoutResponseDto> {
    await this.removeTokenInDB(token);
    await this.redisCacheService.addTokenToBlackList(token);
    return new UserLogoutResponseDto(token);
  }

  async findMe(user: any): Promise<User> {
    const options: FindOptions = {
      where: { id: user.id },
    };
    const userInDB = await this.usersRepository.findOne<User>(options);
    if (!userInDB) {
      const message = this.i18n.translate('error.user_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_USER_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    return userInDB;
  }

  async updateMe(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const userInDB = await this.usersRepository.findOne<User>({
      where: { id },
    } as FindOptions);
    if (!userInDB) {
      const message = this.i18n.translate('error.user_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_USER_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    await this.usersRepository.update<User>(
      {
        name: updateUserDto.name,
        city: updateUserDto.city,
        address: updateUserDto.address,
        phone_number: updateUserDto.phone_number,
      },
      { where: { id } } as UpdateOptions,
    );
    return new UpdateUserResponseDto();
  }

  async findAll(): Promise<AllUsersResponseDto> {
    const users = await this.usersRepository.findAll<User>();
    return new AllUsersResponseDto(users);
  }

  async findOne(id: number): Promise<User> {
    const userInDB = await this.usersRepository.findOne<User>({
      where: { id: id },
    } as FindOptions);
    if (!userInDB) {
      const message = this.i18n.translate('error.user_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_USER_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    return userInDB;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const userInDB = await this.usersRepository.findOne<User>({
      where: { id: id },
    } as FindOptions);
    if (!userInDB) {
      const message = this.i18n.translate('error.user_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_USER_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    await this.usersRepository.update<User>(
      {
        name: updateUserDto.name,
        city: updateUserDto.city,
        address: updateUserDto.address,
        phone_number: updateUserDto.phone_number,
      },
      { where: { id: id } } as UpdateOptions,
    );
    return new UpdateUserResponseDto();
  }

  async remove(id: number) {
    const userInDB = await this.usersRepository.findOne<User>({
      where: { id },
    } as FindOptions);
    if (!userInDB) {
      const message = this.i18n.translate('error.user_does_not_exist', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_USER_DOES_NOT_EXIST,
        '',
        message,
        [],
      );
    }
    await userInDB.destroy();
  }
}
