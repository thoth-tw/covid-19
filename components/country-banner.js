import Card from "./card";

import { commaNum } from "../utils";

export default function CountryBanner({ country, icon }) {
  return (
    <Card>
      <div className="country">
        <div className="title">{country.country}</div>
        <div className="highlight-wrap">
          <div className="highlight">{commaNum(country.cases)}</div>
          <div> +{country.todayCases} (今日)</div>
        </div>
        <div className="side">
          <div>
            <div className="label">死亡</div>
            <div className="val">{commaNum(country.deaths)}</div>
          </div>
          <div>
            <div className="label">康復</div>
            <div className="val">{commaNum(country.recovered)}</div>
          </div>
        </div>
        {icon && (
          <div className="bg">
            <img
              src={require(`../assets/${country.country.toLowerCase()}.svg`)}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .country {
          position: relative;
        }
        .title {
          font-size: 24px;
          color: #a0a0a0;
        }
        .highlight-wrap {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: red;
          flex-wrap: wrap;
        }
        .highlight {
          color: black;
          font-size: 60px;
          font-weight: 300;
          line-height: 60px;
          margin-right: 5px;
        }
        .label {
          color: #a0a0a0;
          font-size: 16px;
          font-weight: 500;
        }
        .side {
          display: flex;
          margin-top: 15px;
        }
        .side > * {
          margin-right: 30px;
        }
        .val {
          font-size: 16px;
          line-height: 20px;
        }
        .bg {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </Card>
  );
}
