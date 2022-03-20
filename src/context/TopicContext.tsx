import React, { createContext, PropsWithChildren, ReactNode, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";

type Props = {
  children: ReactNode;
  value: any[];
};

type ITopicList = {};

type ITopic = {
  title: string;
  description?: string;
  photos?: string[];
};

export const initialTopic: ITopic = {
  title: "Choose a topic",
};

const initialContext: any = [];

export const TopicContext = createContext(initialContext);

export const TopicProvider = (props: PropsWithChildren<Props>) => {
  const [topics, setTopics] = useState<Basic[]>();
  const [topic, setTopic] = useState<ITopic>(initialTopic);
  return <TopicContext.Provider value={{ topics, setTopics, topic, setTopic }}>{props.children}</TopicContext.Provider>;
};
