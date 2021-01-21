import React from "react";
import { render, fireEvent } from "@testing-library/react";

//导入要测试的按钮组件
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "ckbtn",
};
const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
};
describe("测试Button组件", () => {
  it("1.是一个默认的按钮", () => {
    const wrapper = render(<Button {...defaultProps}>ck</Button>);
    const element = wrapper.getByText("ck");
    // 1.1 判断是否是一个按钮元素
    expect(element.tagName).toEqual("BUTTON");
    // 1.2 判断类名是否符合期望
    expect(element).toHaveClass("btn btn-default");
    // 1.3 模拟一个点击事件 判断函数是否被调用
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();

    fireEvent.dblClick(element);
    expect(defaultProps.onDoubleClick).toHaveBeenCalled();
  });
  it("2.渲染不同属性的按钮", () => {
    const wrapper = render(<Button {...testProps}>ck</Button>);
    const element = wrapper.queryByText("ck");
    expect(element).toHaveClass("btn-primary btn-lg ckbtn");
  });
  it("3.渲染一个链接并且有href", () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="www.baidu.com" target="_blank">
        ck
      </Button>
    );
    const element = wrapper.getByText("ck");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("4.禁用属性", () => {
    const wrapper = render(<Button {...disabledProps}>ck</Button>);
    const element = wrapper.getByText("ck") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
