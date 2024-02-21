import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type inferProcedureOutput } from "@trpc/server";

type RouterType = typeof isohelRouter;

export type GetAllDataOutput = NonNullable<
  inferProcedureOutput<RouterType["getAllData"]>
>;

export const isohelRouter = createTRPCRouter({
  getAllData: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.sunlight.findUnique({
      where: {
        id: 1,
      },
    });
  }),
  updatePoints: publicProcedure
    .input(
      z.object({
        newPoints: z.object({
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
          id: 1,
        },
        data: {
          ...sunlights,
        },
      });
    }),
});
