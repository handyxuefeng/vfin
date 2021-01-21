import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

//导航组件
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

const App: React.FC = () => {
  const handlderClick = () => {
    alert("事件测试");
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus onClick={handlderClick} className="fin-btn wwwww">
          点击
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small-Danger
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          target="_blank"
        >
          Link-Baidu
        </Button>
        <Button disabled btnType={ButtonType.Link} href="https://www.baidu.com">
          Link-Baidu
        </Button>
        <Button disabled>Disable Button</Button>
      </header>

      <section>
        <Menu
          className="user-define-class"
          defaultIndex={"0"}
          onSelect={(index) => {
            document.title = index + "";
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item, idx) => {
            return (
              <MenuItem
                index={`${idx}`}
                key={idx}
                disabled={idx % 2 === 0 ? true : false}
              >
                cool link{idx}
              </MenuItem>
            );
          })}
        </Menu>
      </section>
      <section>
        <Menu
          mode="vertical"
          defaultIndex={"0"}
          style={{ border: "1px solid blue", padding: "10px" }}
          onSelect={(index) => {
            document.title = index + "";
          }}
        >
          {[1, 2, 3].map((item, idx) => {
            return <MenuItem key={idx}>cool link{idx}</MenuItem>;
          })}
        </Menu>
      </section>

      <section>
        <p>测试SubMenu下拉菜单:</p>
        <Menu
          mode="horizontal"
          defaultIndex={"0"}
          style={{ border: "1px solid blue", padding: "10px" }}
          onSelect={(index) => {
            document.title = index + "";
          }}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
            <MenuItem>dropdown 4</MenuItem>
          </SubMenu>
          <MenuItem disabled>cool link2</MenuItem>
          <MenuItem>cool link3</MenuItem>
        </Menu>
      </section>
      <section>
        <Menu
          mode="vertical"
          defaultIndex={"0"}
          style={{ border: "1px solid blue", padding: "10px" }}
          onSelect={(index) => {
            document.title = index + "";
          }}
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>竖向菜单1</MenuItem>
            <MenuItem>竖向菜单2</MenuItem>
          </SubMenu>
          <MenuItem disabled>cool link2</MenuItem>
        </Menu>
      </section>

      <section>
        <Menu>
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>xyz</MenuItem>
          <MenuItem>第四个li</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
            <MenuItem>drop3</MenuItem>
          </SubMenu>
        </Menu>
      </section>
    </div>
  );
};

export default App;
