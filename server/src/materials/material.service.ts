import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './schema/material.schema';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialType, Test } from '@shared/types';
import { TestDto } from './dto/test.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly materialModel: Model<MaterialDocument>,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    switch (dto.kind) {
      case MaterialType.Article:
        return this.materialModel.discriminators[dto.kind].create(dto);
      case MaterialType.Lecture:
        return this.materialModel.discriminators[dto.kind].create(dto);
      case MaterialType.Video:
        return this.materialModel.discriminators[dto.kind].create(dto);
      default:
        throw new BadRequestException('Invalid material kind');
    }
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
    const updatedMaterial = await this.materialModel.findById(id).exec();
    if (
      dto.test !== undefined &&
      ((updatedMaterial as any).kind === MaterialType.Article ||
        (updatedMaterial as any).kind === MaterialType.Lecture)
    ) {
      (updatedMaterial as any).test = dto.test;

      if (!updatedMaterial) {
        throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
      }

      await updatedMaterial.save();
      return updatedMaterial;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.materialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }
    return { message: 'Матеріал успішно видалено.' };
  }
}
