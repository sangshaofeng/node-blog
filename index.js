const routes = require('./routes/index');
const express = require('express');
const app = express();
const path = require('path');
const port = require('./config/config.js').port;
const less = require('less-middleware');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(less(__dirname + '/public'));              // 配置less文件目录，必须放在配置静态资源前面，否则不会重新编译
app.use(express.static(__dirname + '/public'));    // 配置静态文件目录

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 注册路由
routes(app);

console.log(port)

var server = app.listen(port, function () {
    var host = server.address().address;
    var _port = server.address().port;
    console.log('App listening at http://%s:%s', host, _port);
});
