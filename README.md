# vue-iconfont-cli

## 背景

在 react 项目中一直使用 [react-iconfont-cli](https://github.com/iconfont-cli/react-iconfont-cli) 管理 iconfont.cn 的图标，最近技术栈切换到 vue3 发现不支持vue 于是仿照写了一个工具。目前只支持生成 vue3 的 setup script 语法组件。

## 特性

1. 一键生成本地svg图标组件
2. 图标支持多色
3. 本地管理组件，体积小巧，无需像font class一样请求字体文件

## 安装

**全局安装**

1. 全局安装命令行

   ~~~bash
   npm i -g vue-iconfont-cli
   ~~~

2. 在项目根目录初始化

   ~~~bash
   iconfont-cli i
   ~~~

3. 配置 iconfont.json 中的 symbol_url，修改自己要生成的目录 save_dir
4. 执行生成icon组件命令

   ~~~
   iconfont-cli g
   ~~~

**项目中安装**

1. 项目中添加依赖

   ~~~
   npm i vue-iconfont-cli
   ~~~

2. package.json 中 script 下添加脚本

   ~~~
   "scripts": {
    "icon-g": "iconfont-cli g",
    "icon-i": "iconfont-cli i",
   }
   ~~~

3. 执行初始化修改 iconfont.json 配置

   ~~~
    npm run icon-i
   ~~~

4. 生成iconfont组件

   ~~~
   npm run icon-g
   ~~~

## 使用icon组件

默认生成到 src/components/iconfont 下，建议在 components/index.ts文件导出组件

~~~
  export { default as Icon } from './iconfont/index.vue'
~~~

在页面中使用

~~~
import { Icon } from '@/components'

<Icon name="复制iconfont的组件名" color="red" size="18" />

~~~

多色color属性可以传颜色字符串的数组

~~~
<Icon name="复制iconfont的组件名" :color="['red','green']" size="18" />
~~~
