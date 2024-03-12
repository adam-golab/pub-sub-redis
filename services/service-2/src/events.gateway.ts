import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventEmitter } from "events";
import { fromEvent, Observable } from "rxjs";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private readonly internalEventEmitter = new EventEmitter();

  @WebSocketServer()
  server: Server;

  async emitSocketIoEvent(data: string): Promise<void> {
    this.server.emit('events', data);
  }

  subscribeToInternalEvent(): Observable<MessageEvent> {
    return fromEvent(this.internalEventEmitter, 'internal-events') as Observable<MessageEvent>;
  }

  emitInternalEvent(data: string) {
    this.internalEventEmitter.emit('internal-events', { data });
  }
}
