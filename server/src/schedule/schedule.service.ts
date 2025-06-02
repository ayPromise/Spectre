import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule as ScheduleModel, ScheduleDocument } from './schema/schedule.schema';
import { Schedule } from '@shared/types';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(ScheduleModel.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createDto: CreateScheduleDto): Promise<Schedule> {
    const created = new this.scheduleModel(createDto);
    const saved = await created.save();
    return {
      ...saved,
      id: saved._id.toString(),
      assignedUsers: saved.assignedUsers.map(user => user.toString()),

    };
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.scheduleModel.find().exec();
  
    return schedules.map(sch => {
      const obj = sch.toObject();
  
      const schedule: Schedule = {
        ...obj,
        id: obj._id.toString(),
        assignedUsers: obj.assignedUsers.map((u: any) => u.toString()),
      };
  
      return schedule;
    });
  }

  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id).exec();
  
    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  
    const obj = schedule.toObject();
    return {
      ...obj,
      id: obj._id.toString(),
      assignedUsers: obj.assignedUsers.map((u: any) => u.toString()),
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.scheduleModel.findByIdAndDelete(id).exec();
  
    if (!result) {
      throw new Error(`Schedule with id ${id} not found`);
    }
  
    return { message: `Schedule with id ${id} deleted successfully` };
  }

  async update(id: string, updateDto: Partial<Schedule>): Promise<{ message: string }> {
    const updated = await this.scheduleModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    });
  
    if (!updated) {
      throw new Error(`Schedule with id ${id} not found`);
    }
  
    return { message: 'Schedule updated' };
  }  
  
}
