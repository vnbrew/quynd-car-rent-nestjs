import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { USER_TOKENS_REPOSITORY, USERS_REPOSITORY } from "../../core/constants";
import { User } from "./entities/user.entity";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { IDetailExceptionMessage } from "../../core/exception/app.exception.interface";
import { I18nContext, I18nService } from "nestjs-i18n";
import { genSalt, hash } from "bcrypt";
import { UserToken } from "./entities/user-token.entity";
import { UpdateUserResponseDto } from "./dto/update-user-response.dto";
import { FindOptions, Op } from "sequelize";
import { UpdateOptions } from "sequelize/types/model";
import { AllUsersResponseDto } from "./dto/all-users-response.dto";
import { BadRequestCode, InternalServerErrorCode } from "../../shared/enum/exception-code";
import { InjectQueue } from "@nestjs/bull";
import { EProcessName, EQueueName } from "../../shared/enum/queue.enum";
import { Queue } from "bull";

@Injectable()
export class UsersService {

  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof User,
    @Inject(USER_TOKENS_REPOSITORY) private readonly userTokensRepository: typeof UserToken,
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    @InjectQueue(EQueueName.register) private readonly registerQueue: Queue
  ) {
  }

  async getAllUserTokenExpired(): Promise<UserToken[]> {
    return await this.userTokensRepository.findAll({
      where: {
        expiration_time: { [Op.lt]: new Date() }
      }
    });
  }

  async getUserByEmail(email: string) {
    const options: FindOptions = {
      where: { email: email }
    };
    return await this.usersRepository.findOne<User>(options);
  }

  async getUserTokenByUserId(userId: number) {
    const options: FindOptions = {
      where: { user_id: userId }
    };
    return await this.userTokensRepository.findOne<UserToken>(options);
  }

  async addAccessTokenToDB(userId: number, access_token: string) {
    let expiration_time: Date = new Date();
    expiration_time.setSeconds(expiration_time.getSeconds() + parseInt(process.env.JWT_EXP_TIME));
    let userToken = new UserToken();
    userToken.user_id = userId;
    userToken.token = access_token;
    userToken.expiration_time = expiration_time;
    await userToken.save();
  }

  async addOrUpdateUserAccessToken(userId: number, access_token: string) {
    let expiration_time: Date = new Date();
    expiration_time.setSeconds(expiration_time.getSeconds() + parseInt(process.env.JWT_EXP_TIME));
    let userTokenInDB = await this.getUserTokenByUserId(userId);
    if (userTokenInDB) {
      const options: UpdateOptions = {
        where: { user_id: userId }
      };
      await this.userTokensRepository.update({
        token: access_token,
        expiration_time: expiration_time
      }, options);
    } else {
      let userToken = new UserToken();
      userToken.user_id = userId;
      userToken.token = access_token;
      userToken.expiration_time = expiration_time;
      await userToken.save();
    }
  }

  async hasTokenInDB(token: string): Promise<boolean> {
    const options: FindOptions = {
      where: { token: token }
    };
    let userTokenInDB = await this.userTokensRepository.findOne(options);
    return !!userTokenInDB;
  }

  async removeTokenInDB(token: string): Promise<boolean> {
    const options: FindOptions = {
      where: { token: token }
    };
    let userTokenInDB = await this.userTokensRepository.findOne(options);
    if (userTokenInDB) {
      await userTokenInDB.destroy();
      return true;
    }
    return false;
  }

  async getUserInformation(id: number): Promise<User | null> {
    const options: FindOptions = {
      where: { id: id }
    };
    let userInDB = await this.usersRepository.findOne<User>(options);
    if (!userInDB) {
      return null;
    }
    return userInDB;
  }

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const user = new User();
      user.email = createUserDto.email.trim().toLowerCase();
      user.name = createUserDto.name;
      user.address = createUserDto.address;
      user.city = createUserDto.city;
      user.phone_number = createUserDto.phone_number;
      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);
      await user.save();
      await this.registerQueue.add(EProcessName.register_completed,
        {
          "user_name": user.name
        });
      return new CreateUserResponseDto();
    } catch (error) {
      if (error.original.code === "ER_DUP_ENTRY") {
        if (error.errors.length > 0) {
          const transformedErrors = error.errors.map((e) => {
            const code = "";
            const field = e.path;
            const message = e.message;
            let detail: IDetailExceptionMessage = { code, field, message };
            return detail;
          });
          let message = this.i18n.translate("error.data_type", {
            lang: I18nContext.current().lang
          });
          this.exceptionService.badRequestException(BadRequestCode.BA_EMAIL_MUST_BE_UNIQUE, "", message, transformedErrors);
        }
      }
      let message = this.i18n.translate("error.internal_server_error", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.internalServerErrorException(InternalServerErrorCode.IN_COMMON_ERROR, "", message, []);
    }
  }

  async findMe(user: any): Promise<User> {
    const options: FindOptions = {
      where: { id: user.id }
    };
    let userInDB = await this.usersRepository.findOne<User>(options);
    if (!userInDB) {
      let message = this.i18n.translate("error.user_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.badRequestException(BadRequestCode.BA_USER_DOES_NOT_EXIST, "", message, []);
    }
    return userInDB;
  }

  async updateMe(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    let userInDB = await this.usersRepository.findOne<User>({ where: { id } } as FindOptions);
    if (!userInDB) {
      let message = this.i18n.translate("error.user_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.badRequestException(BadRequestCode.BA_USER_DOES_NOT_EXIST, "", message, []);
    }
    await this.usersRepository.update<User>({
      name: updateUserDto.name,
      city: updateUserDto.city,
      address: updateUserDto.address,
      phone_number: updateUserDto.phone_number
    }, { where: { id } } as UpdateOptions);
    return new UpdateUserResponseDto();
  }

  async findAll(): Promise<AllUsersResponseDto> {
    let users = await this.usersRepository.findAll<User>();
    return new AllUsersResponseDto(users);
  }

  async findOne(id: number): Promise<User> {
    let userInDB = await this.usersRepository.findOne<User>({ where: { id: id } } as FindOptions);
    if (!userInDB) {
      let message = this.i18n.translate("error.user_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.badRequestException(BadRequestCode.BA_USER_DOES_NOT_EXIST, "", message, []);
    }
    return userInDB;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    let userInDB = await this.usersRepository.findOne<User>({ where: { id: id } } as FindOptions);
    if (!userInDB) {
      let message = this.i18n.translate("error.user_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.badRequestException(BadRequestCode.BA_USER_DOES_NOT_EXIST, "", message, []);
    }
    await this.usersRepository.update<User>({
      name: updateUserDto.name,
      city: updateUserDto.city,
      address: updateUserDto.address,
      phone_number: updateUserDto.phone_number
    }, { where: { id: id } } as UpdateOptions);
    return new UpdateUserResponseDto();
  }

  async remove(id: number) {
    let userInDB = await this.usersRepository.findOne<User>({ where: { id } } as FindOptions);
    if (!userInDB) {
      let message = this.i18n.translate("error.user_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.exceptionService.badRequestException(BadRequestCode.BA_USER_DOES_NOT_EXIST, "", message, []);
    }
    await userInDB.destroy();
  }
}
