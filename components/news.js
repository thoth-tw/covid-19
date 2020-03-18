import Card from "./card";

export default function News({ news }) {
  return (
    <Card>
      <div className="news">
        {news.map(n => (
          <div>{n.title}</div>
        ))}
      </div>
      <style jsx>{`
        .news {
          //   margin-top: 20px;
        }
      `}</style>
    </Card>
  );
}
