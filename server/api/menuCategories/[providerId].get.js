import { getServerSession } from "#auth";
// import { getMessageTypes } from "../../../data/menuCategories";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("event.context.params", event.context.params);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const tempMenuCategories = await event.context.prisma.menuCategory.findMany();

  // console.log("::::", tempMenuCategories);

  const menuCategories = await event.context.prisma.menuCategory.findMany({
    where: {
      providerId: event.context.params.providerId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  // console.log(menuCategories);

  return menuCategories;
});
