import fetch from "isomorphic-unfetch";

import World from "../components/world";
import CountryBanner from "../components/country-banner";
import Rank from "../components/rank";
import News from "../components/news";

export default function Index({ data }) {
  const taiwan = data.countries.find(c => c.country === "Taiwan");
  const china = data.countries.find(c => c.country === "China");
  return (
    <>
      <div className="app">
        <div className="container">
          <h1 className="header">Covid-19</h1>
          <div className="stats">
            <div className="left">
              <div>
                <World world={data.world} />
              </div>
              <div>
                <CountryBanner country={taiwan} />
              </div>
              <div>
                <CountryBanner country={china} />
              </div>
            </div>
            <div className="right">
              <Rank countries={data.countries} />
            </div>
          </div>
          <News news={data.news} />
        </div>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Poppins:200, 300,400,500,600,700&display=swap");
        body {
          background: #fcfcfc;
          width: 100%;
          font-family: "Poppins", system-ui, "Helvetica Neue", Helvetica, Arial,
            sans-serif;

          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
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
          flex: 1;
        }
        .left > * {
          margin-right: 20px;
          margin-bottom: 20px;
        }
        .right {
          flex: 1;
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
