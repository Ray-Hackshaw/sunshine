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
      <div className="flex h-screen w-full items-center justify-center bg-blue pb-4">
        <div className="z-20 mx-auto w-full max-w-2xl space-y-4 px-4 font-wix text-cloud">
          <p className="text-2xl font-medium">How the calculations work</p>
          <p>
            <span>
              {" "}
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
          <p>
            As part of their data you get back, each city returns{" "}
            <code>sunrise</code> and <code>sunset</code> time values (returned
            as milliseconds).
          </p>
          <p>
            Each city then gets a sunlight duration assigned to it via{" "}
            <code className="text-sun">sunset - sunrise</code>.
          </p>
          <p className="text-2xl font-medium">Approximations</p>
          <p>
            Due to the nature of our method of calculation, &apos;true&apos;
            isohels are actually close to/almost impossible to find without
            approximating our results.
          </p>
          <p>
            e.g. if Madrid has a sunlight duration of 52,756, and if Istanbul
            has a sunlight duration of 52,856 - they would not share an isohel
            if we leave them like this.
          </p>
          <p>
            Sunlight duration is rounded up as a measure to ensure this
            application isn&apos;t too accurate to the point where it is not
            showing any data at all.
          </p>
        </div>
      </div>
    </Layout>
  </>
);

export default CalculationsPage;
