import type { PrismaClient } from "@prisma/client";
import type { SunEntryDynamic } from "~/utils/interfaces";

export const calculateSunlight = ({
  sunrise,
  sunset,
}: {
  sunrise: number;
  sunset: number;
}) => {
  const value = sunset - sunrise;
  const rounded = Math.ceil(value / 100) * 100;
  return rounded;
};

export const updateSunlightPoints = async (
  sunlights: SunEntryDynamic[],
  prisma: PrismaClient
) => {
  const data = sunlights.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    const value = curr[key as string];
    acc[key as string] = value as number;
    return acc;
  }, {});

  await prisma.sunlight.update({
    where: {
      id: 1,
    },
    data: {
      ...data,
    },
  });
};
