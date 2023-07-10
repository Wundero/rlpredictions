import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.scss";
import Head from "next/head";
import { Palette } from "@/components/palette";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>predictrl</title>
        <meta name="description" content="Predict Rocket League Tournaments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-100">
        <Palette />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
