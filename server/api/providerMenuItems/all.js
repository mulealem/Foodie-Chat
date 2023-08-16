import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session", session);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const providerMenuItems =
    await event.context.prisma.providerMenuItem.findMany();

  // console.log(providerMenuItems);

  return providerMenuItems;
});
