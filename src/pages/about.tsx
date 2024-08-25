import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";

const AboutPage: NextPage = () => (
  <>
    <Head>
      <title>About | Sun Pather</title>
      <meta name="description" content="About the isohel/sun pather project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto px-4 py-4">
        <h1 className="gradient-text py-2 text-7xl">About</h1>
        <div className="text-md z-20 mx-auto flex w-full max-w-2xl flex-col space-y-4 overflow-y-auto rounded-md bg-dark p-4 font-wix text-cloud md:text-lg">
          <p>
            Every 24 hours, this website collects data from OpenWeatherMapAPI
            across 17 different cities around the world.
          </p>
          <p>
            It will calculate the sunlight duration for each city and connect
            any that share an isohel.
          </p>
          <div className="w-full border-t-2 border-sun" />
          <p>
            I had the idea for this after listening to a song called
            &apos;isohel&apos; by EDEN.
          </p>
          <p>
            The idea really resonated with me and I thought it would be cool to
            build something in homage to this.
          </p>
          <div>
            <div className="w-fit">
              <Link className="underline" href="/calculations">
                read more about calculations →
              </Link>
            </div>
            <div className="flex w-full items-center justify-between py-4">
              <Link className="underline" href="/">
                ← back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default AboutPage;
