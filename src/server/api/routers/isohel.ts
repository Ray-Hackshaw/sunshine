import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

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
            

        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input.newPoints);
      await ctx.prisma.sunlight.update({
        where: {
          Id: 1,
        },
        data: {
            lastUpdated: 
        },
      });
      console.log("after update");
    }),
});
