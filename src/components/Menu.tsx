import { Basic } from "unsplash-js/dist/methods/topics/types";
import { MenuItem } from "./MenuItem";

type Props = {
  onSelectTopic: (e: Event | undefined, topic: string) => void;
  topics: any;
};

export const Menu = ({ onSelectTopic, topics }: Props) => {
  return (
    <div className="bg-blue-900 rounded-2xl h-full w-1/3 ml-14 px-4 py-4">
      {topics &&
        topics.map((topic: Basic) => {
          return <MenuItem key={topic.id} data={topic} id={topic.id} title={topic.title} onClick={onSelectTopic} />;
        })}
    </div>
  );
};
