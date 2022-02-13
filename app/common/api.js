import { instance } from "./axiosInstance";

export const getAllNews = async (page) => {
  try {
    const { data } = await instance.get(`/news?page=${page || 1}&limit=5`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const createNews = async (body) => {
  try {
    const { data } = await instance.post("/news", body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const { data } = await instance.delete(`/news/${newsId}`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const editNews = async (newsId, body) => {
  try {
    const { data } = await instance.put(`/news/${newsId}`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const getAllcomment = async (newsId) => {
  try {
    const { data } = await instance.get(`/news/${newsId}/comments`);

    return data;
  } catch (error) {
    throw error.message;
  }
};

export const createComment = async (newsId, body) => {
  try {
    const { data } = await instance.post(`/news/${newsId}/comments`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const editComment = async (newsId, commentId, body) => {
  try {
    const { data } = await instance.put(
      `/news/${newsId}/comments/${commentId}`,
      body
    );
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteComment = async (newsId, commentId) => {
  try {
    const { data } = await instance.delete(
      `/news/${newsId}/comments/${commentId}`
    );

    return data;
  } catch (error) {
    throw error.message;
  }
};

export const uploadNewsImage = async (body) => {
  try {
    const data = await instance.post(`/news/${body.newsId}/images`, body);

    return data;
  } catch (error) {
    throw error.message;
  }
};
