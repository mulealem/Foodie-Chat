import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  const body = await readBody(event);

  body.price = Number(body.price);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const newProviderMenuItem = {
    ...body,
    providerId: session?.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const createdNewProviderMenuItem =
    await event.context.prisma.providerMenuItem.create({
      data: newProviderMenuItem,
    });

  return createdNewProviderMenuItem;
});
