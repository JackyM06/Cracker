
使用项目在线地址可跳过下列步骤 : http://39.106.198.9/

Cracker客户端项目调试步骤

环境设置

1.安装node.js和npm

> https://nodejs.org/zh-cn/  下载并安装（打开链接）

2.使用淘宝npm镜像 (在命令行中输入)

> npm install -g cnpm --registry=https://registry.npm.taobao.org

3.进入web目录

> cd web

4.安装node_modules依赖模块(在命令行中输入)[或双击脚本run.2.install.cmd]

> cnpm install 或 npm i

5.本地调试(在命令行中输入)[或使用脚本run.3.debug.cmd]

> npm run dev

6.随后，您可以打开已开启调试服务

> 在浏览器中输入http://localhost:8083/



备注

- 若遇到**第四步运行失败**请尝试检查node环境是否安装配置完成（命令行中输入node -v是否返回node版本号）
- 若**第五步运行失败**请尝试清除node_modules 文件夹**[或使用脚本run.1.clean.cmd]** 后再重新从第四步开始



