import React, { Children, createContext, PropsWithChildren, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

type IMenu = {
  isOpen: boolean;
  isTopicSet: boolean;
  topicSlug: { topicIdOrSlug: string };
};

type IMenuState = [IMenu, React.Dispatch<React.SetStateAction<IMenu>>?];

const initNavItems: IMenu = {
  isOpen: true,
  isTopicSet: false,
  topicSlug: { topicIdOrSlug: "" },
};

const initNav: IMenuState = [initNavItems];

export const intialNavState: IMenuState = initNav;

export const NavContext = createContext(intialNavState);

export const NavProvider = (props: PropsWithChildren<Props>) => {
  const [nav, setNav] = useState<IMenu>(initNavItems);
  console.log("NAV", nav);
  return <NavContext.Provider value={[nav, setNav]}>{props.children}</NavContext.Provider>;
};
