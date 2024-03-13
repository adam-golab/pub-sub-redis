import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';
import { v4 } from 'uuid';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly client = createClient();

  async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  async publishEvent(payload: {
    data: string;
    channel: string;
  }): Promise<void> {
    const event = {
      id: v4(),
      data: payload.data,
    };

    await this.client.publish(
      `events:${payload.channel}`,
      JSON.stringify(event),
    );
  }
}
