import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FlightSchema } from './schemas/library.schema';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FlightSchema }]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
