import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session>>>>>>>>>>>>>>>>>>>>>>>>>.", session.isCompany);

  // const providerId = session.isCompany ? session?.id : event.context.params.id;
  // const senderId = session.isCompany ? event.context.params.id : session?.id;

  // console.log("event.context.params", event.context.params);

  const receiverId = event.context.params.id;
  const senderId = session?.id;

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const messages = await event.context.prisma.message.findMany({
    where: {
      OR: [
        {
          senderId: senderId,
          receiverId: receiverId,
        },
        {
          receiverId: senderId,
          senderId: receiverId,
        },
      ],
      // senderId: senderId,
    },
    include: {
      MessageType: true,
      Receiver: true,
      Sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const promises = messages.map(async (message) => {
    if (message.MessageType.abbreviation === "MENUITEMS") {
      message.menuItems = await event.context.prisma.messageMenuItem.findMany({
        where: {
          messageId: message.id,
        },
        include: {
          ProviderMenuItem: true,
        },
      });
      // console.log("message.menuItems:: ", message.menuItems);
    } else if (message.MessageType.abbreviation === "ORDER") {
      console.log("message.id:: ", message.id);
      message.order = await event.context.prisma.order.findFirst({
        where: {
          messageId: message.id,
        },
        include: {
          OrderStatus: true,
        },
      });
      console.log("message.order:: ", message.order);

      message.order.orderItems = await event.context.prisma.orderItem.findMany({
        where: {
          orderId: message.order.id,
        },
        include: {
          ProviderMenuItem: true,
        },
      });
    }
    return message;
  });

  const updatedMessages = await Promise.all(promises);

  // const promises = messages.map(async (message) => {
  //   if (message.MessageType.abbreviation === "MENUITEMS") {
  //     message.menuItems = await event.context.prisma.providerMenuItem.findMany({
  //       where: {
  //         message: message.id,
  //       },
  //     });
  //     return providerMenuItems;
  //   }
  // });

  // const providerMenuItems = await Promise.all(promises);
  // console.log(providerMenuItems);

  // console.log(company);

  console.log("__________________________ done __________________________");
  return updatedMessages;
});
