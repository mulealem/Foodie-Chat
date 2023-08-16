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

  const newMenuCategory = {
    name: body.name,
    providerId: session?.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const createdNewMenuCategory = await event.context.prisma.menuCategory.create(
    {
      data: newMenuCategory,
    }
  );

  return createdNewMenuCategory;
});
