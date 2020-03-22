import Modal from "./modal";
import { Line } from "react-chartjs-2";

const lineProps = {
  fill: false,
  pointBorderWidth: 1,
  pointHoverRadius: 3,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 2,
  data: []
};

const data = {
  datasets: [
    {
      ...lineProps,
      label: "確診",
      borderColor: "#fbc35d"
    },
    {
      ...lineProps,
      label: "死亡",
      borderColor: "#f57070"
    }
  ]
};

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "week",
          displayFormats: {
            week: "MMM D"
          }
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          maxTicksLimit: 9
        }
      }
    ]
  }
};

export default function History({
  country,
  history,
  hasHistory,
  closeHistory
}) {
  const getData = history => {
    data.datasets[0].data = history.map(d => ({ x: d.date, y: d.confirmed }));
    data.datasets[1].data = history.map(d => ({ x: d.date, y: d.deaths }));
    return data;
  };

  return (
    <>
      <Modal isOpen={hasHistory} onRequestClose={closeHistory}>
        <div className="close" onClick={closeHistory}>
          關閉
        </div>
        <div className="country">{country}</div>
        {history && <Line data={getData(history)} options={options} />}
        <div className="footer">
          資料來源: https://github.com/CSSEGISandData/COVID-19
        </div>
      </Modal>
      <style jsx>{`
        .country {
          font-size: 18px;
          margin-left: 5px;
          margin-bottom: 10px;
        }
        .close {
          text-align: right;
          position: absolute;
          right: 30px;
          top: 30px;
          border: 1px solid #5f5f5f;
          padding: 2px 8px;
          color: #5f5f5f;
          border-radius: 5px;
          font-size: 12px;
          cursor: pointer;
        }
        .footer {
          margin-top: 20px;
          color: #a0a0a0;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
