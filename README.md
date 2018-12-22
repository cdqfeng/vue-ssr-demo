# app

# 踩坑注意事项!!!!!!!!!!!!!!!!!!

### 首屏服务端渲染没有js的问题
```
1.删掉dist目录下的index.html;
2.server.js中createBundleRenderer参数template一定要加载模版文件,如index.template.html；
3.index.template.index文件中一定要放置`<!--vue-ssr-outlet-->`，否则会报错。
```

### 服务器端渲染，在组件内获取上下文context
```
1.服务器端渲染时候，只有beforeCreate和create钩子函数起作用;
2.用`this.$ssrContext`访问上下文即可，比如`this.$ssrContext.title = 'xxxx'`设置<title>标签；
3.同时在html模版内用{{title}}设置;
4.注意：`this.$ssrContext`该api只在服务器端起作用，所以应该先判断`this.$ssrContext`是否存在，避免在客户端渲染时候找不到对象报错。
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
