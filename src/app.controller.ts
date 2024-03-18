import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 이부분에서 기본 엔드포인트 설정.
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 이놈은 req, res 에 대해서 알고 있음.
  @Get()
  getHello() {
    console.log("hihi")
    return this.appService.getHello();
  }
}
