import Head from "next/head";
import fetch from "isomorphic-unfetch";

import World from "../components/world";
import CountryBanner from "../components/country-banner";
import Rank from "../components/rank";
import News from "../components/news";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export default function Index({ data }) {
  const taiwan = data.countries.find(c => c.country === "Taiwan");
  const china = data.countries.find(c => c.country === "China");
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Covid-19 新冠肺炎快訊</title>
        <link rel="shortcut icon" href="https://app.thoth.tw/favicon.ico" />

        <meta name="title" content="Covid-19 新冠肺炎快訊" />
        <meta
          name="description"
          content="Coronavirus - 新冠肺炎相關訊息，包含了台灣、世界確診數據以及相關新聞"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://covid19.thoth.tw/" />
        <meta property="og:title" content="Covid-19 新冠肺炎快訊" />
        <meta
          property="og:description"
          content="Coronavirus - 新冠肺炎相關訊息，包含了台灣、世界確診數據以及相關新聞"
        />
        <meta property="og:image" content="https://app.thoth.tw/favicon.ico" />
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `
              }}
            />
          </>
        )}
      </Head>
      <div className="app">
        <div className="container">
          <h1 className="header">Covid-19</h1>
          <div className="stats">
            <div className="left">
              <div>
                <World world={data.summary} />
              </div>
              <div>
                <CountryBanner country={taiwan} icon={true} />
              </div>
              <div>
                <CountryBanner country={china} icon={true} />
              </div>
            </div>
            <div className="right">
              <Rank countries={data.countries} />
            </div>
          </div>
          <div className="news">
            <News news={data.news} />
          </div>
          <div className="footer">
            © 2020 Powered by &nbsp;
            <img src="https://app.thoth.tw/favicon.ico" />
            &nbsp;
            <a href="https://thoth.tw">thoth.tw</a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700&display=swap");
        body {
          background: #fcfcfc;
          width: 100%;
          margin: 0;
          font-family: "Poppins", system-ui, "Helvetica Neue", Helvetica, Arial,
            sans-serif;

          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: orange;
        }
        a:hover {
          color: red;
          transition: all 0.3s;
        }
      `}</style>
      <style jsx>{`
        .app {
          max-width: 1000px;
          margin: auto;
        }
        .container {
          margin: 0 20px;
        }
        .header {
          font-size: 32px;
          font-weight: 300;
        }
        .stats {
          display: flex;
        }
        .left {
          flex: 0 0 350px;
        }
        .left > * {
          margin-right: 20px;
          margin-bottom: 20px;
        }
        .right {
          flex: 1;
        }
        .news {
          margin-top: 20px;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 20px 10px;
        }
        .footer img {
          height: 16px;
          margin-right: 5px;
        }
        @media (max-width: 820px) {
          .stats {
            flex-direction: column;
          }

          .left > * {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch("http://localhost:5001/");
  const data = await res.json();

  return { data };
};
