import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/achievement.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '@shared/types';

@Controller('achievements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Instructor)
  create(@Body() dto: CreateAchievementDto) {
    return this.achievementService.create(dto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  findAll() {
    return this.achievementService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Instructor)
  delete(@Param('id') id: string) {
    return this.achievementService.delete(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Instructor)
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateAchievementDto>,
  ) {
    return this.achievementService.update(id, updateDto);
  }

  @Get('grouped-by-category')
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async getGroupedByCategory() {
    return this.achievementService.findGroupedByCategory();
  }
}
