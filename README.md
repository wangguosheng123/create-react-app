## create-react-app 快速构建 react 项目、antd 按需加载引入和本地请求数据

```c
# 全局安装
npm install -g create-react-app
# 构建一个my-app的项目
npx create-react-app my-app
cd my-app
#  敲黑板的重点，如果要用到less,或者要看用到webpack配置文件，就要暴露webpack配置文件，使用 create-react-app 创建的项目，默认情况下是看不到 webpack 相关的配置文件，我们需要给它暴露出来，使用下面命令即可：必须在这之前就处理
npm run eject
```

#### create-react-app 创建 react 项目使用 less 的修改过程。

#### 第一步：暴露配置文件

npm run eject

#### 第二步：修改 config/webpack.config.js

//找到如下代码

```c
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
```

#### 修改为如下代码

```C
const cssRegex = /\.(css|less)$/;
const cssModuleRegex = /\.module\.(css|less)$/;
```

............................

#### 找到这段代码

```C
test: cssRegex,
exclude: cssModuleRegex,
use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
}),
// Don't consider CSS imports dead code even if the
// containing package claims to have no side effects.
// Remove this when webpack adds a warning or an error for this.
// See https://github.com/webpack/webpack/issues/6571
sideEffects: true
```

#### 修改为如下代码

```C

test: cssRegex,
exclude: cssModuleRegex,
use: getStyleLoaders({
    importLoaders: 2,    修改的地方
    sourceMap: isEnvProduction && shouldUseSourceMap,
  },
    'less-loader'       修改的地方
),

sideEffects: true,
```

# 这是引入 antd 的按需加载

`npm install babel-plugin-import --save-dev`

##### 需要在 webpack.dev.js 配置，在 module 模块 ,loader: require.resolve('babel-loader')对象中的 plugins 数组中添加如下代码

```c
[
  "import",
  {libraryName: "antd", style: 'css'} // 移动端添加 "libraryName": "antd-mobile"
] //antd按需加载
```

重点，就是在 plugins 数组中再加上这些代码
重点，就是在 plugins 数组中再加上这些代码
重点，就是在 plugins 数组中再加上这些代码
重点，就是在 plugins 数组中再加上这些代码
重点，就是在 plugins 数组中再加上这些代码

最后就是 antd 中英文问题，用到了 LocaleProvider 组建包裹

```c
import { Pagination, Button, LocaleProvider } from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";
 <LocaleProvider locale={zhCN}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={25}
              onChange={this.onChange}
            />
          </LocaleProvider>

```

启动编译当前的 React 项目，并自动打开 http://localhost:3000/
`npm start`

###### 用 create-react-app 脚手架搭建的 react 项目使用 npm run build 之后生成的打包文件只能在根目录访问，这样放在服务器目录就访问不到了，为了你们不要和我一样打包后在哭着百度解决方案，在这里一并放出：

config 文件夹下面找到 paths.js 文件，打开后大约在 34~39 行前后有如下代码：

```c
function getServedPath(appPackageJson) {

const publicUrl = getPublicUrl(appPackageJson);

const servedUrl =envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');

return ensureSlash(servedUrl, true);

}
```

将这句修改为：(仔细看，最后面的"/"前面加了一个".")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

用 create-react-app 脚手架搭建的 react 项目使用 npm run build 之后生成的打包文件只能在根目录访问，这样放在服务器目录就访问不到了，为了你们不要和我一样打包后在哭着百度解决方案，在这里一并放出：

config 文件夹下面找到 paths.js 文件，打开后大约在 34~39 行前后有如下代码：

function getServedPath(appPackageJson) {

const publicUrl = getPublicUrl(appPackageJson);

const servedUrl =envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');

return ensureSlash(servedUrl, true);

}

将这句修改为：(仔细看，最后面的"/"前面加了一个".")

const servedUrl =envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : './');

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
