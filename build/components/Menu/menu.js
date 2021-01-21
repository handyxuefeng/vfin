import React, { createContext, useState } from "react";
import classNames from "classnames";
//创建一个上下文
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1]; //返回初始值和函数
    var classes = classNames("fin-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal",
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect && typeof onSelect === "function") {
            onSelect(index);
        }
    };
    //定义好Context要传递的数据
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    /**
     * 验证孩子节点一定是React组件，通过React.children.map 和 React.children.forEach()方法来遍历
     */
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            //console.log("displayName = ", displayName, "index=", index);
            //如果每个孩子组件的组件名称为MenuItem
            if (["MenuItem", "SubMenu"].includes(displayName)) {
                return React.cloneElement(childElement, {
                    index: "" + index,
                    childNo: "" + index,
                });
            }
            else {
                console.warn("Waring: Menu\u8282\u70B9\u4E2D\uFF0C\u53EA\u80FD\u542B\u6709menuItem\u8282\u70B9,\u5B50\u8282\u70B9\u7684\u540D\u79F0\u4E0D\u4E3A" + displayName);
            }
        });
    };
    /**
     * 注意:为了方便测试写测试用例获取元素，在要测试的元素上添加data-testid
     */
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: "horizontal",
    defaultIndex: "0",
    defaultOpenSubMenus: [],
};
export default Menu;
