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

# 在 package.json 文件中添加组件库入口，并修改对应配置项

```
{
  "name": "finui",
  "version": "0.1.0",
  "private": true,
  "main": "build/index.js",
  "module": "build/index.js",
  "types": "build/index.d.ts",
}

```

# 使用 npm link 本地测试组件库

- 在 fin-ui-project 项目中 运营 npm link 命令，如果遇到管理员权限的则运行 sudo npm link,生成如下软链接

```
/usr/local/lib/node_modules/finui -> /Users/hanxf.han/project-ui/fin-ui-project

```

- 利用 npx create-react-app fin-ui-test --template typescript 创建一个测试项目,创建好后，并运行如下命令，生成链接到组件库的软链接

```
npm link finui
/Users/hanxf.han/project-ui/fin-ui-test/node_modules/finui -> /usr/local/lib/node_modules/finui -> /Users/hanxf.han/project-ui/fin-ui-project

```

- 在 fin-ui-test 项目中修改 src/App.tsx 如下文件

```
import React from "react";
import { Button } from "finui"; //导入安装好的组件库
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Button btnType="primary" size="lg">
        点击
      </Button>
      <Button btnType="danger" size="lg">
        Danger
      </Button>
    </div>
  );
}
export default App;
```

- 修改 src/index.tsx 文件，导入对应的文件样式

```
import "finui/build/index.css"; //导入了finui组件的样式文件
```

# 本地的其他项目应用导入 vfin 组件库遇到的问题-Hooks 的非法调用问题

- 这里会遇到本地项目使用 npm link 测试组件库时遇到 react 两个版本引用的问题，导致会出现入线问题
- hooks 非法调用的问题，解决方案见:https://zh-hans.reactjs.org/warnings/invalid-hook-call-warning.html
- 本项目的做法就是在组件库中使用 npm link 链接到测试运用的 react 版本

```这里要在系统终端运行
 sudo npm link ../vfintest/node_modules/react
```

## npm 的功能

- 下载别人编写的第三方包到本地使用
- 下载并安装别人编写的命令行程序到本地使用
- 将自己编写的包或者命令行程序上传到 npm 服务器

## 使用命令查看 npm 的相关信息

- npm whoami 在终端查看 npm 登录态
- npm config ls 得到 npm 的相关信息

```
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.14.10 node/v12.19.0 darwin x64"

; userconfig /Users/hanxf.han/.npmrc
//registry.npm.taobao.org/:always-auth = false
//registry.npm.taobao.org/:email = "handyxuefeng@163.com"
//registry.npm.taobao.org/:username = "handyxuefeng"
home = "https://www.npmjs.org"
registry = "https://registry.npmjs.org/"

; node bin location = /usr/local/bin/node
; cwd = /Users/hanxf.han
; HOME = /Users/hanxf.han
; "npm config ls -l" to show all defaults.
```

- 使用 npm addUser 在终端登录 npm，根据提示一路操作就可以

```
hanxf.han@C02VQ0XLHV2J ~ % npm addUser
Username: handyxuefeng
Password:
Email: (this IS public) handyxuefeng@163.com
Logged in as handyxuefeng on https://registry.npmjs.org/.
```

## 发布组件库到 npm 之前，对 package.json 文件添加相关配置

- package.json 文件的对应子项相关说明

```
{
  "name": "vfin",//组件库的名称
  "version": "0.1.1", //组件库的版本
  "private": false, //不是一个私有的库
  "description": "Typescript+React Component Library",
  "author": "hxf",
  "license": "MIT",
  "keywords": [
    "TypeScript+React+Component",
    "TypeScript+React UI"
  ],
  "homepage": "https://github.com/handyxuefeng/vfin",
  "repository": {
    "type": "git",
    "url": "https://github.com/handyxuefeng/vfin"
  },
  "files": [ //发布到npm的目录
    "dist"
  ],
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "clean": "rimraf ./dist",
    "start": "react-scripts start",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build-ts": "tsc -p tsconfig.build.json",
    "build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
    "build": "npm run clean  && npm run build-ts && npm run build-css",
    "storybook": "start-storybook -p 6006 -s public",
    "build-storybook": "build-storybook -s public",
    "storybook-docs": "start-storybook --docs",
    "prepublish": "npm run build"
  }
}

```

- 在组件库项目所在的根目录运行如下命令

```
npm publish  //在https://npmjs.com/package/vfin  查看上传情况
```

# 待做项目

- ci/cd
- 使用 travis 自动运行测试
