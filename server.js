const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs')

const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template: fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), "utf-8"),
    clientManifest,
})

// 定义拦截器，防止访问bundle.json文件
server.use((req, res, next) => {
    if (req.url == '/vue-ssr-client-manifest.json' || req.url == '/vue-ssr-server-bundle.json') {
        return res.status(404).end();
    } 
    next();
});

server.use(express.static('./dist/'));

// 在服务器处理函数中……
server.get('*', (req, res) => {
    if (req.url == '/test') {
         res.json({msg: 'it is ok!'});
    }
    const context = { url: req.url }
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
        // 处理异常……
        res.end(html)
    })
})

server.listen(8080)
