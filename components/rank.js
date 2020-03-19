import Card from "./card";

import { commaNum } from "../utils";

export default function Rank({ countries }) {
  return (
    <Card>
      <div className="rank">
        <div className="header">Top 10</div>
        <div>
          {countries.slice(0, 10).map((c, idx) => (
            <div className="country" key={c.country}>
              <div>
                {idx + 1}. {c.country}
              </div>
              <div className="stats">
                <div className="num">
                  <div className="label">確診</div>
                  <div className="confirmed">
                    <span>{commaNum(c.cases)}</span>
                    <span className="daily"> +{commaNum(c.todayCases)}</span>
                  </div>
                </div>
                <div className="num">
                  <div className="label">死亡</div>
                  <div>{commaNum(c.deaths)}</div>
                </div>
                <div className="num">
                  <div className="label">康復</div>
                  <div>{commaNum(c.recovered)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .rank {
          height: 585px;
        }
        .header {
          padding-left: 4px;
          font-size: 24px;
          color: #a0a0a0;
          margin-bottom: 5px;
        }
        .country {
          display: flex;
          padding: 4px;
          align-items: center;
          border-bottom: 1px solid #f5f5f5;
        }
        .country:last-child {
          border-bottom: none;
        }
        .stats {
          margin-left: auto;
          display: flex;
        }

        .stats .num {
          width: 60px;
          margin-left: 20px;
          text-align: right;
        }

        .stats > .num:first-child {
          width: auto;
        }
        .confirmed {
          display: flex;
          align-items: center;
        }
        .daily {
          margin-left: 3px;
          color: red;
          font-size: 12px;
          font-weight: 500;
          line-height: 25px;
        }
        .label {
          color: #5f5f5f;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </Card>
  );
}
