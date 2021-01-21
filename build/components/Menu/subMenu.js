var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
//定义SubMenu函数组件
var SubMenu = function (props) {
    var timer;
    var clickEvents = {}; //定义菜单的点击事件
    var hoverEvents = {}; //定义鼠标hover事件
    var index = props.index, title = props.title, children = props.children, className = props.className;
    var context = useContext(MenuContext);
    var mode = context.mode;
    var opendSubMenus = context.defaultOpenSubMenus;
    var isOpened = index && mode === "vertical" ? opendSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setMenuOpen = _a[1];
    //定义submenu的样式
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-vertical": context.mode === "vertical",
    });
    //定义submenu点击事件
    var menuHandlerClick = function (e) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    //定义submenu的鼠标事件
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 100);
    };
    if (context.mode === "vertical") {
        clickEvents = { onClick: menuHandlerClick };
    }
    else {
        hoverEvents = {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        };
    }
    var renderChildren = function () {
        //设置submenu中ul标签的样式，默认有fin-submenu样式
        var subMenuClasses = classNames("fin-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, idx) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: index + "-" + idx,
                    childNo: index + "-" + idx,
                });
            }
            else {
                console.error("\u8B66\u544A: SubMenu\u7684\u5B69\u5B50\u8282\u70B9\u4E0D\u662F MenuItem\u7EC4\u4EF6");
            }
        });
        return React.createElement("ul", { className: subMenuClasses }, childrenComponent);
    };
    return (React.createElement("li", __assign({ key: index, "data-child-no": props.childNo, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents), title),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
