# vue-ssr demo

# 踩坑注意事项!!!!!!!!!!!!!!!!!!

### SSR渲染流程
```
1.按vue-ssr官方文档教程先打包成两个.js文件或者.json，一个用于客户端，一个用于浏览器端，这里我们推荐采用.json格式；
2.要想首页采用服务器端渲染，即当路由path='/'时候，浏览器访问的不是dist目录下的index.html文件，所以这里我们在打包完成后删除该文件，让浏览器访问express提供的路由，从而进行我们的服务器端渲染流程；
3.如果在server.js中createBundleRenderer的参数中没有定义template，则express输出的是不含客户端js的html文本，这里我们后续就无法继续利用单页面的优势了，因此我们一定要设置template参数；
4.设置了template后，我们就可以在自定义.html文件中放置<!--vue-ssr-outlet-->注释，这里的作用是把服务器端渲染出来的html字符串插入到当前位置，如不放置该注释，服务器端渲染时会报错;
5.所以当我们访问首页的时候输出的就是我们自定义的.html文件了，这个文件是包含客户端js的，原来模版中的<!--vue-ssr-outlet-->会被替换成服务器端渲染好的内容，以便于搜索引擎抓取(搜索引擎一般不会运行js程序，因此每次访问我们的链接，都是会走服务器端渲染流程)；
6.如此则实现了我们做SSR的初衷，另外由于客户端js文件也加载在浏览器中了,所以我们当前页面又变成了一个单页面应用，SPA和SEO都能良好兼顾。
```

### 首屏服务端渲染没有js的问题
```
1.删掉dist目录下的index.html;
2.server.js中createBundleRenderer参数template一定要加载模版文件,如index.template.html；
3.index.template.index文件中一定要放置<!--vue-ssr-outlet-->，否则会报错。
```

### 服务器端渲染，在组件内获取上下文context
```
1.服务器端渲染时候，只有beforeCreate和create钩子函数起作用;
2.用this.$ssrContext访问上下文即可，比如this.$ssrContext.title = 'xxxx'设置<title>标签；
3.同时在html模版内用{{title}}设置;
4.注意：this.$ssrContext该api只在服务器端起作用，所以应该先判断this.$ssrContext是否存在，避免在客户端渲染时候找不到对象报错。
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
