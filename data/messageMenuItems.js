// model MessageMenuItem {
//     id        String   @id @default(cuid())
//     messageId String
//     menuItem  String
//     remark    String?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     Message Message @relation(fields: [messageId], references: [id])
//   }

import prisma from "./prisma";

export async function getMessageMenuItems() {
  return await prisma.messageMenuItem.findMany();
}

export async function getMessageMenuItem(id) {
  return await prisma.messageMenuItem.findUnique({
    where: { id: Number(id) },
  });
}

export async function createMessageMenuItem(data) {
  return await prisma.messageMenuItem.create({
    data,
  });
}

export async function updateMessageMenuItem(id, data) {
  return await prisma.messageMenuItem.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteMessageMenuItem(id) {
  return await prisma.messageMenuItem.delete({
    where: { id: Number(id) },
  });
}

export async function searchMessageMenuItems(messageId) {
  return await prisma.messageMenuItem.findMany({
    where: {
      messageId: messageId,
    },
  });
}
