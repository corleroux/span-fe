import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Basic, Full } from "unsplash-js/dist/methods/topics/types";
import { Basic as photoBasic } from "unsplash-js/dist/methods/photos/types";
import { PaginationParams } from "unsplash-js/dist/types/request";

const apiUrl: string = "https://qe9a25jdui.execute-api.eu-west-1.amazonaws.com/test/api";

export const getUnsplashApi = (apiUrl: string) =>
  createApi({
    apiUrl: apiUrl,
    mode: "cors",
  });

const browserApi = getUnsplashApi(apiUrl);

export const getTopicList = async () => {
  const options = { page: 2 };
  const api = getUnsplashApi(apiUrl).topics.list(options);
  const onSuccess = (
    value: ApiResponse<{ results: Basic[]; total: number }>
  ): Basic[] | PromiseLike<Basic[] | undefined> | undefined => {
    console.debug("getTopicList Request Successfull", value);
    return value.response?.results;
  };
  const value = await api;
  return onSuccess(value);
};

export const getTopic = async (topicIdOrSlug: { topicIdOrSlug: string }) => {
  const api = getUnsplashApi(apiUrl).topics.get(topicIdOrSlug);
  const onSuccess = (value: ApiResponse<Full>) => {
    console.debug("getTopic Request Successfull", value);
    return value.response;
  };
  const value = await api;
  return onSuccess(value);
};

export const getTopicPhotos = async ({
  topicIdOrSlug,
  page = 1,
  perPage = 30,
}: { topicIdOrSlug: string } & PaginationParams) => {
  const api = getUnsplashApi(apiUrl).topics.getPhotos({ topicIdOrSlug, page, perPage });
  const onSuccess = (
    value: ApiResponse<{ results: photoBasic[]; total: number }>
  ): photoBasic[] | PromiseLike<photoBasic[] | undefined> | undefined => {
    console.debug("getTopicPhotos Request Successfull", value);
    return value.response?.results;
  };
  const value = await api;
  return onSuccess(value);
};
