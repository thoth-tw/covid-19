import Card from "./card";
import moment from "moment";

export default function News({ news }) {
  return (
    <Card>
      <div className="news">
        <div className="header">News</div>
        {news.map(n => (
          <div className="item" key={n.url}>
            <div className="img">
              {n.urlToImage ? (
                <img src={n.urlToImage} />
              ) : (
                <img src={"https://placeimg.com/120/80/any/grayscale"} />
              )}
            </div>
            <div className="content">
              <div className="title">{n.title}</div>
              <div className="desc">{n.description}</div>
              <div className="more">
                <a href={n.url}>Read more</a>
                <div className="time">
                  {moment(n.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .header {
          padding-left: 4px;
          font-size: 24px;
          color: #a0a0a0;
          margin-bottom: 15px;
        }
        .item {
          display: flex;
          margin-bottom: 20px;
        }
        .img {
          margin-top: 5px;
        }
        .img img {
          border-radius: 10px;
          width: 120px;
          height: 80px;
          object-fit: cover;
          filter: grayscale(100%);
        }
        .content {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 20px;
          letter-spacing: 1px;
        }
        .desc {
          margin-top: 5px;
          color: #585858;
          letter-spacing: 1px;
        }
        .more {
          display: flex;
          align-items: center;
        }
        .time {
          margin-left: auto;
          color: #5f5f5f;
        }
        @media (max-width: 500px) {
          .item {
            flex-direction: column;
          }
          .img img {
            width: 100%;
            height: 200px;
          }
          .content {
            margin-left: 0;
          }
        }
      `}</style>
    </Card>
  );
}
