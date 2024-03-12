import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from "./events.gateway";
import { AppController } from "./app.controller";

@Module({
  providers: [AppService, EventsGateway],
  controllers: [
    AppController
  ],
})
export class AppModule {}
