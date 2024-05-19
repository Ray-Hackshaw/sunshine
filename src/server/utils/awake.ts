import type { PrismaClient } from "@prisma/client";

export const wakeDatabase = async (prisma: PrismaClient) => {
  try {
    await prisma.sunlight.findFirst({
      where: {
        id: 1,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
