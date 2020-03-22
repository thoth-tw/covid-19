import Card from "./card";

import { commaNum } from "../utils";
import { useHistory } from "../providers/history";

export default function CountryBanner({ country, icon }) {
  const { showHistory } = useHistory();
  return (
    <Card>
      <div className="country">
        <div className="header">
          <div className="title">{country.country}</div>
          <div className="chart" onClick={() => showHistory(country.country)}>
            <i class="fas fa-chart-line" />
          </div>
        </div>
        <div className="highlight-wrap">
          <div className="highlight">{commaNum(country.cases)}</div>
          <div>
            <div className="today"> +{commaNum(country.todayCases)} (今日)</div>
            <div className="yesterday">
              {" "}
              +{commaNum(country.yesterdayCases)} (昨日)
            </div>
          </div>
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
        .header {
          display: flex;
          align-items: center;
        }
        .title {
          font-size: 24px;
          color: #a0a0a0;
        }
        .chart {
          margin-left: auto;
          cursor: pointer;
        }
        .highlight-wrap {
          display: flex;
          align-items: center;
          font-size: 16px;
          flex-wrap: wrap;
        }
        .today {
          color: red;
        }
        .yesterday {
          color: orange;
        }
        .highlight {
          color: black;
          font-size: 60px;
          font-weight: 300;
          line-height: 60px;
          margin-right: 5px;
        }
        .label {
          color: #5f5f5f;
          font-size: 16px;
          font-weight: 500;
        }
        .side {
          display: flex;
          margin-top: 28px;
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
