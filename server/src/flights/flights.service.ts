import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FlightType, UserRole } from '@shared/types';
import { Flight, FlightDocument } from './schemas/flights.schema';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<FlightDocument>,
  ) {}

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find();
  }

  async findById(id: string): Promise<Flight> {
    const flight = await this.flightModel.findById(id);
    if (!flight) throw new NotFoundException('Політ не знайдено.');
    return flight;
  }

  async create(file: Express.Multer.File, userId: string): Promise<Flight> {
    const filePath = `/flights/${file.filename}`;
    const title = file.originalname;
    const today = new Date();

    const mockMapPoints = [
      { coordX: 0, coordY: 0, coordZ: 0 },
      { coordX: 1, coordY: 2, coordZ: 3, comment: 'Mock Point' },
    ];

    return this.flightModel.create({
      title,
      userId: new Types.ObjectId(userId),
      date: today,
      flightType: FlightType.Recon,
      mapPoints: mockMapPoints,
      filePath,
    });
  }

  async delete(id: string, user: { userId: string; role: UserRole }) {
    const flight = await this.flightModel.findById(id);
    if (!flight) throw new NotFoundException('Політ не знайдено.');

    if (
      flight.userId.toString() !== user.userId &&
      user.role !== UserRole.Admin &&
      user.role !== UserRole.Instructor
    ) {
      throw new ForbiddenException('Недостатньо прав для видалення польоту.');
    }

    await this.flightModel.findByIdAndDelete(id);
    return { message: 'Політ успішно видалено.' };
  }
}
