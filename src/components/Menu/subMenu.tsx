import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

//定义组件的props约束
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  childNo?: number;
}

//定义SubMenu函数组件
const SubMenu: React.FC<SubMenuProps> = (props: SubMenuProps) => {
  let timer: any;
  let clickEvents: object = {}; //定义菜单的点击事件
  let hoverEvents: object = {}; //定义鼠标hover事件
  const { index, title, children, className } = props;
  const context = useContext(MenuContext);
  const mode = context.mode;
  const opendSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && mode === "vertical" ? opendSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  //定义submenu的样式
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-vertical": context.mode === "vertical",
  });
  //定义submenu点击事件
  const menuHandlerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  //定义submenu的鼠标事件
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 100);
  };

  if (context.mode === "vertical") {
    clickEvents = { onClick: menuHandlerClick };
  } else {
    hoverEvents = {
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouse(e, true);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouse(e, false);
      },
    };
  }

  const renderChildren = () => {
    //设置submenu中ul标签的样式，默认有fin-submenu样式
    const subMenuClasses = classNames("fin-submenu", {
      "menu-opened": menuOpen,
    });

    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`,
          childNo: `${index}-${idx}`,
        });
      } else {
        console.error(`警告: SubMenu的孩子节点不是 MenuItem组件`);
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li
      key={index}
      data-child-no={props.childNo}
      className={classes}
      {...hoverEvents}
    >
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.displayName = "SubMenu";

export default SubMenu;
