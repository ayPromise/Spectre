import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAchievementDto } from './dto/achievement.dto';
import { Achievement, AchievementDocument } from './schemas/achievement.schema';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
  ) {}

  async create(dto: CreateAchievementDto): Promise<Achievement> {
    try {
      const created = new this.achievementModel(dto);
      return await created.save();
    } catch (err) {
      throw new InternalServerErrorException('Не вдалося створити досягнення.');
    }
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementModel.find().exec();
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementModel.findById(id).exec();
    if (!achievement) throw new NotFoundException('Досягнення не знайдено.');
    return achievement;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.achievementModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Досягнення не знайдено.');
    return { message: 'Досягнення видалено' };
  }

  async update(
    id: string,
    updateDto: Partial<CreateAchievementDto>,
  ): Promise<Achievement> {
    const achievement = await this.achievementModel.findById(id).exec();

    if (!achievement) {
      throw new NotFoundException('Досягнення не знайдено.');
    }

    const dtoAny = updateDto as any;
    const achievementAny = achievement as any;

    if ('title' in dtoAny) achievementAny.title = dtoAny.title;
    if ('description' in dtoAny)
      achievementAny.description = dtoAny.description;
    if ('category' in dtoAny) achievementAny.category = dtoAny.category;
    if ('requiredMaterials' in dtoAny)
      achievementAny.requiredMaterials = dtoAny.requiredMaterials;

    await achievement.save();

    return achievement;
  }

  async findGroupedByCategory() {
    const achievements = await this.achievementModel.find().lean();

    const grouped = achievements.reduce(
      (acc, achievement) => {
        const category = achievement.category || 'Без категорії';
        if (!acc[category]) acc[category] = [];
        acc[category].push(achievement);
        return acc;
      },
      {} as Record<string, typeof achievements>,
    );

    return grouped;
  }
}
