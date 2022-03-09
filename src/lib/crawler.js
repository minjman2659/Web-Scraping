const cheerio = require('cheerio');
const axios = require('axios');

const getHTML = async (keyword, start) => {
  if (!keyword) {
    throw new Error('NO_KEYWORD');
  }
  try {
    return await axios.get(
      `https://search.naver.com/search.naver?where=news&sm=tab_pge&query=${encodeURI(
        keyword
      )}&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=48&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start=${start}`
    );
  } catch (err) {
    throw new Error(err);
  }
};

const crawler = async (keyword, start) => {
  const html = await getHTML(keyword, start);
  const $ = cheerio.load(html.data); // 가지고 오는 data load
  const $titlist = $('.news_area');

  let informations = [];
  $titlist.each((idx, node) => {
    informations.push({
      title: $(node).find('.news_tit:eq(0)').text(), // 뉴스제목 크롤링
      press: $(node).find('.info_group > a').text(), // 출판사 크롤링
      url: $(node).find('.news_tit').attr('href'), // 뉴스 url 크롤링
      time: $(node).find('.info_group > span').text(), // 기사 작성 시간 크롤링
      contents: $(node).find('.dsc_wrap').text(), // 기사 내용 크롤링
    });
    // console.log(informations);
  }); //for문과 동일
  return informations;
};

module.exports = crawler;
