import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';
import { v4 } from 'uuid';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly client = createClient();

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  async publishEvent(data: string): Promise<void> {
    const event = {
      id: v4(),
      data,
    }

    await this.client.publish('events', JSON.stringify(event));
  }
}
