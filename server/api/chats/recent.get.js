import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session>>>>>>>>>>>>>>>>>>>>>>>>>.", session.isCompany);

  // const providerId = session.isCompany
  //   ? session?.user?.id
  //   : event.context.params.id;
  // const senderId = session.isCompany
  //   ? event.context.params.id
  //   : session?.user?.id;

  // console.log("event.context.params", event.context.params);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  console.log("session?.user?.id: ", session);

  const chats = await event.context.prisma.chat.findMany({
    where: {
      OR: [
        {
          senderId: session?.id,
        },
        {
          receiverId: session?.id,
        },
      ],
    },
    include: {
      Receiver: true,
      Sender: true,
    },
    distinct: ["senderId", "receiverId"],
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("chats>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(chats);

  return chats;
});
