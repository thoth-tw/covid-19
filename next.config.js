require("dotenv").config();
const withImages = require("next-images");

module.exports = withImages({
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID
  },
  webpack(config, options) {
    return config;
  }
});
