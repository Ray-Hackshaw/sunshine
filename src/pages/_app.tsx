import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import localFont from "next/font/local";

const Wix = localFont({
  src: [
    {
      path: "../../public/fonts/WixMadeforText-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wix",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${Wix.variable}`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
