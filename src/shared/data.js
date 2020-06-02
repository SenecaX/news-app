import * as axios from "axios";

const getNews = async function() {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=bf60e877168447aca87e437671e0d3ee"
      // "https://newsapi.org/v2/everything?q=finance&apiKey=bf60e877168447aca87e437671e0d3ee"
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
      // "https://newsapi.org/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e"
      "https://newsapi.org/v2/sources?apiKey=bf60e877168447aca87e437671e0d3ee"
    );

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const data = {
  getNews,
  getSources,
};
