import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logo.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { Users } from './entities/Users';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        WorkspacesModule,
        ChannelsModule,
        DmsModule,
        TypeOrmModule.forFeature([Users]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          // entities: ['entities/*js'], 이것 혹은 안에 직접 임포트 하기, 혹은
          // autoLoadEntities: true, // 이걸 사용 하면 자동으로 생성이 되지만 오류가 발생하는 경우가 있음.
          entities: [ChannelChats, ChannelMembers, Channels, DMs, Mentions, Users, WorkspaceMembers, Workspaces],
          keepConnectionAlive: true,
          logging: true,
          charset: 'utf8mb4',
          synchronize: false, // 한번 만들고 false 로 바꾸기.
        }),
        // TypeOrmModule.forRoot([Users])
    ], // 여기에 연결
    controllers: [AppController], // 이게 라우터임
    providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*'); // 미들 웨어들은 여기 컨슈머에 연결
    }
}
