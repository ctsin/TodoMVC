### 分享过程中的速记

#### Parcel 配置

- 演示自动 Parcel 自动安装插件：TypeScript；
- HMR 问题，手动 `F5`。

#### 开车

- 传统的 MVC；
- [TypeScript 类](http://www.typescriptlang.org/docs/handbook/classes.html) 和 [ES6 类](http://es6.ruanyifeng.com/#docs/class) 比较，增加了方法、属性的访问控制和 [泛型](http://www.typescriptlang.org/docs/handbook/generics.html)
- 方法的访问控制，使用 [Symbol](http://es6.ruanyifeng.com/#docs/symbol#%E4%BD%9C%E4%B8%BA%E5%B1%9E%E6%80%A7%E5%90%8D%E7%9A%84-Symbol) 实现私有方法；
- 在 TS 中使用 jQuery, 需要引入定义文件 [@types/jquery](https://yarnpkg.com/en/package/@types/jquery)；
- [箭头函数](http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0) 及 this 绑定；
- 变量和参数的 [解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)；
- [接口](http://www.typescriptlang.org/docs/handbook/interfaces.html) 和 [泛型](http://www.typescriptlang.org/docs/handbook/generics.html)，用于类型限制；
- 实现 [事件总栈](https://30secondsofcode.org/browser#createeventhub)；
- [JSDoc 注释](http://usejsdoc.org/howto-es2015-classes.html)，及使用快捷键折叠 <kbd>Ctrl + K, Ctrl + /</kbd>；
- [Promise](http://es6.ruanyifeng.com/#docs/promise)? I Do。

> 作业：使用 Async 改写 Store 中 Promise 实现

#### 穿插所用的插件、快捷键和技巧

- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) 插件，输出 ES6 代码片段；
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) 自动引入模块;
- 引用的 `F2` 重命名 及 `F12` 跳转
- 安装 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 插件，`F5` 启动 VS Code Debug

#### 原生 JavaScript 片段

- [30 秒传统手工工艺撸码](https://30secondsofcode.org/)，做个手艺人；
- 《[你八层儿不需要 jQuery](http://youmightnotneedjquery.com/)》 和 《[你九层儿不需要 jQuery](https://github.com/nefe/You-Dont-Need-jQuery)》。
