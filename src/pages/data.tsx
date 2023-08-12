import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { Layout } from "~/components/Layout";
import { api } from "~/utils/api";

const DataPage: NextPage = () => {
  const { data: sunlights, isLoading } = api.isohel.getAllData.useQuery();

  return (
    <>
      <Head>
        <title>Data</title>
        <meta name="description" content="About the isohel/sunshine project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex h-screen w-full items-center justify-center bg-blue">
          <div className="z-20 mx-auto w-full max-w-4xl space-y-4 px-4 font-wix text-cloud">
            <p className="text-center text-2xl font-medium">
              Today&apos;s Sunlight Data
            </p>
            {sunlights && !isLoading && sunlights[0] && (
              <div className="grid w-full grid-cols-1 rounded-md border-2 p-4 md:grid-cols-4">
                {Object.entries(sunlights[0]).map(([key, value]) => (
                  <>
                    {key !== "lastUpdated" && key !== "Id" && (
                      <div key={key} className="grid grid-cols-2 gap-8">
                        <p className="capitalize">{key}</p>
                        <p className="text-sun">{value.toString()}</p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DataPage;
