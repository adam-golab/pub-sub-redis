import { EventEmitter } from 'events';
import { fromEvent, Observable } from 'rxjs';
import { createClient, RedisClientType } from 'redis';

export class EventsGateway {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = await createClient();

    await this.client.connect();
  }

  async subscribeToInternalEvent(
    channel: string,
  ): Promise<Observable<MessageEvent>> {
    const internalEventEmitter = new EventEmitter();

    await this.client.subscribe(`events:${channel}`, (message) => {
      console.log('Received message:', message);

      internalEventEmitter.emit('internal-events', { data: message });
    });

    return fromEvent<MessageEvent>(internalEventEmitter, 'internal-events');
  }
}
