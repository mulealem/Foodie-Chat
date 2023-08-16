import { getServerSession } from "#auth";
import { getMessageTypes } from "../../../data/messageTypes";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session", session);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const messageTypes = await event.context.prisma.messageType.findMany();

  // console.log(messageTypes);

  return messageTypes;
});
