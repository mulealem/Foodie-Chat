// model Message {
//     id        String   @id @default(cuid())
//     chatId    String
//     content   String
//     typeId    String
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     accountId String?

//     MessageMenuItem MessageMenuItem[]
//     chat            Chat              @relation(fields: [chatId], references: [id])
//     Account         Account?          @relation(fields: [accountId], references: [id])
//     MessageType     MessageType       @relation(fields: [typeId], references: [id])
//     User            User?             @relation(fields: [userId], references: [id])
//     userId          String?
//   }

import prisma from "./prisma";

export async function getMessages() {
  return await prisma.message.findMany();
}

export async function getMessage(id) {
  return await prisma.message.findUnique({
    where: { id: Number(id) },
  });
}

export async function createMessage(data) {
  return await prisma.message.create({
    data,
  });
}

export async function updateMessage(id, data) {
  return await prisma.message.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteMessage(id) {
  return await prisma.message.delete({
    where: { id: Number(id) },
  });
}

export async function searchMessages(
  content,
  chatId,
  typeId,
  accountId,
  userId
) {
  return await prisma.message.findMany({
    where: {
      OR: [
        { content: { contains: content } },
        { chatId: { contains: chatId } },
        { typeId: { contains: typeId } },
        { accountId: { contains: accountId } },
        { userId: { contains: userId } },
      ],
    },
  });
}
