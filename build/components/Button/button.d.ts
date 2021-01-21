import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export declare enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}
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
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type NativeAnchorProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>;
/**
 * 定义一个Button的函数式组件
 * @param props
 * ## Button header
 * ~~~~js
 * import {Button} from 'finui'
 * ~~~~
 */
declare const Button: FC<ButtonProps>;
export default Button;
