import { Controller, Query, Sse } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Sse('sse')
  emitServerSideEvent(
    @Query('channel') channel: string,
  ): Promise<Observable<MessageEvent>> {
    return this.eventsGateway.subscribeToInternalEvent(channel);
  }
}
