import Card from "./card";

export default function Taiwan({ taiwan }) {
  return (
    <Card>
      <div className="taiwan">
        <p>台灣</p>
        <div>{taiwan.cases}</div>
      </div>
    </Card>
  );
}
