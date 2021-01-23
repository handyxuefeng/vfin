import React, { FC, useState } from "react";
const Icon: FC = (props: any) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>{props.children}</p>
    </div>
  );
};

export default Icon;
