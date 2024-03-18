import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestsDto { // 네스트 식 인터페이스
    @ApiProperty( {
        example: 'woojin@naver.com',
        description: "이메일",
        required: true
    })
    public email: string;

    @ApiProperty( {
        example: 'kimchi',
        description: "닉네임",
        required: true
    })

    public nickname: string;

    @ApiProperty( {
        example: 'q1w2e3r4',
        description: "패스워드",
        required: true
    })

    public password: string;
}