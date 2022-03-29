import { useContext, useEffect, useState } from "react";
import { NavContext } from "../../context/NavContext";
import { TopicContext } from "../../context/TopicContext";
import { TopicsContext } from "../../context/TopicsContext";
import { getTopicPhotos } from "../../services/api";
import { CarouselItem } from "./CarouselItem";

type Props = {};

export const Carousel = (props: Props) => {
  const [nav] = useContext(NavContext);
  const [topic, setTopic] = useContext(TopicContext);

  useEffect(() => {
    if (nav.topicSlug) {
      getTopicPhotos(nav.topicSlug).then((s) => {
        setTopic ? setTopic((state) => ({ ...state, photos: s })) : false;
      });
    }
  }, []);

  const item = (index: number, photo: any) => <CarouselItem key={index} index={index} image={photo.urls.small} />;
  let col: any[] = [];
  let temp: any[] = [];
  const even = (num: number) => num % 2;

  if (topic.photos) {
    const photoCols = topic.photos?.map((photo: any, index: number) => {
      temp.push(item(index, photo));
      if (even(index) && index !== 0) {
        let photoEl = (
          <div className="flex flex-col flex-wrap flex-grow-0 flex-shrink-0 snap-start">{temp.map((t) => t)}</div>
        );
        col.push(photoEl);
        temp = [];
        return photoEl;
      }
    });
  }

  return (
    <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 space-x-3">
      {topic.photos && col.map((c) => c)}
    </div>
  );
};
