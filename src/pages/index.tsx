import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";
import { calculateIsohels } from "~/utils/calculateIsohels";
import type { Pairing } from "~/utils/interfaces";
import { Loading } from "~/components/Loading";
import { BackgroundVideo } from "~/components/BgVideo";
import Link from "next/link";

// bg video credit to Jonathan Ng (EDEN) and team

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
          <BackgroundVideo />
          <div className="mx-auto flex w-full max-w-[100vw] flex-col gap-8 px-4 py-6 font-wix md:min-h-screen md:px-8 md:py-8 xl:max-w-7xl">
            <Map points={points} />
            <div className="z-[99] mx-auto flex w-full max-w-fit justify-center gap-4 overflow-hidden rounded-md border-2 bg-[#131313] p-4 text-white">
              <Link
                href="https://github.com/Ray-Hackshaw"
                className="underline"
                target="_blank"
              >
                github
              </Link>
              <Link
                href="https://linkedin.com/in/Ray-Hackshaw"
                className="underline"
                target="_blank"
              >
                linkedin
              </Link>
              <Link
                href="mailto:ray@rayhackshaw.com"
                className="underline"
                target="_blank"
              >
                email
              </Link>
              <Link href="/about" className="underline">
                inspiration
              </Link>
              <Link href="/calculations" className="underline">
                how it works
              </Link>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
