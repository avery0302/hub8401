# 使用官方的 Node.js 镜像
FROM node:16

# 创建并设置工作目录
WORKDIR /usr/src/serverB

# 将当前目录内容复制到工作目录中
COPY . .

# 暴露应用程序的端口
EXPOSE 8081

# 启动应用程序
ENTRYPOINT ["node", "index.js"]
