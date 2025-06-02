import { Controller, Post, Body, Get, Delete, Param, NotFoundException, Put, BadRequestException } from '@nestjs/common';
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

  @Get(':id')
async findOne(@Param('id') id: string): Promise<Schedule> {
  return this.scheduleService.findOne(id);
}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.scheduleService.delete(id);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }


  @Put(':id')
async update(
  @Param('id') id: string,
  @Body() updateDto: Partial<Schedule>,
): Promise<{ message: string }> {
  try {
    return await this.scheduleService.update(id, updateDto);
  } catch (error) {
    if (error.message.includes('not found')) {
      throw new NotFoundException(error.message);
    }
    throw new BadRequestException(error.message);
  }
}
}
