import { ApiProperty } from "@nestjs/swagger";
import { JoinRequestsDto } from "src/users/dto/join.requests.dto";

export class UserDto extends JoinRequestsDto {
    @ApiProperty ({
        required: true,
        example: 1,
        description: "아이디"
    })
    id: number
}