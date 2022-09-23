import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from './db.constants';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from 'src/user/entity/user.entity';
import { Books } from 'src/books/entity/books.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        const conf: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>(DB_HOST),
          port: Number(configService.get<string>(DB_PORT)),
          username: configService.get<string>(DB_USERNAME),
          password: configService.get<string>(DB_PASSWORD),
          database: configService.get<string>(DB_DATABASE),
          entities:  [User, Books],
          synchronize: true,
          migrationsTableName: 'migrations',
          namingStrategy: new SnakeNamingStrategy(),
          migrations: ['src/db/migrations/*.ts'],
        };
        return conf;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
