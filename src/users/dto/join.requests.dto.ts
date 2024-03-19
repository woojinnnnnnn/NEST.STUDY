import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestsDto extends PickType(Users, ['email', 'nickname', 'password'] as const) {
    // 네스트 식 인터페이스, 상단의 픽타입을 통해서 그대로 불러오기 때문에 하단 부분이 주석 처리 됨.
    // public email: string;

    // public nickname: string;

    // public password: string;
}
