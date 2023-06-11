const config = require("../db/config.json");
const baseUrl = "https://api-football-v1.p.rapidapi.com/v3";

const runRequest = async (http, url, params, page, method, headers, body) => {
  const options = {
    method,
    url,
    params: {
      ...params,
      season: config.season,
      page,
    },
    headers,
    body,
  };

  try {
    const response = await http(options);
    console.log(`${response?.data?.response.length} records retrieved`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getData = async (http, endpoint, apiKey, apiHost, method, params, body) => {
  let totalPages = 0;
  let page = 1;
  let responseObj = {
    response: []
  };
  do {
    console.log(
      `querying /${endpoint} for data (${JSON.stringify(
        params
      )}) - page ${page}`
    );
    const thisResponse = await runRequest(
      http,
      `${baseUrl}/${endpoint}`,
      params,
      page,
      method,
      { "X-RapidAPI-Key": apiKey, "X-RapidAPI-Host": apiHost },
      body
    );

    const { paging } = thisResponse;
    totalPages = paging.total;
    page += 1;

    responseObj = {
        response: [...responseObj.response, ...thisResponse.response],
    };
  } while (page < totalPages);

  return responseObj;
};

module.exports = getData;
