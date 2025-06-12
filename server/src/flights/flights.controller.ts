import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '@shared/types';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { FlightsService } from './flights.service';

@Controller('flights')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FlightsController {
  constructor(private readonly flightService: FlightsService) {}

  @Get()
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  getById(@Param('id') id: string) {
    return this.flightService.findById(id);
  }

  @Post()
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/flights',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.originalname.replace(/\s/g, '_') +
              '-' +
              uniqueSuffix +
              extname(file.originalname),
          );
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Request['file'], @Req() req: Request) {
    return this.flightService.create(file, req.user['userId']);
  }

  @Delete(':id')
  @Roles(UserRole.Student, UserRole.Instructor, UserRole.Admin)
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.flightService.delete(id, {
      userId: req.user.sub,
      role: req.user.role,
    });
  }
}
