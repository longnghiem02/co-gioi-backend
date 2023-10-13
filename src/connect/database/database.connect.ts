import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: Number(databaseConfig.host),
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          entities: [__dirname + '/../../**/*.model{.ts,.js}'],
          synchronize: Boolean(databaseConfig.synchronize),
        };
      },
    }),
  ],
})
export class ConnectDBModule {}
