// //导入Button组件
// export { default as Button } from "./components/Button";

// //导入Menu组件
// export { default as Menu } from "./components/Menu";

import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
