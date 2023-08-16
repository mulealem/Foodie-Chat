import { getServerSession } from "#auth";
// import { getMessageTypes } from "../../../data/menuCategories";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session", session);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const menuCategories = await event.context.prisma.menuCategory.findMany({
    where: {
      providerId: session?.id,
    },
  });

  // console.log(menuCategories);

  return menuCategories;
});
