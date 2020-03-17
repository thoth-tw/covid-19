import fetch from "isomorphic-unfetch";

export default function Index({ data }) {
  return (
    <div>
      <p>Hello Next.js</p>
      <div>{data.cases}</div>
    </div>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch("http://localhost:5001/all/");
  const data = await res.json();

  console.log(data);

  return {
    data
  };
};
