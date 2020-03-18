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
            © 2020 Powered by &nbsp;<a href="https://thoth.tw">thoth.tw</a>
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
          text-align: right;
          padding: 20px 10px;
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
