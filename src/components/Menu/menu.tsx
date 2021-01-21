import React, { createContext, useState } from "react";
import classNames from "classnames";

import { MenuItemProps } from "./menuItem";

//类型定义
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

//定义MenuProps的属性
export interface MenuProps {
  defaultIndex?: string;
  defaultOpenSubMenus?: string[];
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  index?: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

//创建一个上下文
export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex); //返回初始值和函数
  const classes = classNames("fin-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect && typeof onSelect === "function") {
      onSelect(index);
    }
  };

  //定义好Context要传递的数据
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  /**
   * 验证孩子节点一定是React组件，通过React.children.map 和 React.children.forEach()方法来遍历
   */
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      //console.log("displayName = ", displayName, "index=", index);
      //如果每个孩子组件的组件名称为MenuItem
      if (["MenuItem", "SubMenu"].includes(displayName as string)) {
        return React.cloneElement(childElement, {
          index: `${index}`,
          childNo: `${index}`,
        });
      } else {
        console.warn(
          `Waring: Menu节点中，只能含有menuItem节点,子节点的名称不为${displayName}`
        );
      }
    });
  };

  /**
   * 注意:为了方便测试写测试用例获取元素，在要测试的元素上添加data-testid
   */
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: "0",
  defaultOpenSubMenus: [],
};
export default Menu;
