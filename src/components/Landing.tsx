import { useContext, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowCircleDownIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { NavContext } from "../context/NavContext";
import { Menu } from "./Menu";
import { Header } from "./Header";
import { Carousel } from "./Carousel/Carousel";
import { formatTopicPhotos, formatTopics, getTopic, getTopicPhotos, topicEp, useUnsplashApi } from "../services/api";
import { TopicContext } from "../context/TopicContext";

export const Landing = () => {
  const [nav, setNav] = useContext(NavContext);
  const [topic, setTopic] = useContext(TopicContext);
  const carouselRef = useRef<HTMLDivElement>(null);
  const heading = nav.isOpen ? "Choose Topic" : topic ? topic.title : "";
  const icon = nav.isOpen ? (
    <QuestionMarkCircleIcon className="headerIcon" />
  ) : (
    <ArrowCircleDownIcon className="headerIcon" />
  );

  const onSelectTopic = (e: Event | undefined, topic: string) => {
    setNav ? setNav({ isOpen: false, isTopicSet: true, topicSlug: { topicIdOrSlug: topic } }) : false;
    const navTopic: { topicIdOrSlug: string } = { topicIdOrSlug: topic };
    getTopic(navTopic).then((r) => {
      setTopic ? setTopic({ title: r?.title, description: r?.description }) : false;
    });
  };

  const updateNav = () => {
    setNav ? setNav({ isOpen: true, isTopicSet: false, topicSlug: { topicIdOrSlug: "" } }) : false;
    setTopic ? setTopic({}) : false;
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

  const [tresponse, tloading, terror] = useUnsplashApi(topicEp, { page: 2 }, formatTopics);
  if (topic) {
    const [photos, photosLoading, photosError] = useUnsplashApi(
      getTopicPhotos,
      {
        topic,
        page: 1,
        perPage: 30,
        orientation: "portrait",
      },
      formatTopicPhotos
    );
    console.log(photos);
  }
  return (
    <>
      <div className="container max-w-screen-3xl min-h-screen flex bg-neutral-100 scroll-smooth">
        <div className="flex-1 w-7xl mx-auto p-10">
          <div className="grid grid-cols-[10%_75%_10%] gap-8">
            {tloading && (
              <div className="col-start-1 col-span-3 row-start-1 row-span-1">
                <div className="animate-pulse ">
                  <Header
                    heading="Loading"
                    icon={
                      <div className="spinner-border nline-block w-12 h-12 border-8 rounded-full" role="status"></div>
                    }
                  />
                </div>

                {/* <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
            {!tloading && (
              <div className="col-start-1 col-span-3 row-start-1 row-span-1">
                <Header heading={heading} icon={icon} onClick={updateNav} />
              </div>
            )}
            {nav.isOpen && !tloading && (
              <div className="col-start-1 col-span-3 row-start-2 row-span-2">
                <Menu onSelectTopic={onSelectTopic} topics={tresponse} />
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
    </>
  );
};
