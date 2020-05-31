import Vue from "vue";
import Vuex from "vuex";
import { data } from "../shared/data";
import { GET_NEWS, GET_SOURCES } from "./mutation-types";

Vue.use(Vuex);

const state = {
  news: [],
};
const mutations = {
  [GET_NEWS](state, news) {
    state.news = news;
  },
  [GET_SOURCES](state, sources) {
    state.sources = sources;
  },
};

const actions = {
  async getNewsAction({ commit }) {
    const news = await data.getNews();
    commit(GET_NEWS, news);
  },
  async getSourcesAction({ commit }) {
    const sources = await data.getSources();
    commit(GET_SOURCES, sources);
  },
};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
