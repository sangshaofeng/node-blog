const express = require('express');
const app = express();
const path = require('path');
const port = require('./config/config.js').port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(less(__dirname + '/public'));              // 配置less文件目录，必须放在配置静态资源前面，否则不会重新编译
app.use(express.static(__dirname + '/public'));    // 配置静态文件目录

var server = app.listen(port, function () {
    var host = server.address().address;
    console.log('App listening at http://%s:%s', host, port);
});
