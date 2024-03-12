import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';
import { EventsGateway } from "./events.gateway";
import { AppController } from "./app.controller";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly eventsGateway: EventsGateway) {
  }

  private readonly client = createClient();

  async onModuleInit() {
    const subscriber = this.client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('events', (message) => {
      console.log('Received message:', message);

      this.eventsGateway.emitSocketIoEvent(message);
      this.eventsGateway.emitInternalEvent(message);
    });
  }
}

