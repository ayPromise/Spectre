import { ID, MaterialType } from ".";

export interface RequiredMaterialRef {
  id: ID;
  kind: MaterialType;
}

export interface Achievement {
  _id: ID;
  title: string;
  description: string;
  requiredMaterials: RequiredMaterialRef[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
