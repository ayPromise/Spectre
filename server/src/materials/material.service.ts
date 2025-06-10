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

    if (!updatedMaterial) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }

    const dtoAny = dto as any;
    const updatedMaterialAny = updatedMaterial as any;

    if ('title' in dtoAny) updatedMaterialAny.title = dtoAny.title;
    if ('description' in dtoAny)
      updatedMaterialAny.description = dtoAny.description;
    if ('videoURL' in dtoAny) updatedMaterialAny.videoURL = dtoAny.videoURL;
    if ('type' in dtoAny) updatedMaterialAny.type = dtoAny.type;
    if ('kind' in dtoAny) updatedMaterialAny.kind = dtoAny.kind;
    if ('time' in dtoAny) updatedMaterialAny.time = dtoAny.time;

    if (
      'test' in dtoAny &&
      (updatedMaterialAny.kind === MaterialType.Article ||
        updatedMaterialAny.kind === MaterialType.Lecture)
    ) {
      updatedMaterialAny.test = dtoAny.test;
    }

    await updatedMaterial.save();
    return updatedMaterial;
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.materialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Матеріал з id ${id} не знайдено.`);
    }
    return { message: 'Матеріал успішно видалено.' };
  }
}
