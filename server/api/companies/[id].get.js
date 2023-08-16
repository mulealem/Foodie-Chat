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

  const company = await event.context.prisma.user.findUnique({
    where: {
      id: event.context.params.id,
    },
    // select: {
    //   id: true,
    //   companyName: true,
    //   companyDescription: true,
    //   companySlogan: true,
    //   companyLogoUrl: true,
    // },
  });

  // console.log(company);

  return company;
});
