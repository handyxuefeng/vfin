import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
//导航组件
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
var App = function () {
    var handlderClick = function () {
        alert("事件测试");
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Button, { autoFocus: true, onClick: handlderClick, className: "fin-btn wwwww" }, "\u70B9\u51FB"),
            React.createElement(Button, { btnType: ButtonType.Primary, size: ButtonSize.Large }, "Large Primary"),
            React.createElement(Button, { btnType: ButtonType.Danger, size: ButtonSize.Small }, "Small-Danger"),
            React.createElement(Button, { btnType: ButtonType.Link, href: "https://www.baidu.com", target: "_blank" }, "Link-Baidu"),
            React.createElement(Button, { disabled: true, btnType: ButtonType.Link, href: "https://www.baidu.com" }, "Link-Baidu"),
            React.createElement(Button, { disabled: true }, "Disable Button")),
        React.createElement("section", null,
            React.createElement(Menu, { className: "user-define-class", defaultIndex: "0", onSelect: function (index) {
                    document.title = index + "";
                } }, [1, 2, 3, 4, 5, 6].map(function (item, idx) {
                return (React.createElement(MenuItem, { index: "" + idx, key: idx, disabled: idx % 2 === 0 ? true : false },
                    "cool link",
                    idx));
            }))),
        React.createElement("section", null,
            React.createElement(Menu, { mode: "vertical", defaultIndex: "0", style: { border: "1px solid blue", padding: "10px" }, onSelect: function (index) {
                    document.title = index + "";
                } }, [1, 2, 3].map(function (item, idx) {
                return React.createElement(MenuItem, { key: idx },
                    "cool link",
                    idx);
            }))),
        React.createElement("section", null,
            React.createElement("p", null, "\u6D4B\u8BD5SubMenu\u4E0B\u62C9\u83DC\u5355:"),
            React.createElement(Menu, { mode: "horizontal", defaultIndex: "0", style: { border: "1px solid blue", padding: "10px" }, onSelect: function (index) {
                    document.title = index + "";
                } },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "dropdown 1"),
                    React.createElement(MenuItem, null, "dropdown 2"),
                    React.createElement(MenuItem, null, "dropdown 3"),
                    React.createElement(MenuItem, null, "dropdown 4")),
                React.createElement(MenuItem, { disabled: true }, "cool link2"),
                React.createElement(MenuItem, null, "cool link3"))),
        React.createElement("section", null,
            React.createElement(Menu, { mode: "vertical", defaultIndex: "0", style: { border: "1px solid blue", padding: "10px" }, onSelect: function (index) {
                    document.title = index + "";
                }, defaultOpenSubMenus: ["2"] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "\u7AD6\u5411\u83DC\u53551"),
                    React.createElement(MenuItem, null, "\u7AD6\u5411\u83DC\u53552")),
                React.createElement(MenuItem, { disabled: true }, "cool link2"))),
        React.createElement("section", null,
            React.createElement(Menu, null,
                React.createElement(MenuItem, null, "active"),
                React.createElement(MenuItem, { disabled: true }, "disabled"),
                React.createElement(MenuItem, null, "xyz"),
                React.createElement(MenuItem, null, "\u7B2C\u56DB\u4E2Ali"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "drop1"),
                    React.createElement(MenuItem, null, "drop2"),
                    React.createElement(MenuItem, null, "drop3"))))));
};
export default App;
