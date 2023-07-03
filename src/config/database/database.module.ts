import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { TypeOrmConfigModule } from 'src/config/typeorm/typeorm.module';
import { TypeOrmConfigService } from 'src/config/typeorm/typeorm.service';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [TypeOrmConfigModule],
    //   inject: [TypeOrmConfigService],
    //   // useFactory: async (config: TypeOrmConfigService) => config.createTypeOrmOptions(),
    //   useClass: TypeOrmConfigService,
    // }),
    TypeOrmModule.forRoot(AppDataSource.options),
    // TypeOrmConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
