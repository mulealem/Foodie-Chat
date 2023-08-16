import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session:::: ", session);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  // console.log("session?.user?.id: ", session);

  const isCompany = session.isCompany;
  const providers = [
    {
      type: "Recent",
      id: "recent",
      chats: [],
    },
    {
      type: "Nearby",
      id: "nearby",
      chats: [],
    },
  ];

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
      Sender: isCompany,
      Receiver: isCompany,
    },
    distinct: ["receiverId", "senderId"],
    orderBy: {
      createdAt: "desc",
    },
  });
  if (chats) {
    chats.forEach((chat) => {
      providers[0].chats.push(isCompany ? chat.Receiver : chat.Sender);
    });
  }
  if (!isCompany) {
    const users = await event.context.prisma.user.findMany({
      where: {
        isCompany: true,
      },
    });
    if (users) {
      users.forEach((user) => {
        // check if user is already in the list
        const found = providers[1].chats.find(
          (provider) => provider.id === user.id
        );
        if (!found) {
          providers[1].chats.push(user);
        }
      });
    }
  }

  // console.log("chats>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // console.log(providers);

  return providers;
});
