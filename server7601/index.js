const http=require('http')
const port=process.env.portB||8081
const ip=process.env.ipB||'0.0.0.0'
const code=process.env.codeB||200
const page=process.env.pageB||'<h1>BBB</h1>'
const server=http.createServer((req,res)=>{
    console.log(`b Received request from ${req.connection.remoteAddress}`);
    res.statusCode = code
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(page);
})
server.listen(port,ip,()=>{
    console.log('http服务器B启动成功！')
})