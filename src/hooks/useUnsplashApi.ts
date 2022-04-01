import React, { useState } from "react";
import { createApi } from "unsplash-js";

const useUnsplashApi = () => {
  const [api, setApi] = useState<any>();
  const apiUrl: string = "https://qe9a25jdui.execute-api.eu-west-1.amazonaws.com/test/api";

  const getUnsplashApi = (apiUrl: string) =>
    createApi({
      apiUrl: apiUrl,
      mode: "cors",
    });

  setApi(getUnsplashApi(apiUrl));
  return [api];
};
