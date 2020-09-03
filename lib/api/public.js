import sendRequest from "./sendRequest";

const BASE_PATH = "/api/v1/public";

export const getCommentList = (id) =>
  sendRequest(`${BASE_PATH}/posts/${id}/comments`, {
    method: "GET",
  });

export const getPostList = (searchQuery) =>
  sendRequest(`${BASE_PATH}/posts?query=${searchQuery}`, {
    method: "GET",
  });

export const getPostDetail = ({ slug }) =>
  sendRequest(`${BASE_PATH}/posts/${slug}`, {
    method: "GET",
  });
