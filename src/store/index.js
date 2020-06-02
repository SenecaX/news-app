import Vue from "vue";
import Vuex from "vuex";
import { data } from "../shared/data";
import {
  GET_NEWS,
  GET_SOURCES,
  ADD_HISTORY,
  GET_HISTORY,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  news: [],
  sources: [],
  history: [],
});

const mutations = {
  [GET_NEWS](state, news) {
    state.news = news;
  },
  [GET_SOURCES](state, sources) {
    state.sources = sources;
  },
  [ADD_HISTORY](state, history) {
    state.history.push(history);
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
  async getNewsHistoryAction({ commit }) {
    const history = this.state.history;
    commit(GET_HISTORY, history);
  },
  async addHistoryAction({ commit }, addHistory) {
    commit(ADD_HISTORY, addHistory);
  },
};
const getters = {
  getNewsBySourceName: (state) => (sourceName) => {
    console.log("sourcing", sourceName);
    return state.news.data.articles.find((n) => n.source.name === sourceName);
  },
  getNewsHistory: (state) => () => {
    return state.history;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
