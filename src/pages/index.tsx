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
import { Icons } from "~/components/Icons";

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

  const pointCount = points?.length ?? 0;

  const UniqueCityList = () => {
    return (
      <div className="flex flex-col md:flex-row md:gap-2">
        {points?.map((x) => (
          <div key={x.firstCity + x.secondCity} className="flex w-full gap-2">
            <p>{capitalize(x.firstCity)}</p>
            <p className="text-sun">─</p>
            <p>{capitalize(x.secondCity)}</p>
          </div>
        ))}
      </div>
    );
  };

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
          <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-6 px-4 py-6 font-wix md:min-h-screen md:px-8 md:py-8">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col gap-4 md:flex-row">
                <p className="text-sm text-cloud md:text-base">
                  Today there are{" "}
                  <span className={pointCount > 0 ? "text-sun" : "text-cloud"}>
                    {pointCount}
                  </span>{" "}
                  isohels.
                </p>
                <p className="max-h-20 overflow-y-auto text-sm text-slate-500 md:max-h-max md:text-base">
                  {pointCount > 0 && <UniqueCityList />}
                </p>
              </div>
              <Icons />
            </div>
            <Map points={points} />

            <div className="flex w-full flex-col justify-between text-sm text-cloud md:flex-row md:text-base">
              <div>
                <p>
                  Every 24 hours this website updates with the sunlight duration
                  of cities from around the world.
                </p>
                <p>
                  If the two cities have the same amount of sunlight that day,
                  they are connected by an{" "}
                  <span className="text-sun">isohel</span>, indicated by a line
                  on this map.
                </p>
              </div>

              <Link href="/calculations" className="text-cloud underline">
                Read more about the calculations →
              </Link>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
