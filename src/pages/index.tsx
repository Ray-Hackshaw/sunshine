import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { type Pairing, calculateIsohels } from "~/utils/calculateIsohels";
import { type SunEntryDynamic } from "./api/isohel";

export interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

interface DataRes {
  lastUpdated: number;
  sunlights: SunEntryDynamic[];
}

const dayMs = 86400000;
const currentTime = new Date().getTime();

const HomePage: NextPage = () => {
  const { data: sunlights } = api.isohel.getAllData.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const updateMutation = api.isohel.updatePoints.useMutation({
    onSuccess: async () => {
      await utils.isohel.getAllData.invalidate();
      await utils.isohel.getAllData.refetch();
    },
  });
  const utils = api.useContext();
  const [points, setPoints] = useState<Pairing[]>();

  useEffect(() => {
    if (points) return;
    if (sunlights && sunlights[0]) {
      const isohels = calculateIsohels({ isohels: sunlights[0] });
      setPoints(isohels);
    }

    const refetchAndUpdate = async () => {
      const res = await fetch(`/api/isohel`, {
        method: "GET",
      });
      const data = (await res.json()) as DataRes;
      if (!data) return;
      await toast.promise(
        updateMutation.mutateAsync({
          newPoints: {
            sunlights: data.sunlights,
            lastUpdated: new Date().getTime(),
          },
        }),
        {
          loading: "Updating map data...",
          success: "New data has been fetched!",
          error: "There was an issue fetching new data for the map.",
        }
      );
    };
    if (sunlights && sunlights[0]?.lastUpdated) {
      const differenceInTime = currentTime - Number(sunlights[0].lastUpdated);
      // if it has been longer than a day since last fetch
      if (differenceInTime > dayMs) {
        void refetchAndUpdate();
      }
    }
  }, [points, sunlights, updateMutation]);

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
      <Layout>
        <div className="flex h-[800px] w-full font-wix">
          {points && <Map points={points} />}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
