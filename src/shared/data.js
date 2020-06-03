import * as axios from "axios";

const getNews = async function() {
  try {
    const response = await axios.get(
      //TODO: to add as constant
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=bf60e877168447aca87e437671e0d3ee"
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
      "https://newsapi.org/v2/sources?apiKey=bf60e877168447aca87e437671e0d3ee"
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getSearchHeadline = async function(searchValue) {
  console.log("searchValue", searchValue);
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

const getWrongUrl = async function(searchValue) {
  console.log("searchValue", searchValue);
  try {
    const response = await axios.get(`https://newsapi.org/v2/sources?apiKey`);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const addHistory = async function(history) {
//   try {
//     const response = await axios.post(`${API}/heroes`, hero);
//     const addedHero = parseItem(response, 201);
//     return addedHero;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const data = {
  getNews,
  getSources,
  getSearchHeadline,
  getWrongUrl,
};
