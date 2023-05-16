import { ApiProperty } from "@nestjs/swagger";
import { POST_TYPE } from "../enum/post_type.enum";

export class CreatePostDto {
    @ApiProperty({
        example: "Bài viết đầu tiên"
    })
    title: string;

    @ApiProperty({
        example: `<p>&nbsp;</p>
<table style="border-collapse: collapse; width: 100.022%; height: 145.275px;" border="1"><colgroup><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.5913%;"></colgroup>
<tbody>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;"><em><strong>3313</strong></em></td>
<td style="height: 24.2125px;"><em><strong>123</strong></em></td>
<td style="height: 24.2125px;"><em><strong>123</strong></em></td>
<td style="height: 24.2125px;"><em><strong>123</strong></em></td>
<td style="height: 24.2125px;"><em><strong>4124</strong></em></td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;">123</td>
<td style="height: 24.2125px;">44567<img src="https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg" alt="7,324,280 Online Images, Stock Photos &amp; Vectors | Shutterstock">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;"><em><strong>12</strong></em></td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
<tr style="height: 24.2125px;">
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
<td style="height: 24.2125px;">&nbsp;</td>
</tr>
</tbody>
</table>`,
    })
    content: string;

    @ApiProperty({
        example: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    })
    photo?: string;

    @ApiProperty({
        example: 0
    })
    favorites: number;

    @ApiProperty({
        example: 0
    })
    views: number;


    type: POST_TYPE;


    comments: Comment[];

    userId: string;
    categoryId: string;




}
