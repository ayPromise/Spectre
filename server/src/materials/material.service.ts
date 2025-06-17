import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './schema/material.schema';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialType, MaterialUnion } from '@shared/types';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<MaterialDocument>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    let createdMaterial: MaterialUnion;

    switch (dto.kind) {
      case MaterialType.Article:
      case MaterialType.Lecture:
      case MaterialType.Video:
        createdMaterial =
          await this.materialModel.discriminators[dto.kind].create(dto);
        break;
      default:
        throw new BadRequestException('Invalid material kind');
    }
    this.notificationGateway.sendNewNotification(
      createdMaterial,
      'material',
      'create',
    );

    return createdMaterial;
  }

  async findAll(): Promise<Material[]> {
    return this.materialModel.find().exec();
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }
    return material;
  }

  async update(id: string, dto: Partial<CreateMaterialDto>): Promise<Material> {
    const existingMaterial = await this.materialModel.findById(id).exec();

    if (!existingMaterial) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }
    const material = existingMaterial.toObject() as Material;

    if (dto.kind && dto.kind !== material.kind) {
      await this.materialModel.findByIdAndDelete(id).exec();

      const created = await this.materialModel.discriminators[dto.kind].create({
        ...dto,
        _id: id, // зберігаємо старий id, якщо потрібно
      });

      this.notificationGateway.sendNewNotification(created, 'material', 'edit');

      return created;
    }

    // Якщо kind не змінюється — оновлюємо як завжди
    const updatedAny = existingMaterial as any;
    const dtoAny = dto as any;

    if ('title' in dtoAny) updatedAny.title = dtoAny.title;
    if ('content' in dtoAny) updatedAny.content = dtoAny.content;
    if ('description' in dtoAny) updatedAny.description = dtoAny.description;
    if ('videoURL' in dtoAny) updatedAny.videoURL = dtoAny.videoURL;
    if ('course' in dtoAny) updatedAny.course = dtoAny.course;
    if ('time' in dtoAny) updatedAny.time = dtoAny.time;
    if ('test' in dtoAny) updatedAny.test = dtoAny.test;

    await existingMaterial.save();

    this.notificationGateway.sendNewNotification(
      updatedAny,
      'material',
      'edit',
    );

    return updatedAny;
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.materialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }
    return { message: 'Матеріал успішно видалено.' };
  }
}
