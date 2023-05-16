import * as dotenv from 'dotenv';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { PostImage } from 'src/post-image/entities/post-image.entity';
import { Post } from 'src/post/entities/post.entity';
import { Role } from 'src/role/entities/role.entity';

import { User } from 'src/users/entities/user.entity';


dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
const DB_NAME = process.env.DB_NAME;
const PORT_SERVER = process.env.PORT_SERVER;
const EXPIRES_TIME = process.env.EXPIRES_TIME;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const ENTITIES = [
    User,
    Post,
    PostImage,
    Comment,
    Role,
    Category
]

// const ENTITIES = ['dist/**/*.entity{.ts,.js}'];
// const MIGRATIONS = ["dist/database/migrations/*.js"];
// const CLI_DB = {
//     cli: {
//         migrationsDir: "src/database/migrations"
//     }
// }
export {
    JWT_SECRET_KEY,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_TYPE,
    DB_NAME,
    PORT_SERVER,
    EXPIRES_TIME,
    ENTITIES,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
    // ENTITIES,
    // MIGRATIONS,
    // CLI_DB
}