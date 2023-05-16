import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDTO {

    @ApiProperty({
        example:'Hoàng Hải Dương'
    })
    displayName: string;
    
    @ApiProperty({
        example: "hoanghaiduong1711@gmail.com",
    })
    email: string;
    @ApiProperty({
        example: "hoanghaiduong1711@gmail.com",
    })
    password: string;
}
