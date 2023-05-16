import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
    id: string;

    displayName: string;

    first_name: string;


    last_name: string;


    avatar: string;

  
    email: string;

    phoneNumber:string;

    sign_in_provider: string;


    email_verified: boolean;

    disabled: boolean;
    auth_time: number;

    roles: Role[];
}
