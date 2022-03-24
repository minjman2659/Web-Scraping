const express = require('express');

const news = express.Router();

const {
  getScrapNewsList,
  postScrapNewsImages,
  getNewsByOpenAPI,
} = require('./news.ctrl');

news.post('/scrap', postScrapNewsImages); // body로 전달되는 url 스크래핑 + 캡처 이미지 생성
news.get('/scrap', getScrapNewsList); // 직접 스크래핑한 뉴스 기사 조회
news.get('/', getNewsByOpenAPI); // 네이버 오픈API를 이용한 뉴스 기사 조회 (호출제한: 25,000회/일)

module.exports = news;
