require("dotenv").config();
const withImages = require("next-images");

module.exports = withImages({
  env: {
    API_URL: process.env.API_URL || "http://localhost:5001/",
    INTERNAL_API_URL: "http://localhost:5001/",
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
  },
  webpack(config, options) {
    return config;
  }
});
