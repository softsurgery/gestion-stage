import { Inter } from "next/font/google";
import Application from "@/components/Application";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import '@/styles/globals.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gestion Stage</title>
        <meta name="description" content="ZC-Invoice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <QueryClientProvider client={queryClient}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Application
            Component={Component}
            pageProps={pageProps}
          />
        </ThemeProvider>
      {/* </QueryClientProvider> */}
    </>
  );
}