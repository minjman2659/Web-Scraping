const puppeteer = require("puppeteer");
const path = require("path");
const getToday = require("./get-today");
const imagesDir = require("./images-dir");

const createNewsPDF = async (url, title) => {
  if (!url || !title) {
    throw new Error("NO_PARAMS");
  }

  try {
    const pathDir = path.join(imagesDir, `${title}_${getToday()}.pdf`);
    console.log(pathDir);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.pdf({ path: pathDir });
    await browser.close();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createNewsPDF;
