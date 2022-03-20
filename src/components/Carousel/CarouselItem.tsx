import React from "react";

type Props = {
  image: string;
  index: number;
};

export const CarouselItem = ({ image, index, ...rest }: Props) => {
  return (
    // <li className="bg-purple-300 shadow-xl rounded-lg text-center">
    <div className="my-3">
      <img src={image} className="rounded-lg shadow-xl object-cover object-center h-[250px] w-[400px] aspect-video" />
    </div>

    // </li>
  );
};
