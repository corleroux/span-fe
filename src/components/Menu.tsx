import { useContext, useEffect } from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { NavContext } from "../context/NavContext";
import { TopicContext } from "../context/TopicContext";
import { getTopicList } from "../services/api";
import { MenuItem } from "./MenuItem";

type Props = {
  onSelectTopic: (e: Event | undefined, topic: string) => void;
};

export const Menu = ({ onSelectTopic }: Props) => {
  const { topic, setTopic, topics, setTopics } = useContext(TopicContext);
  const [nav, setNav] = useContext(NavContext);
  useEffect(() => {
    getTopicList().then((r) => {
      setTopics(r);
    });
  }, []);

  return (
    <div className="bg-blue-900 rounded-2xl h-full w-1/3 ml-14 px-4 py-4">
      {topics &&
        topics.map((m: Basic) => {
          return <MenuItem key={m.id} data={m} id={m.id} title={m.title} onClick={onSelectTopic} />;
        })}
    </div>
  );
};
