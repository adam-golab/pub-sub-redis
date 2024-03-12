import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { EventsGateway } from "./events.gateway";
import { Observable } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Sse('sse')
  emitServerSideEvent(): Observable<MessageEvent>{
    return this.eventsGateway.subscribeToInternalEvent()
  }
}
