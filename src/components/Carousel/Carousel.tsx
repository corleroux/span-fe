import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "../../context/NavContext";
import { TopicContext } from "../../context/TopicContext";
import { getTopicList, getTopicPhotos } from "../../services/api";
import { CarouselItem } from "./CarouselItem";

type Props = {};

export const Carousel = (props: Props) => {
  const [photos, setPhotos] = useState<any[]>();
  const { topic, setTopic, topics, setTopics } = useContext(TopicContext);
  const [nav] = useContext(NavContext);
  useEffect(() => {
    getTopicPhotos(nav.topicSlug)
      .then((photo) => photo.response?.results)
      .then((s) => {
        setPhotos(s);
      });
  }, []);

  const item = (index: number, photo: any) => <CarouselItem key={index} index={index} image={photo.urls.thumb} />;
  let col: any[] = [];
  let temp: any[] = [];
  const even = (num: number) => num % 2;

  if (photos) {
    console.log(photos);
    const photoCols = photos?.map((photo, index) => {
      console.log(photo.id, photo.description, photo.alt_description);
      temp.push(item(index, photo));
      if (even(index) && index !== 0) {
        const c = <div className="flex flex-col flex-wrap flex-grow-0 snap-start">{temp.map((t) => t)}</div>;
        col.push(c);
        temp = [];
        return c;
      }
    });
  }
  return (
    // <div className="flex-1">
    //   <ul className=" justify-items-center ">
    // <div className="grid grid-flow-col grid-cols-[repeat(4,400px)] grid-rows-[250px_250px] overflow-scroll gap-4">
    <div className="flex flex-row flex-nowrap flex-grow-0 flex-shrink-0 space-x-3">
      {photos && col.map((c) => c)}
      {/* {photos &&
        photos.map((photo, index) => {
          console.log(photo);
          return <CarouselItem key={index} index={index} image={photo.urls.small} />;
        })}  */}
    </div>
    //   </ul>
    // </div>
  );
};
