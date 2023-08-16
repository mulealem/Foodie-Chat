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

  const users = await event.context.prisma.user.findMany({
    where: {
      isCompany: true,
    },
    select: {
      id: true,
      companyName: true,
      companyDescription: true,
      companySlogan: true,
      companyLogoUrl: true,
      // companyWebsiteUrl: true,
    },
  });

  // console.log(users);

  return users;
});
