import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

//定义按钮的属性的接口约束
export interface BaseButtonProps {
  /**按钮类型 */
  type?: string;

  /**设置按钮的样式名 */
  className?: string;

  /**设置 Button 的禁用 */
  disabled?: boolean;

  /**设置 Button 的尺寸 */
  size?: ButtonSize;

  /**设置 Button 的类型 */
  btnType?: ButtonType;
  /**  Button按钮额的孩子节点 */
  children: React.ReactNode;

  /**设置按钮的href链接跳转 */
  href?: string;

  description?: string;
}

//增加按钮的事件和原生属性,利用 & 计算符，把多个类型合并为一个新的类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;

//获取链接标签上的原生属性，,利用 & 计算符，把多个类型合并为一个新的类型
type NativeAnchorProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

//通过Partial<T> 运算符把 NativeButtonProps & NativeAnchorProps 结合只有的属性变成可选的
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>;

/**
 * 定义一个Button的函数式组件
 * @param props
 * ## Button header
 * ~~~~js
 * import {Button} from 'finui'
 * ~~~~
 */
const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    className, //用户自定义的属性
    disabled,
    size,
    btnType,
    children,
    href,
    type,
    ...restProps //展开所有的原生属性
  } = props;

  /**
   * btn, btn-lg, btn-primary
   * className 表示用户自定义的属性
   */
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
