import Card from "./card";

export default function News({ news }) {
  return (
    <Card>
      <div className="news">
        {news.map(n => (
          <div className="item">
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
              <a href={n.url}>Read more</a>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
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
