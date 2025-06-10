import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { Achievement, AchievementSchema } from './schemas/achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
    ]),
  ],
  providers: [AchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
