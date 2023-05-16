import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({
        example:'ROLE_NAME'
    })
    name: string;
}
