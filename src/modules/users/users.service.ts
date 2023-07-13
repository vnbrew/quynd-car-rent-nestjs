import {Inject, Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";
import {USER_TOKENS_REPOSITORY, USERS_REPOSITORY} from "../../core/constants";
import {User} from "./entities/user.entity";
import {AppExceptionService} from "../../core/exception/app.exception.service";
import {IDetailExceptionMessage} from "../../core/exception/app.exception.interface";
import {I18nContext, I18nService} from "nestjs-i18n";
import {genSalt, hash} from "bcrypt";
import {UserToken} from "./entities/user-token.entity";
import {UpdateUserResponseDto} from "./dto/update-user-response.dto";
import {FindOptions} from "sequelize";
import {UpdateOptions} from "sequelize/types/model";

@Injectable()
export class UsersService {

    constructor(
        @Inject(USERS_REPOSITORY) private readonly usersRepository: typeof User,
        @Inject(USER_TOKENS_REPOSITORY) private readonly userTokensRepository: typeof UserToken,
        private readonly exceptionService: AppExceptionService,
        private readonly i18n: I18nService
    ) {
    }

    async getUserByEmail(email: string) {
        const options: FindOptions = {
            where: {email: email},
        };
        return this.usersRepository.findOne<User>(options);
    }

    async getUserTokenByUserId(userId: number) {
        const options: FindOptions = {
            where: {user_id: userId},
        };
        return this.userTokensRepository.findOne<UserToken>(options);
    }

    async addOrUpdateUserAccessToken(userId: number, access_token: string) {
        let expiration_time: Date = new Date();
        expiration_time.setSeconds(expiration_time.getSeconds() + parseInt(process.env.JWT_EXP_TIME));
        let userTokenInDB = await this.getUserTokenByUserId(userId);
        if (userTokenInDB) {
            const options: UpdateOptions = {
                where: {user_id: userId},
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

    async removeTokenFromUserToken(token: string): Promise<boolean> {
        const options: FindOptions = {
            where: {token: token},
        };
        let userTokenInDB = await this.userTokensRepository.findOne(options);
        if (userTokenInDB) {
            await userTokenInDB.destroy();
            return true;
        }
        return false;
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
            const userData = await user.save();
            return new CreateUserResponseDto(userData);
        } catch (error) {
            if (error.original.code === "ER_DUP_ENTRY") {
                if (error.errors.length > 0) {
                    const transformedErrors = error.errors.map((e) => {
                        const code = '';
                        const field = e.path;
                        const message = e.message;
                        let detail: IDetailExceptionMessage = {code, field, message};
                        return detail;
                    });
                    let message = this.i18n.translate("error.data_type", {
                        lang: I18nContext.current().lang
                    });
                    this.exceptionService.badRequestException(message, transformedErrors);
                }
            }
            let message = this.i18n.translate("error.internal_server_error", {
                lang: I18nContext.current().lang
            });
            this.exceptionService.internalServerErrorException(message, []);
        }
    }

    findMe(user: any) {
        const options: FindOptions = {
            where: {id: user.id},
        };
        return this.usersRepository.findOne<User>(options);
    }

    findAll() {
        return this.usersRepository.findAll<User>();
    }

    async findOne(id: number) {
        const options: FindOptions = {
            where: {id: id},
        };
        let userInDB = await this.usersRepository.findOne<User>(options);
        if (!userInDB) {
            let message = this.i18n.translate("error.user_not_existing", {
                lang: I18nContext.current().lang
            });
            this.exceptionService.badRequestException(message, []);
        }
        return userInDB
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
        let userInDB = await this.usersRepository.findOne<User>({
            where: {id: id},
        } as FindOptions);
        if (!userInDB) {
            let message = this.i18n.translate("error.user_not_existing", {
                lang: I18nContext.current().lang
            });
            this.exceptionService.badRequestException(message, []);
        }
        const options: UpdateOptions = {
            where: {id: id},
        };
        await this.usersRepository.update<User>({
            name: updateUserDto.name,
            city: updateUserDto.city,
            address: updateUserDto.address,
            phone_number: updateUserDto.phone_number
        }, options);
        let newUser = await this.usersRepository.findOne<User>({where: {id}} as FindOptions);
        return new UpdateUserResponseDto(newUser);
    }

    async updateMe(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
        await this.usersRepository.update<User>({
            name: updateUserDto.name,
            city: updateUserDto.city,
            address: updateUserDto.address,
            phone_number: updateUserDto.phone_number
        }, {where: {id}} as UpdateOptions);
        let newUser = await this.usersRepository.findOne<User>({where: {id}} as FindOptions);
        return new UpdateUserResponseDto(newUser);
    }

    async remove(id: number) {
        let userInDB = await this.usersRepository.findOne<User>({where: {id}} as FindOptions);
        if (userInDB) {
            await userInDB.destroy();
            let message = this.i18n.translate("message.deleted_user_success", {
                lang: I18nContext.current().lang
            });
            return {message};
        } else {
            let message = this.i18n.translate("error.user_not_existing", {
                lang: I18nContext.current().lang
            });
            this.exceptionService.badRequestException(message, []);
        }
    }
}
