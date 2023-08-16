import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const body = await readBody(event);

  console.log("_______________BODY_______________");
  console.log(body);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  let type = {};
  let orderStatus = null;

  if (!body.type) {
    const defaultMessageType = await event.context.prisma.messageType.findFirst(
      {
        where: {
          abbreviation: "TEXT",
        },
      }
    );
    type = defaultMessageType;
  } else {
    const messageType = await event.context.prisma.messageType.findFirst({
      where: {
        abbreviation: body.type,
      },
    });
    type = messageType;
  }

  // return body;

  if (type.abbreviation === "ORDER") {
    console.log("_______________IT IS ORDER_______________");
    orderStatus = await event.context.prisma.orderStatus.findFirst({
      where: {
        abbreviation: "PC",
      },
    });
    console.log("_______________ORDERSTATUS_______________");
    console.log(orderStatus);
  }

  let chatId = null;

  const chat = await event.context.prisma.chat.findFirst({
    where: {
      OR: [
        {
          senderId: session.id,
        },
        {
          receiverId: session.id,
        },
      ],
    },
  });

  if (chat) {
    chatId = chat.id;
  } else {
    const newChat = await event.context.prisma.chat.create({
      data: {
        senderId: session.id,
        receiverId: body.receiverId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    chatId = newChat.id;
  }

  const newMessage = {
    content: body.content,
    receiverId: body.receiverId,
    chatId: chatId,
    senderId: session.id,
    typeId: type.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // if (type.abbreviation === "ORDER") {
  //   newMessage.order = body.order;
  // }

  const createdNewMessage = await event.context.prisma.message.create({
    data: newMessage,
    include: {
      MessageType: true,
      Receiver: true,
      Sender: true,
    },
  });

  async function createMessageMenuItems(menuItems) {
    const createdMenuItems = await Promise.all(
      menuItems.map(async (menuItem) => {
        const createdMenuItem =
          await event.context.prisma.messageMenuItem.create({
            data: {
              remark: createdNewMessage.content,
              messageId: createdNewMessage.id,
              providerMenuItemId: menuItem.id,

              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            include: {
              ProviderMenuItem: true,
            },
          });
        return createdMenuItem;
      })
    );
    return createdMenuItems;
  }

  async function createOrder(menuItems) {
    const createdOrder = await event.context.prisma.order.create({
      data: {
        orderStatusId: orderStatus.id,
        messageId: createdNewMessage.id,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      include: {
        OrderStatus: true,
      },
    });

    console.log("_______________CREATEDORDER_______________");
    console.log("Created Order", createdOrder);

    //   orderId            String
    // providerMenuItemId String
    // price              Float
    // quantity           Int
    // remark             String?

    const createdOrderMenuItems = await Promise.all(
      menuItems.map(async (menuItem) => {
        const createdOrderMenuItem =
          await event.context.prisma.orderItem.create({
            data: {
              price: parseFloat(menuItem.price),
              providerMenuItemId: menuItem.id,
              quantity: menuItem.quantity,
              orderId: createdOrder.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            include: {
              ProviderMenuItem: true,
            },
          });
        return createdOrderMenuItem;
      })
    );
    createdOrder.orderMenuItems = createdOrderMenuItems;
    return createdOrder;
  }

  if (type.abbreviation === "MENUITEMS") {
    let menuItems = body.menuItems;
    const createdMenuItems = await createMessageMenuItems(menuItems);
    createdNewMessage.menuItems = createdMenuItems;
  }

  if (type.abbreviation === "ORDER") {
    let menuItems = body.menuItems;
    // console.log("_______________MENUITEMS_______________");
    const createdOrder = await createOrder(menuItems);
    createdNewMessage.order = createdOrder;
    // console.log(menuItems);
  }

  return createdNewMessage;
});
