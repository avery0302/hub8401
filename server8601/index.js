const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port=process.env.portA||8080
const ip=process.env.ipA||'0.0.0.0'
const page=process.env.pageA||'<h1>AAA</h1>'

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname,'server.key')),
    cert: fs.readFileSync(path.join(__dirname,'server.cert'))
  };

const server = https.createServer(httpsOptions,(req, res) => {
  console.log(`a Received request from ${req.connection.remoteAddress}`);

  const options = {
    hostname: process.env.ipA2B||'127.0.0.1', // 这里假设服务器 B 在本地运行
    port: process.env.portB||8081,             // 这里假设服务器 B 使用的端口号
    path: '/',
    method: 'GET',
  };

  const request = http.request(options, (resB) => {
    let pageB = '';
    resB.on('data', (line) => {
      pageB += line;
    });
    resB.on('end', () => {
      // 在这里处理服务器 B 的响应
      res.statusCode = resB.statusCode;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`${page}<div>---------------A和B的分割线---------------</div>${pageB}\n`);
    });
  });

  request.end();
});

server.listen(port, ip, () => {
  console.log(`http服务器A启动成功！`);
});