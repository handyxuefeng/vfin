import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
//定义MenuItem组件
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext); //使用useContext获取上下文对象
    //console.log("MenuItem_current=", index, "context_index=", context.index);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handlerClick = function () {
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { "data-child-no": props.childNo, className: classes, style: style, onClick: handlerClick }, children));
};
MenuItem.defaultProps = {};
MenuItem.displayName = "MenuItem";
export default MenuItem;
