import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type inferProcedureOutput } from "@trpc/server";

type IsohelRouter = typeof isohelRouter;
export type GetAllDataOutput = inferProcedureOutput<IsohelRouter["getAllData"]>;

export const isohelRouter = createTRPCRouter({
  getAllData: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.sunlight.findMany();
    return data;
  }),
  updatePoints: publicProcedure
    .input(
      z.object({
        newPoints: z.object({
          lastUpdated: z.number(),
          sunlights: z.array(z.record(z.string().min(1), z.number())),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const sunlights = input.newPoints.sunlights.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        const value = curr[key as string];
        acc[key as string] = value as number;
        return acc;
      }, {});

      await ctx.prisma.sunlight.update({
        where: {
          Id: 1,
        },
        data: {
          lastUpdated: input.newPoints.lastUpdated,
          ...sunlights,
        },
      });
    }),
});
