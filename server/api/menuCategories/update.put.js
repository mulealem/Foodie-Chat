import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const body = await readBody(event);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const menuCategory = {
    name: body.name,
  };

  // console.log("event.context.params.id::: ", event.context.params.id);

  const updatedMenuCategory = await event.context.prisma.menuCategory.update({
    where: {
      id: body.id,
    },
    data: menuCategory,
  });

  return updatedMenuCategory;
});
