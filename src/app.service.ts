import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';

// 요청, 응답에 대해서는 모름. 순수하게 해야 하는 일 만 하고 컨트롤러로 돌려주기
@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello() {
    this.usersService.getUsers();
    this.getWow();
    return process.env.SC
  }

  async getWow() {

  }
}

// getUser(): string {
//   const user = awit User.findOne()
//    return user;
// }

// postUser(): string {
//   const user = awit User.create()
//    return user;
// }

