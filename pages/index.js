import fetch from "isomorphic-unfetch";

import World from "../components/world";
import Taiwan from "../components/taiwan";
import Rank from "../components/rank";
import News from "../components/news";

export default function Index({ data }) {
  const taiwan = data.countries.find(c => c.country === "Taiwan");
  return (
    <>
      <div className="container">
        <p>Covid-19</p>
        <div className="stats">
          <div className="left">
            <World world={data.world} />
            <Taiwan taiwan={taiwan} />
          </div>
          <div className="right">
            <Rank countries={data.countries} />
          </div>
        </div>
        <News news={data.news} />
      </div>
      <style jsx global>{`
        body {
          background: #fcfcfc;
          width: 100%;
        }
      `}</style>
      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .stats {
          display: flex;
        }
        .left {
          flex: 1;
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
