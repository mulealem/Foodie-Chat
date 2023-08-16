import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("event.context.params", event.context.params);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const providerMenuItem = await event.context.prisma.providerMenuItem.findMany(
    {
      where: {
        menuCategoryID: event.context.params.menuCategoryId,
      },
    }
  );

  // console.log(providerMenuItem);

  return providerMenuItem;
});
