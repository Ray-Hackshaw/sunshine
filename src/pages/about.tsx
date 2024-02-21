import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";

const AboutPage: NextPage = () => (
  <>
    <Head>
      <title>About</title>
      <meta name="description" content="About the isohel/sunshine project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className="flex min-h-screen w-full items-center justify-center bg-dark py-20">
        <div className="z-20 mx-auto w-full max-w-2xl space-y-4 px-4 font-wix text-cloud">
          <p>Thank you for visiting.</p>
          <p>
            Two places which share the same amount of sunlight in a day are
            joined together by what is called an{" "}
            <span className="text-sun">&quot;isohel&quot;</span>.
          </p>
          <p>
            Every 24 hours, this website collects data from OpenWeatherMapAPI
            across 17 different cities around the world. It will calculate the
            sunlight duration for each city and connect any that share an
            isohel.
          </p>
          <p />
          <p>
            Stream the song <span className="text-sun">&quot;isohel&quot;</span>{" "}
            by EDEN on Spotify{" "}
            <span
              className="cursor-pointer text-sun underline"
              onClick={() =>
                window.open(
                  "https://open.spotify.com/track/6nl32vTZsMv23myzbRSAea?si=52c86b62503e4862"
                )
              }
            >
              here.
            </span>
          </p>
          <Link className="mt-20 underline" href="/">
            ← back
          </Link>
        </div>
      </div>
    </Layout>
  </>
);

export default AboutPage;
