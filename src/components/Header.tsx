import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import React, { MouseEventHandler } from "react";

type Props = {
  heading: string;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler;
};

export const Header = ({ heading, icon, onClick }: Props) => {
  return (
    <div className="px-4 py-2 ml-8 flex flex-row h-full items-center align-middle min-h-[100px]">
      <div className="flex-[0_0_52px] mr-12" onClick={onClick}>
        {icon}
      </div>
      <h1 className="flex-[0 0 100%] text-7xl text-left text-zinc-600 drop-shadow-xl ml-7">{heading}</h1>
    </div>
  );
};
