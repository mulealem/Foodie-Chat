// model Chat {
//     id         String   @id @default(cuid())
//     providerId String
//     senderId   String
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt

//     provider Provider  @relation(fields: [providerId], references: [id])
//     Message  Message[]
//     Order    Order[]
//   }

import prisma from "./prisma";

export async function getChats() {
  return await prisma.chat.findMany();
}

export async function getChat(id) {
  return await prisma.chat.findUnique({
    where: { id: Number(id) },
  });
}

export async function createChat(data) {
  return await prisma.chat.create({
    data,
  });
}

export async function updateChat(id, data) {
  return await prisma.chat.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteChat(id) {
  return await prisma.chat.delete({
    where: { id: Number(id) },
  });
}

export async function searchChats(name, providerId, senderId) {
  return await prisma.chat.findMany({
    where: {
      providerId: providerId,
      senderId: senderId,
    },
    OR: [{ name: { contains: name } }],
  });
}
