import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { Pairing, calculateIsohels } from "~/utils/calculateIsohels";

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
      const { sunlights } = await res.json();
      await toast.promise(
        updateMutation.mutateAsync({
          newPoints: {
            lastUpdated: new Date().getTime(),
            melbourne: sunlights[0].Melbourne,
            london: sunlights[1].London,
            brisbane: sunlights[2].Brisbane,
            copenhagen: sunlights[3].Copenhagen,
            tokyo: sunlights[4].Tokyo,
            toronto: sunlights[5].Toronto,
            auckland: sunlights[6].Auckland,
            vancouver: sunlights[7].Vancouver,
            madrid: sunlights[8].Madrid,
            kyoto: sunlights[9].Kyoto,
            osaka: sunlights[10].Osaka,
            cairo: sunlights[11].Cairo,
            istanbul: sunlights[12].Istanbul,
            seoul: sunlights[13].Seoul,
            moscow: sunlights[14].Moscow,
            jakarta: sunlights[15].Jakarta,
            shanghai: sunlights[16].Shanghai,
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
        refetchAndUpdate();
      }
    }
  });

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
