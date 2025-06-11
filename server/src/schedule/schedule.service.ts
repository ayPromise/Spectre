import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Schedule as ScheduleModel,
  ScheduleDocument,
} from './schema/schedule.schema';
import { Schedule } from '@shared/types';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(ScheduleModel.name)
    private scheduleModel: Model<ScheduleDocument>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async create(createDto: CreateScheduleDto): Promise<Schedule> {
    try {
      const createdSchedule = new this.scheduleModel(createDto);
      const saved = await createdSchedule.save();

      this.notificationGateway.sendNewNotification(createdSchedule, 'schedule');

      return {
        ...saved.toObject(),
        _id: saved._id.toString(),
        assignedUsers: saved.assignedUsers.map((user) => user.toString()),
      };
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.date) {
        throw new ConflictException('Розклад на цю дату вже існує.');
      }

      throw new InternalServerErrorException('Не вдалося створити розклад.');
    }
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.scheduleModel.find().exec();

    return schedules.map((sch) => {
      const obj = sch.toObject();

      const schedule: Schedule = {
        ...obj,
        _id: obj._id.toString(),
        assignedUsers: obj.assignedUsers.map((u: any) => u.toString()),
      };

      return schedule;
    });
  }

  async findOne(_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id).exec();

    if (!schedule) {
      throw new NotFoundException(`Schedule with _id ${_id} not found`);
    }

    const obj = schedule.toObject();
    return {
      ...obj,
      _id: obj._id.toString(),
      assignedUsers: obj.assignedUsers.map((u: any) => u.toString()),
    };
  }

  async delete(_id: string): Promise<{ message: string }> {
    const result = await this.scheduleModel.findByIdAndDelete(_id).exec();

    if (!result) {
      throw new Error(`Schedule with _id ${_id} not found`);
    }

    return { message: `Schedule with _id ${_id} deleted successfully` };
  }

  async update(
    _id: string,
    updateDto: Partial<Schedule>,
  ): Promise<{ message: string }> {
    const updated = await this.scheduleModel.findByIdAndUpdate(_id, updateDto, {
      new: true,
      runVal_idators: true,
    });

    if (!updated) {
      throw new Error(`Schedule with _id ${_id} not found`);
    }

    return { message: 'Schedule updated' };
  }

  async signUp(_id: string, user_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);

    if (!schedule) {
      throw new NotFoundException(`Розклад з _id ${_id} не знайдено.`);
    }

    const userAlreadySigned = schedule.assignedUsers.some(
      (u: any) => u.toString() === user_id,
    );

    if (userAlreadySigned) {
      throw new ConflictException('Ви вже записані на це заняття.');
    }

    schedule.assignedUsers.push(user_id);
    const updated = await schedule.save();

    return {
      ...updated.toObject(),
      _id: updated._id.toString(),
      assignedUsers: updated.assignedUsers.map((u: any) => u.toString()),
    };
  }

  async unsubscribe(_id: string, user_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);

    if (!schedule) {
      throw new NotFoundException(`Розклад з _id ${_id} не знайдено.`);
    }

    const userIndex = schedule.assignedUsers.findIndex(
      (u: any) => u.toString() === user_id,
    );

    if (userIndex === -1) {
      throw new ConflictException('Ви не були записані на це заняття.');
    }

    schedule.assignedUsers.splice(userIndex, 1);

    const updated = await schedule.save();

    return {
      ...updated.toObject(),
      _id: updated._id.toString(),
      assignedUsers: updated.assignedUsers.map((u: any) => u.toString()),
    };
  }
}
