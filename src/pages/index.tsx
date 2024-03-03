import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { calculateIsohels } from "~/utils/calculateIsohels";
import type { Pairing } from "~/utils/interfaces";
import { Loading } from "~/components/Loading";
import { capitalize } from "~/server/utils/textFormat";
import Link from "next/link";

const HomePage: NextPage = () => {
  const { data: sunlights, isLoading } = api.isohel.getAllData.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const [points, setPoints] = useState<Pairing[]>();

  useEffect(() => {
    if (points) return;
    if (sunlights) {
      const isohels = calculateIsohels({ isohels: sunlights });
      setPoints(isohels);
    }
  }, [points, sunlights]);

  const uniqueCities = [
    ...new Set([
      ...(points?.map((x) => capitalize(x.firstCity)) ?? []),
      ...(points?.map((x) => capitalize(x.secondCity)) ?? []),
    ]),
  ].join(", ");

  return (
    <>
      <Head>
        <title>Sunshine</title>
        <meta
          name="description"
          content="See how the world is connected through sunshine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!points && (
        <div className="flex min-h-screen w-full items-center justify-center bg-dark">
          <div className="flex flex-col items-center gap-3">
            <p className="font-wix text-white">Loading...</p>
            <Loading />
          </div>
        </div>
      )}
      {points && !isLoading && (
        <Layout>
          <div className="mx-auto flex w-full flex-col gap-8 px-4 py-6 font-wix md:min-h-screen md:px-8 md:py-8">
            <Map points={points} />

            <div className="w-full text-cloud">
              <p>
                Every 24 hours this website updates with the sunlight duration
                of cities from around the world.
              </p>
              <p>
                If the two cities have the same amount of sunlight that day,
                they are connected by an{" "}
                <span className="text-sun">isohel</span>, indicated by a line on
                this map.
              </p>
              <p>
                Today there are{" "}
                <span className={points.length > 0 ? "text-sun" : "text-cloud"}>
                  {points.length}
                </span>{" "}
                isohels.{" "}
                <span className="text-slate-500">({uniqueCities})</span>
              </p>
            </div>
            <Link href="/calculations">next</Link>
          </div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
