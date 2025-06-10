import { ID } from ".";

export interface Achievement {
  _id: ID;
  title: string;
  description: string;
  requiredMaterialIds: ID[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
