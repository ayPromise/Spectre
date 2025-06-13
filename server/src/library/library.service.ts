import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from '@shared/types';
import { File, LibraryDocument } from './schemas/library.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(File.name)
    private readonly libraryModel: Model<LibraryDocument>,
  ) {}

  async findAll(): Promise<File[]> {
    return this.libraryModel.find();
  }

  async findById(id: string): Promise<File> {
    const flight = await this.libraryModel.findById(id);
    if (!flight) throw new NotFoundException('Файл не знайдено.');
    return flight;
  }

  async create(file: Express.Multer.File, userId: string): Promise<File> {
    const filePath = `/files/${file.filename}`;
    const title = file.originalname;
    const today = new Date();

    return this.libraryModel.create({
      title,
      userId: new Types.ObjectId(userId),
      date: today,
      filePath,
    });
  }

  async delete(id: string, user: { userId: string; role: UserRole }) {
    const flight = await this.libraryModel.findById(id);
    if (!flight) throw new NotFoundException('Файл не знайдено.');

    if (
      flight.userId.toString() !== user.userId ||
      user.role === UserRole.Admin ||
      user.role === UserRole.Instructor
    ) {
      throw new ForbiddenException('Недостатньо прав для видалення файлу.');
    }

    await this.libraryModel.findByIdAndDelete(id);
    return { message: 'Файл успішно видалено.' };
  }
}
