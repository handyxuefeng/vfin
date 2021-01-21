import React from "react";
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    childNo?: number;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
