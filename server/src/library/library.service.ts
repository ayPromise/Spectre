import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FlightType, UserRole } from '@shared/types';
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
    if (!flight) throw new NotFoundException('Політ не знайдено.');
    return flight;
  }

  async create(file: Express.Multer.File, userId: string): Promise<File> {
    const filePath = `/flights/${file.filename}`;
    const title = file.originalname;
    const today = new Date();

    const mockMapPoints = [
      { coordX: 0, coordY: 0, coordZ: 0 },
      { coordX: 1, coordY: 2, coordZ: 3, comment: 'Mock Point' },
    ];

    return this.libraryModel.create({
      title,
      userId: new Types.ObjectId(userId),
      date: today,
      flightType: FlightType.Recon,
      mapPoints: mockMapPoints,
      filePath,
    });
  }

  async delete(id: string, user: { userId: string; role: UserRole }) {
    const flight = await this.libraryModel.findById(id);
    if (!flight) throw new NotFoundException('Політ не знайдено.');

    if (
      flight.userId.toString() !== user.userId ||
      user.role === UserRole.Admin ||
      user.role === UserRole.Instructor
    ) {
      throw new ForbiddenException('Недостатньо прав для видалення польоту.');
    }

    await this.libraryModel.findByIdAndDelete(id);
    return { message: 'Політ успішно видалено.' };
  }
}
