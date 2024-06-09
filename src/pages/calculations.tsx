import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { PresentationIcon } from "~/components/icons/Presentation";

const CalculationsPage: NextPage = () => (
  <>
    <Head>
      <title>Calculations</title>
      <meta name="description" content="About the isohel/sunshine project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className="flex min-h-screen w-full items-center justify-center bg-dark py-20">
        <div className="mx-auto w-full max-w-2xl space-y-4 px-4 font-wix text-cloud">
          <div className="flex items-center gap-2">
            <PresentationIcon />
            <p className="text-xl font-medium md:text-2xl">
              How the calculations work
            </p>
          </div>
          <p className="text-sm md:text-base">
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
          <p className="text-sm md:text-base">
            As part of their data you get back, each city returns{" "}
            <code>sunrise</code> and <code>sunset</code> time values (returned
            as milliseconds).
          </p>
          <p className="text-sm md:text-base">
            Each city then gets a sunlight duration assigned to it via{" "}
            <code className="text-sun">sunset - sunrise</code>.
          </p>
          <p className="mx-auto w-[80%] border text-sm font-medium md:w-[60%] md:text-base" />
          <p className="text-sm md:text-base">
            Due to the nature of our method of calculation, &apos;true&apos;
            isohels are actually close to/almost impossible to find without
            approximating our results.
          </p>
          <p className="text-sm text-sun md:text-base">
            e.g.{" "}
            <span className="italic text-cloud">
              if Madrid has a sunlight duration of{" "}
              <span className="text-sun">52,756</span>, and if Istanbul has a
              sunlight duration of <span className="text-sun">52,856</span> -
              they would not share an isohel if we leave them like this.
            </span>
          </p>
          <p className="text-sm md:text-base">
            Sunlight duration is rounded up as a measure to ensure this
            application isn&apos;t too accurate to the point where it is not
            showing any data at all.
          </p>
          <div>
            <Link className="underline" href="/">
              ← back
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default CalculationsPage;
