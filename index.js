const routes = require('./routes/index');
const express = require('express');
const app = express();
const path = require('path');
const port = require('./config/config.js').port;
const less = require('less-middleware');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(less(__dirname + '/public'));              // 配置less文件目录，必须放在配置静态资源前面，否则不会重新编译
app.use(express.static(__dirname + '/public'));    // 配置静态文件目录

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session 中间件
app.use(session({
  name: 'name',                                    // 设置 cookie 中保存 session id 的字段名称
  secret: 'name',                                  // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,                                    // 强制更新 session
  saveUninitialized: false,                        // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: 2592000000                             // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({                          // 将 session 存储到 mongodb
    url: 'mongodb://localhost/blog'                // mongodb 地址
  })
}))

// 注册路由
routes(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var _port = server.address().port;
    console.log('App is listening at http://%s:%s', host, _port);
});
