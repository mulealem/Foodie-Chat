import prisma from "./prisma";

export async function getMessageTypes() {
  return await prisma.messageType.findMany();
}

export async function getMessageType(id) {
  return await prisma.messageType.findUnique({
    where: { id: Number(id) },
  });
}

export async function createMessageType(data) {
  return await prisma.messageType.create({
    data,
  });
}

export async function updateMessageType(id, data) {
  return await prisma.messageType.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteMessageType(id) {
  return await prisma.messageType.delete({
    where: { id: Number(id) },
  });
}

export async function searchMessageTypes(name, abbreviation) {
  return await prisma.messageType.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { abbreviation: { contains: abbreviation } },
      ],
    },
  });
}
