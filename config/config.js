var port = 3000;
var url = 'mongodb://localhost/blog';   // mongo url

var ENV = process.env.NODE_ENV;

// 生产环境
if (ENV === 'production') {
  port = 8000;
  url = 'mongodb://localhost/blog';
}

module.exports = {
  port: port,
  url: url
}
