import "../styles/globals.scss";
import type { AppProps } from "next/app";
import AuthUpdate from "@components/system/firebase/components/AuthUpdater";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUpdate />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
