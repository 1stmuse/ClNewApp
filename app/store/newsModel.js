import * as api from "../common/api";

import { getExistingIndex, showToast } from "../utils/helper";

export const news = {
  state: [],
  reducers: {
    getAllNews(state, payload) {
      return payload;
    },

    addNews(state, payload) {
      return [payload, ...state];
    },
    edit(state, payload) {
      const index = getExistingIndex(payload.id, state);
      const newNews = [...state];
      newNews[index] = payload;

      return newNews;
    },

    deleteNews(state, payload) {
      return state.filter((el) => el.id !== payload.id);
    },
  },
  effects: (dispatch) => ({
    async getAllNewsAsync(page) {
      try {
        const allNews = await api.getAllNews(page);

        dispatch.news.getAllNews(allNews);
      } catch (error) {
        showToast("error", error);
      }
    },
    async deleteNewsAsync(data) {
      try {
        const news = await api.deleteNews(data.newsId);
        dispatch.news.deleteNews(news);
      } catch (error) {
        console.log(error, "delete error");
        showToast("error", error);
      }
    },
    async addNewsAsync(data) {
      try {
        const news = await api.createNews(data.body);
        dispatch.news.addNews(news);
      } catch (error) {
        showToast("error", error);
      }
    },
    async editNewsAsync(data) {
      // console.log(data, "body from input");
      try {
        const news = await api.editNews(data.newsId, data.body);
        dispatch.news.edit(news);
      } catch (error) {
        showToast("error", error);
      }
    },
  }),
};
