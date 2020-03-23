import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { orderBy } from "lodash";
import Card from "./card";

import { commaNum } from "../utils";
import { useHistory } from "../providers/history";

const neighbors = new Set([
  "China",
  "Japan",
  "S. Korea",
  "Malaysia",
  "Thailand",
  "Singapore",
  "Hong Kong",
  "Macao",
  "Vietnam",
  "Philippines"
]);

export default function Rank({ countries }) {
  const [tab, setTab] = React.useState("top10");
  const { showHistory } = useHistory();
  const getNeighbors = React.useMemo(() => {
    return orderBy(
      countries.filter(c => neighbors.has(c.country)),
      "cases",
      "desc"
    );
  }, [countries]);
  const selected = tab === "neighbors" ? getNeighbors : countries.slice(0, 10);

  return (
    <Card>
      <div className="rank">
        <div className="header">
          <div
            className={`${tab === "top10" ? "active " : ""}tab`}
            onClick={() => setTab("top10")}
          >
            Top 10
          </div>
          <div
            className={`${tab === "neighbors" ? "active " : ""}tab`}
            onClick={() => setTab("neighbors")}
          >
            鄰近地區
          </div>
          <div className="col">
            <div className="label">確診</div>
            <div className="label">死亡</div>
            <div className="label">康復</div>
            <div className="chart" />
          </div>
        </div>
        <div className="content">
          {selected.map((c, idx) => (
            <div className="country" key={c.country}>
              <div>
                {idx + 1}. {c.country}
              </div>
              <div className="stats">
                <div className="num">
                  <span>{commaNum(c.cases)}</span>
                  <div className="daily">
                    <span className="today"> +{commaNum(c.todayCases)}</span>
                    <span className="yesterday">
                      {" "}
                      +{commaNum(c.yesterdayCases)}
                    </span>
                  </div>
                </div>
                <div className="num">
                  <span>{commaNum(c.deaths)}</span>
                  <div className="daily">
                    <span className="today"> +{commaNum(c.todayDeaths)}</span>
                    <span className="yesterday">
                      {" "}
                      +{commaNum(c.yesterdayDeaths)}
                    </span>
                  </div>
                </div>
                <div className="num">
                  <div>{commaNum(c.recovered)}</div>
                </div>
                <div className="chart" onClick={() => showHistory(c.country)}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .rank {
          display: flex;
          flex-direction: column;
          height: 624px;
        }
        .header {
          display: flex;
          padding-left: 4px;
          font-size: 24px;
          color: #a0a0a0;
          margin-bottom: 5px;
          align-items: center;
        }
        .col {
          display: flex;
          margin-left: auto;
          text-align: right;
          margin-right: 5px;
        }
        .label {
          width: 60px;
          margin-left: 10px;
          color: #5f5f5f;
          font-size: 16px;
          font-weight: 500;
        }
        .content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .country {
          display: flex;
          padding: 0 4px;
          align-items: center;
          border-bottom: 1px solid #f5f5f5;
          flex: 1;
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
          margin-left: 10px;
          font-size: 16px;
          line-height: 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
        }
        .stats > .num:first-child {
          width: auto;
        }
        .chart {
          width: 20px;
          display: flex;
          align-items: center;
          margin-left: 15px;
        }
        .stats .chart {
          cursor: pointer;
        }
        .daily {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-left: 5px;
          font-size: 12px;
          line-height: 14px;
          font-weight: 500;
        }
        .today {
          color: red;
        }
        .yesterday {
          color: orange;
        }
        .tab {
          font-size: 16px;
          margin-right: 15px;
          cursor: pointer;
          transition: color 0.2s;
          padding-bottom: 3px;
        }
        .tab:hover {
          color: black;
        }
        .tab.active {
          color: black;
          border-bottom: 2px solid black;
        }
      `}</style>
    </Card>
  );
}
