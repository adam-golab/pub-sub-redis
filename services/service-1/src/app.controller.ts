import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async publishEvent(@Body() body: { data: string }): Promise<void> {
    const { data } = body;

    return this.appService.publishEvent(data);
  }
}
