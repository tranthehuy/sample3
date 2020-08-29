import sendRequest from "./sendRequest";

const BASE_PATH = "/api/v1/public";

export const getPostList = () =>
  sendRequest(`${BASE_PATH}/posts`, {
    method: "GET",
  });

export const getPostDetail = ({ slug }) =>
  sendRequest(`${BASE_PATH}/posts/${slug}`, {
    method: "GET",
  });
