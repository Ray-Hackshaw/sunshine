import Head from "next/head";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Layout } from "~/components/Layout";
import { Map } from "~/components/Map";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
}
