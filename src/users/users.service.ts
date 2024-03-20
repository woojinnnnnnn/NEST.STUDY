import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt'
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usresRepository: Repository<Users>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        private dataSource: DataSource
    ) {}

    getUsers() {}

    // Join 회원 가입
    async join(email: string, nickname: string, password: string) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.getRepository(Users).findOne({ where: { email } });
            if (user) {
                throw new UnauthorizedException('EXIST USER');
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await queryRunner.manager.getRepository(Users).save({
                email,
                nickname,
                password: hashedPassword,
            });
            const workspaceMember = queryRunner.manager.getRepository(WorkspaceMembers).create();
            workspaceMember.UserId = newUser.id;
            workspaceMember.WorkspaceId = 1;
            await queryRunner.manager.getRepository(WorkspaceMembers).save(workspaceMember);
            await queryRunner.manager.getRepository(ChannelMembers).save({
                UserId: newUser.id,
                ChannelId: 1
            });
            await queryRunner.commitTransaction();
            return true;
        } catch (err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
