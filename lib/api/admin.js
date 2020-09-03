import sendRequest from "./sendRequest";

const BASE_PATH = "/api/v1/admin";

export const getPostList = () =>
  sendRequest(`${BASE_PATH}/posts`, {
    method: "GET",
  });

export const getPostDetail = ({ slug }) =>
  sendRequest(`${BASE_PATH}/posts/detail/${slug}`, {
    method: "GET",
  });

export const addPost = (data) =>
  sendRequest(`${BASE_PATH}/posts/add`, {
    body: JSON.stringify(data),
  });

export const editPost = (data) =>
  sendRequest(`${BASE_PATH}/posts/edit`, {
    body: JSON.stringify(data),
  });

export const deletePost = (data) =>
  sendRequest(`${BASE_PATH}/posts/delete`, {
    body: JSON.stringify(data),
  });

export const searchUser = (query) =>
  sendRequest(`${BASE_PATH}/users/search`, {
    body: JSON.stringify({ query }),
  });

export const addPostComment = (postId, data) =>
  sendRequest(`${BASE_PATH}/posts/${postId}/comments`, {
    body: JSON.stringify(data),
  });

export const editPostComment = (postId, commentId, data) =>
  sendRequest(`${BASE_PATH}/posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deletePostComment = (postId, commentId, data) =>
  sendRequest(`${BASE_PATH}/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });