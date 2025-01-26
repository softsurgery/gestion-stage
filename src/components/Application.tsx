import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Spinner } from "./Common/Spinner";
import { Layout } from "./Layout/Layout";

interface ApplicationProps {
  className?: string;
  Component: React.ComponentType<AppProps>;
  pageProps: AppProps;
}

function Application({ Component, pageProps }: ApplicationProps) {
  const router = useRouter();
  const { theme } = useTheme();

  if (router.pathname.includes("admin")) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  return (
    <div className={`flex min-h-screen flex-col`}>
      {router.pathname.includes("auth") ? (
        <Component {...pageProps} />
      ) : (
        <Layout className="flex w-full">
          <Component {...pageProps} />
          <Toaster theme={theme == "dark" ? "dark" : "light"} />
        </Layout>
      )}
    </div>
  );
}

export default Application;
