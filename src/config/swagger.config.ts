import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
    .setTitle('API FACEBOOK CLONE')
    .setDescription('DỰ ÁN')
    .setVersion('3.0')
    .addBearerAuth()
    .build();

export { swaggerConfig }