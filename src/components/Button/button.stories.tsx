import React from "react";
import { action } from "@storybook/addon-actions"; //导入行为
import { Story, Meta } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./button";

/**!
 export interface BaseButtonProps {
  type?: string;
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
*/
export default {
  title: "Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    info: {
      text: "这个是按钮组件",
      inline: true,
    },
  },
  // decorators: [
  //   (Story) => (
  //     <div style={{ textAlign: "center" }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
} as Meta;

const Template: Story<ButtonProps> = (props) => {
  return <Button {...props}>{props.description}</Button>;
};

const buttonTypeTemplate: Story<ButtonProps> = (props: ButtonProps) => {
  return (
    <>
      <Button {...props} onClick={action(`${props.children}`)}>
        {props.children}
      </Button>
      <Button btnType="danger" onClick={action(`${props.children}`)}>
        {props.children}
      </Button>
    </>
  );
};

export let buttonWithTypeButton = buttonTypeTemplate.bind({});
buttonWithTypeButton.args = {
  title: "不同类型的 Button",
  btnType: "primary",
  children: "不同类型的 Button",
};

//不同尺寸的按钮
const buttonWithSizeTemplate: Story<ButtonProps> = (props: ButtonProps) => {
  console.log("props=", props);
  return (
    <>
      <Button {...props} size="lg" onClick={action(`lg`)}>
        {props.description}
      </Button>
      <Button {...props} size="sm" onClick={action(`sm`)}>
        {props.description}
      </Button>
    </>
  );
};

export let buttonWithSizeButton = buttonWithSizeTemplate.bind({});
buttonWithSizeButton.args = {
  title: "不同尺寸的Button",
  size: "lg",
  description: "不同尺寸的Button",
  btnType: "default",
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Button",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
//   onClick: action("this is small button"),
// };
