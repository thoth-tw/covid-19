export default function Card({ children }) {
  return (
    <>
      <div className="card">{children}</div>
      <style jsx>{`
        .card {
          box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;
          background: white;
          padding: 20px;
        }
        @media (max-width: 500px) {
          .card {
            margin: 0 -20px;
          }
        }
      `}</style>
    </>
  );
}
