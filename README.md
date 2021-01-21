# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

### `yarn build` fails to minify

# react+typescript 组件库设计与开发

- 创建项目

```
npx create-react-app fin-flower-ui --template typescript

# or

yarn create react-app fin-flower-ui --template typescript
```

# 项目结构说明

# 代码规范

- https://www.npmjs.com/package/eslint-config-react-app
- http://create-react-app.dev/docs/setting-up-your-editor

```
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ]
}
```

# 样式解决方案:https://reactjs.org/docs/dom-elements.html#style

- Sass

```
npm i node-sass --save
或者
yarn add node-sass
```

# 组件 UI 设计 & 样式 reset: https://github.com/necolas/normalize.css

- 组件库样式变量分类 \_variables.scss
- 统一浏览器的 css reset 的替代方案 见 \_reboot.scss

# 测试，create-react-app 内置了 jest 测试组件库

- 常见的测试文件的命名规则:\_\_tests\_\_.js 或者.test.js 或者 .spec.js 或者 .test.tsx
- 通用测试框架 Jest：https://jestjs.io/docs/en/using-matchers

```
npx jest jest.test.js
或者
npx jest jest.test.js --watch
```

- react 组件测试套件 ReactTestUtils：https://zh-hans.reactjs.org/docs/test-utils.html

见 package.json 安装的依赖

```
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10"
//组件的测试运行如下命令即可
npm run test

```

- jest-dom dom 操作的断言,dom 操作常用断言库：https://github.com/testing-library/jest-dom

  - https://github.com/testing-library/jest-dom/blob/master/README.md

  - toBeDisabled
  - toBeEnabled
  - toBeEmpty
  - toBeEmptyDOMElement
  - toBeInTheDocument
  - toBeInvalid
  - toBeRequired
  - toBeValid
  - toBeVisible
  - toContainElement
  - toContainHTML
  - toHaveAttribute
  - toHaveClass
  - toHaveFocus
  - toHaveFormValues
  - toHaveStyle
  - toHaveTextContent
  - toHaveValue
  - toHaveDisplayValue
  - toBeChecked
  - toBePartiallyChecked
  - toHaveDescription

- 使用 Firing Events 来测试组件的事件行为 :https://testing-library.com/docs/dom-testing-library/api-events/
- DOM 延时出现的测试方法：https://testing-library.com/docs/guide-disappearance

# StoryBook 之旅: https://storybook.js.org/

## 目前开发的痛点

- create-react-app 入口文件不适合管理组件库
- 缺少行为追踪和属性调试功能

## 组件外媒开发工具应有的特点

- 分开展示各个组件不同属性下的状态
- 能追踪组件的行为并且有属性调试功能
- 可以为组件自动生成文档和属性列表

## storybook 安装

- 在项目的根目录下安装 storybook

```
npx -p @storybook/cli sb init
```

## storybook 锦上添花事项

- 给组件添加 mdx 说明文档 https://storybook.js.org/docs/react/writing-docs/mdx
- 给组件添加装饰器 decorator https://storybook.js.org/docs/react/writing-stories/decorators
- 给 storybook 添加 addon-info

```
npm i -D @storybook/addon-info
npm i --save @types/storybook__addon-info
```

# JavaScript 模块打包，所有的组件都要统一一个 package 里面

- 创建组件库模块入口 ，修改入口文件 index.tsx
- 创建打包模块文件:tsconfig.build.json 文件

```
{
  "compilerOptions": {
    "outDir": "build", //编译好的文件的输出目录
    "module": "esnext",
    "target": "es5",
    "declaration": true, //默认是生成 **.d.ts申明文件
    "jsx": "react",
    "moduleResolution": "Node", //该属性一定要添加，要不然打包会出现路径找不到的问题
    "allowSyntheticDefaultImports": true,  //表示默认导入import React from 'react'
  },
  "include": [
    "src"
  ],
  "exclude": [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/setupTests.ts",
  ]
}
```

- 在 package.json 文件中创建 build-ts 命令

```
"build-ts": "tsc -p tsconfig.build.json"
```

# 生成最终的样式的文件

- 通过 rimraf 模块自动删除目录

```
npm install rimraf --save-dev
```

- 生成最终的样式文件,把 sass 的.scsss 文件编译成.css 文件，在 package.json 文件中创建 build-css
  - http://github.com/ElemeFE/element-react
  - https://github.com/sass/node-sass#command-line-interface
  ```
    "build-css": "node-sass ./src/styles/index.scss ./build/index.css",
  ```

# 在 package.json 中添加组件库入口

```
 "main": "build/index.js",
  "module": "build/index.js",
  "types": "build/index.d.ts",
```

# 待做项目

- 使用 npm link 本地测试组件库
- 发布组件库到 npm
- ci/cd
- 使用 travis 自动运行测试
