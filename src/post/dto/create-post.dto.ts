import { ApiProperty } from "@nestjs/swagger";


export class CreatePostDto {

    title: string;

    content: string;

    photo: string;


    favorites: number;


    views: number;

    isFeatured: boolean;

    isTrending: boolean;

    isPopular: boolean;

    isHot: boolean;

    isNews: boolean;

    isFavourite: boolean;

    images: any[];
    comments: Comment[];

    userId: string;
    categoryId: string;
}
