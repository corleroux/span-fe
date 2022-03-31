import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Basic, Full } from "unsplash-js/dist/methods/topics/types";
import { Basic as photoBasic } from "unsplash-js/dist/methods/photos/types";
import { OrientationParam, PaginationParams } from "unsplash-js/dist/types/request";
import { useEffect, useRef, useState } from "react";

const apiUrl: string = "https://qe9a25jdui.execute-api.eu-west-1.amazonaws.com/test/api";
export const getUnsplashApi = (apiUrl: string) =>
  createApi({
    apiUrl: apiUrl,
    mode: "cors",
  });

export const api = getUnsplashApi(apiUrl);
export const topicEp = getUnsplashApi(apiUrl).topics.list;
export const photoEp = api.photos;

export const useUnsplashApi = (operation: any, options: any = null, callback: any = null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    if (callback) {
      const api = operation(options)
        .then((response: any) => {
          setResponse(callback(response));
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false), setError(error);
        });
    } else {
      const api = operation(options)
        .then((response: any) => {
          setResponse(response);
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false), setError(error);
        });
    }
  }, []);

  return [response, loading, error];
};

export const getTopicList = async () => {
  const options = { page: 2 };
  const api = topicEp(options);
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
  orientation = "portrait",
}: { topicIdOrSlug: string } & PaginationParams & OrientationParam) => {
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
