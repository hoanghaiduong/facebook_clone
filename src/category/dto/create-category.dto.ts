import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Category Title' })
    title: string;

    @ApiProperty({ example: 'Category Description' })
    description: string;
}
