import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usresRepository: Repository<Users>,
    ) {}

    getUsers() {}

    // Join 회원 가입
    async join(email: string, nickname: string, password: string) {
        const user = await this.usresRepository.findOne( { where: { email }} )
        if (user) {
            throw new UnauthorizedException('EXIXT USER') // 이게 내가 지정한 에러,
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await this.usresRepository.save({
            email,
            nickname,
            password: hashedPassword,
        })
    }
}
