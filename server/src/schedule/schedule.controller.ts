import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@shared/types';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(dto);
  }

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }
}
