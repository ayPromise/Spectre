import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule, ScheduleSchema } from './schema/schedule.schema';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  providers: [ScheduleService, NotificationGateway],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
