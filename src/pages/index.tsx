import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { calculateIsohels } from "~/utils/calculateIsohels";
import type { Pairing } from "~/utils/interfaces";
import { Loading } from "~/components/Loading";
import { capitalize } from "~/server/utils/textFormat";
import { Marker } from "~/components/icons/Marker";
import { ArrowsRightLeft } from "~/components/icons/ArrowsRightLeft";
// import { Latitude, Longitude } from "~/utils/cities";

//   todo: redirect user to city and zoom
const UniqueCityList = ({ points }: { points: Pairing[] }) => {
  //   const handleCityClick = (cityName: string) => {
  //     const lat = Latitude[cityName];
  //     const lng = Longitude[cityName]
  //   };

  return (
    <div className="flex flex-col gap-1">
      {points.map((x) => (
        <div key={x.firstCity + x.secondCity} className="flex w-full gap-2">
          <div className="flex items-center gap-1">
            <Marker />
            <p className="text-cloud">{capitalize(x.firstCity)}</p>
          </div>
          <p className="text-sun">
            <ArrowsRightLeft />
          </p>
          <div className="flex items-center gap-1">
            <Marker />
            <p className="text-cloud">{capitalize(x.secondCity)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TodayMessage = ({ pointCount }: { pointCount: number }) => {
  if (pointCount === 1) {
    return (
      <p className="text-xl text-cloud md:text-5xl">
        There is{" "}
        <span className={pointCount > 0 ? "text-sun" : "text-cloud"}>
          {pointCount}
        </span>{" "}
        isohel.
      </p>
    );
  }
  return (
    <p className="py-2 text-xl text-cloud md:text-2xl">
      Today there are{" "}
      <span className={pointCount > 0 ? "text-sun" : "text-cloud"}>
        {pointCount}
      </span>{" "}
      isohels.
    </p>
  );
};

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

  return (
    <>
      <Head>
        <title>Sun Pather</title>
        <meta
          name="description"
          content="See how the world is connected through sunshine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!points && (
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <p className="font-wix text-white">Loading...</p>
            <Loading />
          </div>
        </div>
      )}
      {points && !isLoading && (
        <Layout>
          <div className="flex w-full flex-col gap-2 px-2 py-4 md:flex-row">
            <div className="flex w-full flex-col items-center justify-center space-y-2 font-wix">
              <h1 className="gradient-text text-[2.5rem] md:py-4 md:text-8xl">
                Sun Pather
              </h1>
              <p className="text-xl text-cloud md:text-4xl">
                Visualise the world&apos;s sunshine.
              </p>
              <div className="flex items-center gap-2 bg-dark p-1">
                <div>
                  <p className="gradient-text text-2xl font-bold">`isohel`</p>
                  <p>/&apos;ʌɪsə(ʊ)hɛl/</p>
                </div>
                <p className="leading-tight">
                  a line on a map connecting points having the same duration of
                  sunshine.
                </p>
              </div>
              <TodayMessage pointCount={points.length} />
              <div className="flex max-h-[20vh] flex-col overflow-y-auto rounded-md bg-dark p-2">
                <UniqueCityList points={points} />
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Map points={points} />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
