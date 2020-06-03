const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "aws-sdk": path.join(__dirname, "null.js"),
    },
  },
};
