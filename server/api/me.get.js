import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  // console.log("session from main:: ", session);

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  // const user = session.user;

  // const dbUser = await event.context.prisma.user.findUnique({
  //   where: {
  //     email: user.email,
  //   },
  // });

  // console.log("dbUser", dbUser);

  return session;
});
