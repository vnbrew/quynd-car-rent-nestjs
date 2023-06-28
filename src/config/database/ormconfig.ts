import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig(configService: ConfigService): TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: this.configService.get('DB_PORT'),
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    database: this.configService.get('DB_DATABASE'),
    entities: [],
    synchronize: false,
    logging: true,
    migrations: [],
    subscribers: [],
};

export default ormConfig;