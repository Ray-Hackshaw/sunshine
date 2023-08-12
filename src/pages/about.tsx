import { type NextPage } from "next";
import Head from "next/head";
import { Layout } from "~/components/Layout";

const AboutPage: NextPage = () => (
  <>
    <Head>
      <title>About</title>
      <meta name="description" content="About the isohel/sunshine project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <div className="flex h-screen w-full items-center justify-center bg-blue">
        <div className="z-20 mx-auto w-full max-w-2xl space-y-4 px-4 font-wix text-cloud">
          <p>Thank you for visiting.</p>
          <p>
            Around 3 years ago at the time of writing this, a musician EDEN
            released &apos;isohel&apos;.
          </p>
          <p>
            It addresses the ability to remain connected to those we have left
            behind through the use of sunlight.
          </p>
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
            Stream the song on Spotify{" "}
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
        </div>
      </div>
    </Layout>
  </>
);

export default AboutPage;
