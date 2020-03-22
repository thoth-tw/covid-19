import History from "../components/history";

const Ctx = React.createContext();

export const HistoryProvider = ({ children }) => {
  const [hasHistory, setHasHistory] = React.useState(false);
  const [history, setHistory] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const closeHistory = () => setHasHistory(false);
  const showHistory = async country => {
    const data = await (
      await fetch(`${process.env.API_URL}history?country=${country}`)
    ).json();
    setCountry(country);
    setHistory(data);
    setHasHistory(true);
  };
  return (
    <Ctx.Provider value={{ showHistory, hasHistory }}>
      {children}
      <History
        country={country}
        history={history}
        hasHistory={hasHistory}
        closeHistory={closeHistory}
      />
    </Ctx.Provider>
  );
};

export const useHistory = () => {
  const { showHistory, hasHistory } = React.useContext(Ctx);
  return { showHistory, hasHistory };
};
