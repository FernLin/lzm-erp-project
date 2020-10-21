# 代码开发规范

### 1. class 命名规则，某一组件名 - 当前 div 代表的意思 eg: profile-content。而不是纯命名为 content

### 2. 样式书写规范,统一使用 scss 规范

-    文档 : https://www.sasscss.com/docs/#using-sass

### 3. api 方法定义， 详情看：src/api/userControl.js

-   按需引入方法

```js
import { UserLogin } from '../api/userControl';
```

-   使用方法:

    1.  使用 async await，  语法文档 : http://es6.ruanyifeng.com/#docs/async

    ```js
    const users = await getTradeAccountDetail(params);
    // do something...
    ```

### 4. 代码写完后需要执行 npm run lint。解决完 eslint 报错后方可提交代码

### 5. 异步请求数据，需要确认已经获取 token 才能执行。

### 6. 弹窗统一使用 sweetalert2。提示语用 ele 的 Message。具体插件我已经引入到项目中了。

-   官方文档：https://sweetalert2.github.io/
-   使用方法:

```js
// 在vue使用相应的提示弹窗
this.$swal
    .fire({
        title: 'xx',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        focusCancel: true,
        confirmButtonText: 'xx',
        cancelButtonText: 'xxx',
    })
    .then((result) => {
        if (result.value) {
            //do something
        }
    });
```

### 7. 时间格式化插件使用-dayjs

-   官方文档: https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/README.zh-CN.md
-   插件已经以插件引入到项目中

```js
// 在vue中使用
this.$dayjs();

//或者可以在vue对象中使用
import vue from 'vue';
vue.dayjs();
```

-   使用这个插件的主要目的是减轻冗余的代码量，相比 moment.js，体积更小。

### 8. lodash 工具库使用规范

-   直接使用`import _ from 'lodash'`，项目会直接把整个 lodash 库都会编译进去，为了优化代码，我们需要在`utils/lodash`文件中按需引入自己需要的函数

```js
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import orderBy from 'lodash/orderBy';
export default {
    isEmpty,
    debounce,
    orderBy,
};
```

-   使用方法

```js
import _ from 'utils/lodah';
_.isEmpty();
```

### 9. 代码工具以及缩进说明，此说明主要是为了解决代码样式风格的问题。不然常常会出现 eslit 报错的问题。

-   代码工具统一使用 vscode 开发
-   缩进风格为 4 个空格，或者制表符长度为 4 的 tab 缩进。

### 10. 代码格式规范

项目代码格式统一使用 prettier，并配置到 eslint 中，在提交代码前，会进入 eslint 检测，若存在 eslint 冲突则提交失败，必须要解决 eslint 冲突才能提交成功。

为实现保存自动格式化，vscode 需安装 eslint,prettier 插件，避免 git hook 格式化造成较大的代码改动，影响 review。

注：对于以下两种情况，需要忽略 eslint 检测的：

-   老代码代码结构复杂，eslint 无法自动格式化；
-   存在目前 eslint 配置没有涉及到的代码语法；

    处理方法如下：

    -   可以在你的文件中使用以下格式的块注释来临时禁止规则出现警告，如在 template 或 script 标签前加上`<!-- eslint-disable -->`, 具体查看[eslint 禁止规则文档](https://cn.eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)

    -   加上`--no-verify`过滤 git 钩子检测，如 `git commit -m 'feat: test' --no-verify`

---
