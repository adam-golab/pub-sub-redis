import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsGateway } from "./events.gateway";

@Module({
  providers: [AppService, EventsGateway],
})
export class AppModule {}
