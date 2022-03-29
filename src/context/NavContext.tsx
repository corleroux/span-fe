import React, { Children, createContext, PropsWithChildren, ReactNode, useState } from "react";

type Props = {};

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

export const NavContext = createContext(initNav);

export const NavProvider = (props: PropsWithChildren<Props>) => {
  const [nav, setNav] = useState<IMenu>(initNavItems);
  return <NavContext.Provider value={[nav, setNav]}>{props.children}</NavContext.Provider>;
};
