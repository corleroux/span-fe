import React, { createContext, PropsWithChildren, ReactNode, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";

type Props = {};

type ITopic = {
  title?: string | undefined;
  description?: string | null | undefined;
  photos?: any[];
};

type ITopicState = [ITopic, React.Dispatch<React.SetStateAction<ITopic>>?];

const initTopic: ITopicState = [{}];

export const TopicContext = createContext(initTopic);

export const TopicProvider = (props: PropsWithChildren<Props>) => {
  const [topic, setTopic] = useState<ITopic>({});
  return <TopicContext.Provider value={[topic, setTopic]}>{props.children}</TopicContext.Provider>;
};
