/*
  Ref: https://github.com/NovelCOVID/API
*/

const axios = require("axios");
const cheerio = require("cheerio");
const db = require("quick.db");
const moment = require("moment");
const { logError, logException } = require("./sentry");

async function getLoadedHtml() {
  const response = await axios.get(
    "https://www.worldometers.info/coronavirus/"
  );
  if (response.status !== 200) {
    console.log("ERROR");
  }

  return cheerio.load(response.data);
}

function getLastUpdated(html) {
  try {
    const lastUpdatedText = html(".content-inner div:contains('Last updated')")
      .text()
      .replace("Last updated: ", "");
    const time = moment.utc(lastUpdatedText, "MMMM-DD, YYYY, HH:mm");

    if (time.isValid()) {
      return +time;
    }
    logError(`Failed to parse last updated: ${lastUpdatedText}`);
  } catch (err) {
    logException(err);
  }
  return Date.now(); // fallback logic
}

async function fetchSummary() {
  const html = await getLoadedHtml();
  const summary = {};

  html(".maincounter-number").filter((i, el) => {
    let count = el.children[0].next.children[0].data || "0";
    count = parseInt(count.replace(/,/g, "") || "0", 10);
    // first one is
    if (i === 0) {
      summary.cases = count;
    } else if (i === 1) {
      summary.deaths = count;
    } else {
      summary.recovered = count;
    }
  });

  summary.updated = getLastUpdated(html);
  db.set("summary", summary);
  console.log("Summary Updated", moment().format());
  setTimeout(fetchSummary, 3 * 60 * 789); // 3 mins
}

async function fetchCountries() {
  const html = await getLoadedHtml();
  const countriesTable = html("table#main_table_countries_today");
  const countriesTableCells = countriesTable
    .children("tbody")
    .children("tr")
    .children("td");
  const totalColumns = 9;
  const colMap = {
    0: "country",
    1: "cases",
    2: "todayCases",
    3: "deaths",
    4: "todayDeaths",
    5: "recovered",
    7: "critica"
  };
  const parseCountryName = cell => {
    let country =
      cell.children[0].data ||
      cell.children[0].children[0].data ||
      // country name with link has another level
      cell.children[0].children[0].children[0].data ||
      cell.children[0].children[0].children[0].children[0].data ||
      "";
    country = country.trim();
    if (country.length === 0) {
      // parse with hyperlink
      country = cell.children[0].next.children[0].data || "";
    }
    return country.trim() || "";
  };
  const parseNumber = cell => {
    let num = cell.children.length != 0 ? cell.children[0].data : "";
    return parseInt(num.trim().replace(/,/g, "") || "0", 10);
  };

  const countries = [];
  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length; i += totalColumns) {
    const country = {};
    for (let [colIdx, field] of Object.entries(colMap)) {
      const cell = countriesTableCells[i + parseInt(colIdx)];
      country[field] =
        field === "country" ? parseCountryName(cell) : parseNumber(cell);
    }
    countries.push(country);
  }
  db.set("countries", countries);
  console.log("Countries Updated", moment().format());
  setTimeout(fetchCountries, 5 * 60 * 1000); // 3 mins
}

module.exports = {
  fetchSummary,
  fetchCountries
};
