import Card from "./card";

export default function World({ world }) {
  return (
    <Card>
      <div className="world">
        <p>世界</p>
        <div>{world.cases}</div>
      </div>
    </Card>
  );
}
