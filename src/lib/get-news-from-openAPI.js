const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.join(process.cwd(), '.env') });

// 참고) 네이버 오픈API
// 호출제한: 25,000회/일
// https://developers.naver.com/docs/serviceapi/search/news/news.md#%EB%89%B4%EC%8A%A4
const getNewsFromOpenAPI = async (queryUrl) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('NO_ENV');
  }

  const url = `https://openapi.naver.com/v1/search/news.json?${queryUrl}`;

  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        accept: 'application/json',
        'Content-Type': 'text/json;charset=utf-8',
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = getNewsFromOpenAPI;
