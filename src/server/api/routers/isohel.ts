import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { inferProcedureOutput } from "@trpc/server";

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
          melbourne: z.number(),
          london: z.number(),
          brisbane: z.number(),
          copenhagen: z.number(),
          tokyo: z.number(),
          toronto: z.number(),
          auckland: z.number(),
          vancouver: z.number(),
          madrid: z.number(),
          kyoto: z.number(),
          osaka: z.number(),
          cairo: z.number(),
          istanbul: z.number(),
          seoul: z.number(),
          moscow: z.number(),
          jakarta: z.number(),
          shanghai: z.number(),
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
          lastUpdated: input.newPoints.lastUpdated,
          melbourne: input.newPoints.melbourne,
          london: input.newPoints.london,
          brisbane: input.newPoints.brisbane,
          copenhagen: input.newPoints.copenhagen,
          tokyo: input.newPoints.tokyo,
          toronto: input.newPoints.toronto,
          auckland: input.newPoints.auckland,
          vancouver: input.newPoints.vancouver,
          madrid: input.newPoints.madrid,
          kyoto: input.newPoints.kyoto,
          osaka: input.newPoints.osaka,
          cairo: input.newPoints.cairo,
          istanbul: input.newPoints.istanbul,
          seoul: input.newPoints.seoul,
          moscow: input.newPoints.moscow,
          jakarta: input.newPoints.jakarta,
          shanghai: input.newPoints.shanghai,
        },
      });
      console.log("after update");
    }),
});
