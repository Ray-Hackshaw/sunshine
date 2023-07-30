import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { SunEntryDynamic } from "./api/isohel";

const dayMs = 86400000;
const currentTime = new Date().getTime();

const HomePage: NextPage = () => {
  const [data, setData] = useState<any>();
  console.log(data);

  const { data: sunlights } = api.isohel.getAllData.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateMutation = api.isohel.updatePoints.useMutation();

  useEffect(() => {
    if (data) return;
    const refetchAndUpdate = async () => {
      const res = await fetch(`/api/isohel`, {
        method: "GET",
      });
      const newItems: SunEntryDynamic[] = await res.json();
      await toast.promise(
        updateMutation.mutateAsync({
          newPoints: {
            lastUpdated: newItems.lastUpdated,
          },
        }),
        {
          loading: "Updating map data...",
          success: "New data has been fetched!",
          error: "There was an issue fetching new data for the map.",
        }
      );
      // await invalidate

      setData(newItems);
    };

    console.log(sunlights);
    refetchAndUpdate();
    // if (sunlights && sunlights.lastUpdated) {
    //   if (currentTime - sunlights.lastUpdated > dayMs) {
    //     refetchAndUpdate();
    //   }
    // }
  });

  // fetch data and store it in the db,

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
          <Map />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
