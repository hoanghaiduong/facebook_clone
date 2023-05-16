import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from 'src/role/entities/role.entity';

export class UpdateUserDto {
    @ApiProperty({
        example: "displayName",
    })
    displayName: string;

    @ApiProperty({
        example: "first_name",
    })
    first_name: string;

    @ApiProperty({
        example: "last_name",
    })
    last_name: string;
    @ApiProperty({
        example: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    })
    avatar: string;

    @ApiProperty({
        example: "+84707278154",
    })
    phoneNumber: string;

   

    sign_in_provider: string;

    @ApiProperty({
        example: true,
    })
    email_verified: boolean;

    @ApiProperty({
        example: false,
    })
    disabled: boolean;

    auth_time: number;

    roles: Role[];
}
