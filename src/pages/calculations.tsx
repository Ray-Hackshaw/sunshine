import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";

const CalculationsPage: NextPage = () => (
  <>
    <Head>
      <title>Calculations</title>
      <meta name="description" content="About the isohel/sunshine project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className="flex min-h-screen w-full items-center justify-center pb-20 pt-4">
        <div className="mx-auto w-full max-w-2xl space-y-4 px-4 font-wix text-cloud">
          <div className="flex items-center gap-2">
            <h1 className="gradient-text py-2 text-center text-4xl md:text-6xl">
              How Sunlight Duration is Calculated
            </h1>
          </div>
          <div className="text-md space-y-4 rounded-md bg-dark p-4 md:text-lg">
            <p className="">
              <span>
                <Link
                  className="underline transition-all duration-200 ease-in-out hover:text-sun"
                  href="https://openweathermap.org/"
                  target="_blank"
                >
                  OpenWeatherMap
                </Link>
              </span>{" "}
              provides access to daily weather data for cities all around the
              world.
            </p>
            <p className="">
              As part of their data you get back, each city returns{" "}
              <code>sunrise</code> and <code>sunset</code> time values (returned
              as milliseconds).
            </p>
            <p className="">
              Each city then gets a sunlight duration assigned to it via a
              simple subtraction of{" "}
              <code className="text-sun">sunset - sunrise</code>.
            </p>
            <div className="w-full border-t-2 border-sun" />
            <p className="">
              Due to the nature of our method of calculation, &apos;true&apos;
              isohels are actually close to/almost impossible to find without
              approximating our results.
            </p>
            <p className="text-sm text-sun md:text-base">
              e.g.{" "}
              <span className="italic text-cloud/80">
                if Madrid has a sunlight duration of{" "}
                <span className="text-sun">52,756</span>, and if Istanbul has a
                sunlight duration of <span className="text-sun">52,856</span> -
                they would not share an isohel if we leave them like this.
              </span>
            </p>
            <p className="">
              Sunlight duration is rounded up as a measure to ensure this
              application isn&apos;t too accurate to the point where it is not
              showing any data at all.
            </p>
            <div className="flex w-full items-center justify-center py-4">
              <Link className="underline" href="/">
                ← back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default CalculationsPage;
