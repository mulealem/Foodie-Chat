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

  const updatedCompany = await event.context.prisma.user.update({
    where: {
      id: event.context.params.id,
    },
    data: body,
    select: {
      id: true,
      companyName: true,
      companyDescription: true,
      companySlogan: true,
      companyLogoUrl: true,
    },
  });

  return updatedCompany;
});
