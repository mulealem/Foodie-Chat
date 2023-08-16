import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const body = await readBody(event);
  let steps = ["PC", "PP", "OI", "OD"];

  let nextOrderStatus = null;
  let nextStep = steps[steps.indexOf(body.orderStatus.abbreviation) + 1];

  if (nextStep) {
    nextOrderStatus = await event.context.prisma.orderStatus.findFirst({
      where: {
        abbreviation: nextStep,
      },
    });
  }

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const updatedOrder = await event.context.prisma.Order.update({
    where: {
      id: body.orderId,
    },
    data: {
      orderStatusId: nextOrderStatus.id,
    },
  });

  return updatedOrder;
});
