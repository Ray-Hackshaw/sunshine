import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import localFont from "next/font/local";
import "mapbox-gl/dist/mapbox-gl.css";
import { Toaster } from "react-hot-toast";

const Wix = localFont({
  src: [
    {
      path: "./fonts/WixMadeforText-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wix",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${Wix.variable}`}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
