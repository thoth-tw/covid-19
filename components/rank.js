import Card from "./card";

export default function Rank({ countries }) {
  return (
    <Card>
      <div className="rank">
        <p>排名</p>
        <div>
          {countries.slice(0, 10).map(c => (
            <div>
              {c.country}
              {c.cases}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
