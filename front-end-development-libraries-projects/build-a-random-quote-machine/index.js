const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const apiUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const getRandomColor = (currentColor) => {
  const colorsWithoutCurrent = colors.filter((color) => color !== currentColor);
  const index = Math.floor(Math.random() * colorsWithoutCurrent.length);
  return colorsWithoutCurrent[index];
};

const getRandomQuote = (quotes, currentQuoteId) => {
  const quotesWithoutCurrent = currentQuoteId
    ? [...quotes.slice(0, currentQuoteId), ...quotes.slice(currentQuoteId + 1)]
    : quotes;
  const newQuoteId = Math.floor(Math.random() * quotesWithoutCurrent.length);
  return newQuoteId;
};

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [quoteId, setQuoteId] = useState(0);
  const [mainColor, setMainColor] = useState(getRandomColor);

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(apiUrl);
      const { quotes } = await response.json();
      setQuotes(quotes);
      setQuoteId(getRandomQuote(quotes));
    };
    fetchQuotes();
  }, []);

  const setNewQuote = () => {
    setQuoteId(getRandomQuote(quotes, quoteId));
    setMainColor(getRandomColor(mainColor));
  };

  return (
    <div className="App" style={{ backgroundColor: mainColor }}>
      {quotes.length && (
        <Quote
          quote={quotes[quoteId]}
          mainColor={mainColor}
          onNewQuoteClick={setNewQuote}
        />
      )}
    </div>
  );
};

const Quote = ({ quote, mainColor, onNewQuoteClick }) => {
  const twitterLink = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote?.quote}" ${quote?.author}`;
  return (
    <div id="quote-box">
      <div id="text" style={{ color: mainColor }}>
        <i className="fa fa-quote-left"> </i>
        {quote?.quote ?? '""'}
      </div>
      <div id="author" style={{ color: mainColor }}>
        - {quote?.author ?? ""}
      </div>
      <div className="bottom">
        <a
          id="tweet-quote"
          href={twitterLink}
          style={{ backgroundColor: mainColor }}
        >
          <i className="fa fa-twitter"></i>
        </a>
        <button
          id="new-quote"
          style={{ backgroundColor: mainColor }}
          onClick={onNewQuoteClick}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
