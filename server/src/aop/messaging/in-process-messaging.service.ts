import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { logger } from '../logger/logger';
import { BaseEvent } from './events/base.event';

@Injectable()
export class InProcessMessagingService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitEvent(event: BaseEvent) {
    logger.info(`Emitting event ${event.name} ${event.id}`);
    const { name } = event;

    this.eventEmitter.emit(name, event);
  }

  listenToEvent(eventName: string, callback: (data: any) => void) {
    this.eventEmitter.on(eventName, (event: BaseEvent) => {
      logger.info(`Received event ${eventName} ${event.id}`);
      callback(event.payload);
    });
  }
}
