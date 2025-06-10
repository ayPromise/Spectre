import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Material } from './schema/material.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from '@shared/types';

@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @Roles(UserRole.Instructor, UserRole.Admin)
  create(@Body() dto: CreateMaterialDto): Promise<Material> {
    return this.materialService.create(dto);
  }

  @Get()
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  findAll(): Promise<Material[]> {
    return this.materialService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  findOne(@Param('id') id: string): Promise<Material> {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.Instructor, UserRole.Admin)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMaterialDto>,
  ): Promise<Material> {
    return this.materialService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.Instructor, UserRole.Admin)
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.materialService.delete(id);
  }
}
