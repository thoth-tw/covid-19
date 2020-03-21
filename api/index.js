require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("quick.db");
const { fetchSummary, fetchCountries, fetchHistory } = require("./fetch-stats");
const { fetchNews } = require("./fetch-news");

if (!process.env.NO_FETCH) {
  fetchSummary();
  fetchCountries();
  fetchNews();
  fetchHistory();
}

const listener = app.listen(5001, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use(cors());

app.get("/", async function(req, res) {
  const [summary, countries, news] = await Promise.all([
    db.fetch("summary"),
    db.fetch("countries"),
    db.fetch("news")
  ]);
  res.json({
    summary,
    countries,
    news
  });
});

app.get("/summary/", async function(req, res) {
  const summary = await db.fetch("summary");
  res.json(summary);
});

app.get("/countries/", async function(req, res) {
  const countries = await db.fetch("countries");
  res.json(countries);
});

app.get("/news/", async function(req, res) {
  const news = await db.fetch("news");
  res.json(news);
});

app.get("/history", async function(req, res) {
  const { country } = req.query;
  console.log(country);
  const history = await db.fetch("history");
  return res.json(history[country]);
});
