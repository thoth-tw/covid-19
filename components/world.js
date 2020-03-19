import Card from "./card";
import moment from "moment";

import { commaNum } from "../utils";

export default function World({ world }) {
  return (
    <Card>
      <div className="world">
        <div className="title">Coronavirus</div>
        <div className="highlight">{commaNum(world.cases)}</div>
        <div className="side">
          <div>
            <div className="label">死亡</div>
            <div className="val">{commaNum(world.deaths)}</div>
          </div>
          <div>
            <div className="label">康復</div>
            <div className="val">{commaNum(world.recovered)}</div>
          </div>
          <div className="time">
            {moment(world.updated)
              .locale("zh-TW")
              .fromNow()}
            更新
          </div>
        </div>
      </div>
      <style jsx>{`
        .title {
          font-size: 24px;
          color: #a0a0a0;
        }
        .highlight {
          font-size: 60px;
          font-weight: 300;
          line-height: 60px;
        }
        .label {
          color: #5f5f5f;
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
        .side > .time {
          margin-left: auto;
          margin-right: 0;
          line-height: 25px;
          font-size: 12px;
          align-self: flex-end;
          color: #5f5f5f;
        }
      `}</style>
    </Card>
  );
}
