import {
  OnGatewayConnection, OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({

  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(): any {
    console.log('client connected');
  }

  handleDisconnect(): any {
    console.log('client disconnected');
  }

  @WebSocketServer()
  server: Server;

  async emitEvent(data: string): Promise<void> {
    this.server.emit('events', data);
  }
}
