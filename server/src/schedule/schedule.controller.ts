import { Controller, Post, Body, Get, Delete, Param, NotFoundException, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule, UserRole } from '@shared/types';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decorator';

@Controller('schedule')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Instructor)
  create(@Body() dto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(dto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
async findOne(@Param('id') id: string): Promise<Schedule> {
  return this.scheduleService.findOne(id);
}

  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Instructor)
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
  @Roles(UserRole.Admin, UserRole.Instructor)
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
  
  @Put('sign-up/:id')
  @Roles(UserRole.Student)
  async signUp(
    @Param('id') id: string,
    @Body('newUserId') newUserId: string,
  ): Promise<Schedule> {
    if (!newUserId) {
      throw new BadRequestException('Передайте ID користувача в полі newUserId');
    }
    return this.scheduleService.signUp(id, newUserId);
  }

  @Put('unsubscribe/:id')
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async unsubscribe(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Schedule> {
    if (!userId) {
      throw new BadRequestException('Передайте ID користувача в полі userId');
    }
    return this.scheduleService.unsubscribe(id, userId);
  }
}
