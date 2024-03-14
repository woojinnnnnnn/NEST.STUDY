import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logo.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], // 여기에 연결
  controllers: [AppController], // 이게 라우터임
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 미들 웨어들은 여기 컨슈머에 연결
  }
}
