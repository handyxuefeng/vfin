import React from "react";
import { action } from "@storybook/addon-actions"; //导入行为
import { storiesOf } from "@storybook/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}> default button </Button>
);

const buttonWithSize = () => (
  <>
    <Button size={ButtonSize.Large}> large button </Button>
    <Button size={ButtonSize.Small}> small button </Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType={ButtonType.Primary}> primary button </Button>
    <Button btnType={ButtonType.Danger}> danger button </Button>
    <Button btnType={ButtonType.Link} href="https://google.com">
      {" "}
      link button{" "}
    </Button>
  </>
);
storiesOf("Button Component", module)
  .addParameters({
    info: {
      text: ` 按钮组件
       ## this is a header
       ~~~js
       const a = 'hello'
       ~~~
      `,
      inline: true,
    },
  })
  .add("Button", defaultButton)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType);
