import fetch from "isomorphic-unfetch";

import World from "../components/world";
import Taiwan from "../components/taiwan";
import Rank from "../components/rank";
import News from "../components/news";

export default function Index({ data }) {
  const taiwan = data.countries.find(c => c.country === "Taiwan");
  return (
    <div>
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
      <style jsx global>{`
        body {
          background: #fcfcfc;
        }
      `}</style>
      <style jsx>{`
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
    </div>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch("http://localhost:5001/");
  const data = await res.json();

  return { data };
};
