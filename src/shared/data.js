import * as axios from "axios";

const getNews = async function() {
  try {
    const response = await axios.get(
      //TODO: to add as constant
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e"
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSources = async function() {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e"
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSearchHeadline = async function(searchValue) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${searchValue}&apiKey=099148be22804e849a0c6fe022b7cf5e`
    );
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getWrongUrl = async function() {
  try {
    const response = await axios.get(`https://newsapi.org/v2/sources?apiKey`);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const data = {
  getNews,
  getSources,
  getSearchHeadline,
  getWrongUrl,
};
