const cheerio = require("cheerio");
const getHtml = require("./get-html");

const keywordScraper = async (keyword, start) => {
  if (!keyword || !start) {
    throw new Error("NO_PARAMS");
  }
  // 기간 (아래는 6개월 예시)
  // 쿼리 중 'pd': ??, 'ds': 시작 날짜, 'de': 끝나는 날짜
  // https://search.naver.com/search.naver?where=news&sm=tab_pge&query=%EC%98%A4%ED%94%88%EB%86%80&sort=0&photo=0&field=0&pd=6&ds=2021.09.25&de=2022.03.24&cluster_rank=22&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:6m,a:all&start=11
  const url = `https://search.naver.com/search.naver?where=news&sm=tab_pge&query=${encodeURI(
    keyword
  )}&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=48&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start=${start}`;
  const html = await getHtml(url);
  const $ = cheerio.load(html.data); // 가지고 오는 data load
  const $titlist = $(".news_area");

  const newsList = [];
  $titlist.each((idx, node) => {
    newsList.push({
      title: $(node).find(".news_tit:eq(0)").text(), // 뉴스제목 스크래핑
      press: $(node).find(".info_group > a").text(), // 출판사 스크래핑
      url: $(node).find(".news_tit").attr("href"), // 뉴스 url 스크래핑
      time: $(node).find(".info_group > span").text(), // 기사 작성 시간 스크래핑
      contents: $(node).find(".dsc_wrap").text(), // 기사 내용 스크래핑
    });
    // console.log(newsList);
  }); //for문과 동일
  return newsList;
};

module.exports = keywordScraper;
