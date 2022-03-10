const cheerio = require("cheerio");
const getHtml = require("./get-html");

const urlCrawler = async (url) => {
  if (!url) {
    throw new Error("NO_URL");
  }

  const html = await getHtml(url);
  const $ = cheerio.load(html.data);

  try {
    const title = $("meta[property='og:title']").attr("content");
    const description = $("meta[property='og:description']").attr("content");
    const image = $("meta[property='og:image']").attr("content");

    return {
      title,
      description,
      image,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = urlCrawler;
