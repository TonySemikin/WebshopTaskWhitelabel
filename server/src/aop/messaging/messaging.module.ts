import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InProcessMessagingService } from './in-process-messaging.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [InProcessMessagingService],
  exports: [EventEmitterModule, InProcessMessagingService],
})
export class MessagingRootModule {}
