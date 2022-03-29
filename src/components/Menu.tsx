import { useContext, useEffect } from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { TopicsContext } from "../context/TopicsContext";
import { getTopicList } from "../services/api";
import { MenuItem } from "./MenuItem";

type Props = {
  onSelectTopic: (e: Event | undefined, topic: string) => void;
};

export const Menu = ({ onSelectTopic }: Props) => {
  const { topics, setTopics } = useContext(TopicsContext);
  useEffect(() => {
    getTopicList().then((r) => {
      setTopics(r);
    });
  }, []);

  return (
    <div className="bg-blue-900 rounded-2xl h-full w-1/3 ml-14 px-4 py-4">
      {topics &&
        topics.map((topic: Basic) => {
          return <MenuItem key={topic.id} data={topic} id={topic.id} title={topic.title} onClick={onSelectTopic} />;
        })}
    </div>
  );
};
