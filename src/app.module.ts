import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require("cookie-session")

@Module({
  imports: [
    // config module use to detect what .env file to be used
    // and .forRoot to be available for the whole pproject
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    // config service use to detect what env var to be used
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true // watch changes in entites to modify DB. do not use in production
        }
      }
    }),
    UsersModule,
    ReportsModule],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true // remove unwanted properties from request body
      })
    }
  ],
})
export class AppModule {
  constructor(private config: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.config.get('COOKIE_KEY')]
    })).forRoutes('*')
  }
}
