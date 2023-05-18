import { Controller, Get, Render, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('404')
  
  getHello() {
    try {
      return {
        statusCode: 200,
        message: "Hello everyone"
      }
    } catch (error) {

      throw new BadRequestException(error.message)
    }
  }
}
