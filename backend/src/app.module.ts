import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { commonConfig } from './config/common.config';
import { databaseConfig } from './config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiagnosticGroupModel } from './models/diagnostic-group.model';
import { DiagnosticModel } from './models/diagnostic.model';
import { DiagnosticMetricModel } from './models/diagnostic-metric.model';
import { Hl7ParserModule } from './modules/hl7-parser/hl7-parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig, databaseConfig],
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DATABASE.HOST'),
        port: configService.get('DATABASE.PORT'),
        username: configService.get('DATABASE.USERNAME'),
        password: configService.get('DATABASE.PASSWORD'),
        database: configService.get('DATABASE.DATABASE_NAME'),
        models: [DiagnosticGroupModel, DiagnosticModel, DiagnosticMetricModel],
      }),
      inject: [ConfigService],
    }),

    Hl7ParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
