// model MenuCategory {
//     id         String   @id @default(cuid())
//     name       String
//     providerId String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt

//     provider     Provider       @relation(fields: [providerId], references: [id])
//     ProviderMenu ProviderMenu[]
//   }

import prisma from "./prisma";

export async function getMenuCategories() {
  return await prisma.menuCategory.findMany();
}

export async function getMenuCategory(id) {
  return await prisma.menuCategory.findUnique({
    where: { id: Number(id) },
  });
}

export async function createMenuCategory(data) {
  return await prisma.menuCategory.create({
    data,
  });
}

export async function updateMenuCategory(id, data) {
  return await prisma.menuCategory.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteMenuCategory(id) {
  return await prisma.menuCategory.delete({
    where: { id: Number(id) },
  });
}

export async function searchMenuCategories(name, providerId) {
  return await prisma.menuCategory.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { providerId: { contains: providerId } },
      ],
    },
  });
}
