const axios = require("axios");

const getHTML = async (url) => {
  if (!url) {
    throw new Error("NO_URL");
  }

  try {
    return await axios.get(url);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getHTML;
