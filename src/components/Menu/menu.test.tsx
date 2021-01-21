import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";

//导入要测试的menu, submenu 组件
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

/**
 * export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children: React.ReactNode;
    }
 */
const testMenuHorizontalProps: MenuProps = {
  defaultIndex: "0",
  className: "test",
  onSelect: jest.fn(),
};

const testMenuVerticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <React.Fragment>
      <Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>xyz</MenuItem>
        <MenuItem>第四个li</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>drop1</MenuItem>
          <MenuItem>drop2</MenuItem>
          <MenuItem>drop3</MenuItem>
        </SubMenu>

        <SubMenu title="dropdown2">
          <MenuItem>shanghai</MenuItem>
          <MenuItem>beijing</MenuItem>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .fin-submenu {
      display: none;
    }
    .fin-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement, //menu节点
  activeElement: HTMLElement, //当前激活的menu节点
  disabledElement: HTMLElement; //当前的

describe("测试菜单和菜单项组件", () => {
  /**
   * 在测试组件时，利用测试的钩子函数
   * beforeEach钩子函数，在每个it语句执行时，都会执行beforeEach函数
   */

  beforeEach(() => {
    wrapper = render(generateMenu(testMenuHorizontalProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu"); //通过ul上面的data-testid="test-menu" 获取ul元素
    activeElement = wrapper.getByText("active"); //通过文本内容获取元素
    disabledElement = wrapper.getByText("disabled");
  });

  //case 1
  it("1.测试组件的正常展示属性", () => {
    expect(menuElement).toBeInTheDocument(); //查看元素是否在文档中
    expect(menuElement).toHaveClass("fin-menu test");
    //expect(menuElement.getElementsByTagName("li").length).toEqual(4);

    //:scope是css伪类，表示选择同一个容器中同层次的的元素
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(6);

    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  //case 2
  it("2.测试组件是否被点击，函数是否被调用", () => {
    const thirdChild = wrapper.getByText("xyz"); //通过文本获得元素
    fireEvent.click(thirdChild); //模拟点击第三个元素
    expect(thirdChild).toHaveClass("is-active"); //  元素点击后，是否被赋予is-active样式
    expect(activeElement).not.toHaveClass("is-active"); // 其他的li元素就没有is-active样式
    expect(testMenuHorizontalProps.onSelect).toHaveBeenCalledWith("2"); //期待函数没有被index=2的li的元素调用

    //测试disable的li
    fireEvent.click(disabledElement); //点击被禁用的元素
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testMenuHorizontalProps.onSelect).not.toHaveBeenCalledWith(1); //期待函数没有被disabled的元素调用
  });

  //case 3
  it("3.测试组件的垂直模式是否符合预期", () => {
    cleanup(); //清空前面case的元素渲染
    const wrapper = render(generateMenu(testMenuVerticalProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });

  //case 4:
  it("4.鼠标滑不移动到下拉框，不显示菜单项", () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
  });

  //case 5,同步settimeout测试延时出现的dom
  it("5.鼠标移动到下拉框处，展示下拉菜单", async () => {
    const dropDownElement = wrapper.getByText("dropdown"); //通过文本获得元素
    fireEvent.mouseEnter(dropDownElement);
    //因为下拉菜单是延时了100ms才展示的，所以这里也要延时一下
    await waitFor(() => {
      expect(wrapper.queryByText("drop2")).toBeVisible();
    });
    fireEvent.mouseLeave(dropDownElement);

    await waitFor(() => {
      expect(wrapper.queryByText("drop2")).not.toBeVisible();
    });
  });

  //case 6 通过asnyc+await测试延时出现的元素
  it("6.通过asnyc+await测试延时出现的元素", async () => {
    const dropDownElement = wrapper.getByText("dropdown2"); //通过文本获得元素
    fireEvent.mouseEnter(dropDownElement);
    //因为下拉菜单是延时了100ms才展示的，所以这里也要延时一下
    await waitFor(() => {
      expect(wrapper.queryByText("shanghai")).toBeVisible();
      expect(wrapper.queryByText("beijing")).toBeVisible();
    });

    fireEvent.click(wrapper.getByText("beijing"));

    expect(testMenuHorizontalProps.onSelect).toHaveBeenCalledWith("5-1");

    fireEvent.mouseLeave(dropDownElement);

    await waitFor(() => {
      expect(wrapper.queryByText("shanghai")).not.toBeVisible();
      expect(wrapper.queryByText("beijing")).not.toBeVisible();
    });
  });
});
