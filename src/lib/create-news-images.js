const puppeteer = require("puppeteer");
const path = require("path");
const getToday = require("./get-today");
const imagesDir = require("./images-dir");

const createNewsImages = async (url, title) => {
  if (!url || !title) {
    throw new Error("NO_PARAMS");
  }

  try {
    const pngPath = path.join(imagesDir, `png/${title}_${getToday()}.png`);
    const pdfPath = path.join(imagesDir, `pdf/${title}_${getToday()}.pdf`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await Promise.all([
      await page.screenshot({ path: pngPath, fullPage: true }),
      await page.pdf({ path: pdfPath, format: "a4" }),
    ]);
    await browser.close();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createNewsImages;
