import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AppController } from './app.controller';

@Module({
  providers: [EventsGateway],
  controllers: [AppController],
})
export class AppModule {}
