import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@components/system/redux/store";
import { useEffect } from "react";
import WebworkerLoader from "@components/system/webworkers/loader";
import TokenRefresher from "@components/system/webworkers/tokenRefresher";
import { refreshIdToken } from "@components/system/firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {
  // Firebase ID Token refresh every set time
  useEffect(() => {
    let worker = WebworkerLoader(TokenRefresher);
    worker.postMessage("Trigger Refresh WebWorker");
    worker.onmessage = (e) => {
      refreshIdToken();
    };
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
