import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  childNo?: string;
}

//定义MenuItem组件
const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext); //使用useContext获取上下文对象
  //console.log("MenuItem_current=", index, "context_index=", context.index);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handlerClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li
      data-child-no={props.childNo}
      className={classes}
      style={style}
      onClick={handlerClick}
    >
      {children}
    </li>
  );
};
MenuItem.defaultProps = {};
MenuItem.displayName = "MenuItem";

export default MenuItem;
