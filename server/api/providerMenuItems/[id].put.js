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

  const updatedProviderMenuItem =
    await event.context.prisma.providerMenuItem.update({
      where: {
        id: event.context.params.id,
      },
      data: body,
    });

  return updatedProviderMenuItem;
});
