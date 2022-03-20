import React, { useContext, useEffect, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsCircleHorizontalIcon,
  XCircleIcon,
  ArrowCircleLeftIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { NavContext } from "../context/NavContext";
import { Menu } from "./Menu";
import { Header } from "./Header";
import { Carousel } from "./Carousel/Carousel";
import { getTopic, getTopicList } from "../services/api";
import { TopicContext } from "../context/TopicContext";

export const Landing = () => {
  const [nav, setNav] = useContext(NavContext);
  const { topic, setTopic } = useContext(TopicContext);
  const carouselRef = useRef<HTMLDivElement>(null);
  const heading = nav.isOpen ? "Choose Topic" : topic ? topic.title : "";
  const icon = nav.isOpen ? (
    <QuestionMarkCircleIcon className="headerIcon" />
  ) : (
    <ArrowCircleDownIcon className="headerIcon" />
  );

  const onSelectTopic = (e: Event | undefined, topic: string) => {
    setNav ? setNav({ isOpen: false, isTopicSet: true, topicSlug: { topicIdOrSlug: topic } }) : false;
  };

  const updateNav = () => {
    setNav ? setNav({ isOpen: true, isTopicSet: false, topicSlug: { topicIdOrSlug: "" } }) : false;
    setTopic({});
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: 0,
        left: -410,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: 0,
        left: 410,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (nav.topicSlug && nav.topicSlug.topicIdOrSlug !== "") {
      getTopic(nav.topicSlug).then((r) => {
        setTopic(r);
      });
    }
  }, [nav.topicSlug]);

  return (
    <div className="container max-w-screen-3xl min-h-screen flex bg-neutral-100 scroll-smooth">
      <div className="flex-1 w-7xl mx-auto p-10">
        <div className="grid grid-cols-[10%_75%_10%] gap-8">
          <div className="col-start-1 col-span-3 row-start-1 row-span-1">
            <Header heading={heading} icon={icon} onClick={updateNav} />
          </div>
          {nav.isOpen && (
            <div className="col-start-1 col-span-3 row-start-2 row-span-2">
              <Menu onSelectTopic={onSelectTopic} />
            </div>
          )}
          {!nav.isOpen && (
            <>
              <div className="col-start-1 row-start-2 row-span-2">
                <div
                  className="flex align-middle h-full my-3 mx-9 rounded-full bg-orange-400 hover:bg-orange-500 text-neutral-200 shadow-lg hover:shadow-xl hover:cursor-pointer"
                  onClick={handlePrevious}
                >
                  <ChevronLeftIcon className=" drop-shadow-xl" />
                </div>
              </div>
              <div className="col-start-2 row-start-2 row-span-2">
                <div className="flex flex-row flex-wrap overflow-x-hidden  snap-y snap-mandatory" ref={carouselRef}>
                  <Carousel />
                </div>
              </div>
              <div className="col-start-3 row-start-2 row-span-2">
                <div
                  className="flex align-middle h-full my-3 mx-9 rounded-full bg-orange-400 hover:bg-orange-500 text-neutral-200 shadow-lg hover:shadow-xl hover:cursor-pointer"
                  onClick={handleNext}
                >
                  <ChevronRightIcon className=" drop-shadow-xl" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
