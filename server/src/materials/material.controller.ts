import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Patch,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Material } from './schema/material.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from '@shared/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

  @Post('upload')
  @Roles(UserRole.Instructor, UserRole.Admin)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          if (!file || !file.originalname) {
            return cb(
              new BadRequestException('File or originalname is missing'),
              '',
            );
          }
          const ext = path.extname(file.originalname);
          const filename = `${Date.now()}-${uuidv4()}${ext}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 500 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
          return cb(
            new BadRequestException('Only video files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const videoUrl = `/uploads/${file.filename}`;
    return { success: true, url: videoUrl };
  }
}
