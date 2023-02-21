import React from "react";
import Head from "next/head";
import Header from "./header";

const Layout = (props: { children: any; }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Jitera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="max-w-[1440px] h-[100vh] flex flex-col mx-auto" >
          <Header></Header>
          {props.children}
          {/* <Footer /> */}
        </div>
      </main>
    </>
  );
};

export default Layout;