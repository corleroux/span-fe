import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { ReactNode, useMemo } from "react";
import { Carousel } from "./Carousel";

type Props = {
  children: ReactNode;
};

export const CarouselControls = (props: Props) => {
  const itemList = useMemo(
    () => React.Children.toArray(props.children).map((child) => console.log(child)),
    [props.children]
  );
  return (
    <div>
      <div className="flex">
        <div className="h-5 bg-grey-200 flex-[1_1_5%]"></div>
        <div className="h-5 bg-grey-200 flex-auto">one</div>
        <div className="h-10 border-4 flex-[1_1_5%] ">
          <ChevronRightIcon className="" />
        </div>
      </div>
      {/* <div className="flex bg-gray-50">
        <div className="w-[5%] py-8 text-stone-200 items-center justify-items-center rounded-full bg-indigo-800 flex-[1 1 5%]">
          <ChevronLeftIcon />
        </div>
        <div>
          <Carousel />
        </div>
        <div className="bg-pink-300 p-1 flex-[1_0_100%] min-h-full">
          <ChevronRightIcon className="absolute right-1 top-1/2 w-[5%] py-8 text-stone-200 items-center justify-items-center h-fit rounded-full bg-indigo-600" />
        </div>
      </div> */}
    </div>
  );
};
