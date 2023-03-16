# vue-study-demo
## 开发环境安装
```bash
# 1：安装node
前端开发框架和环境都是需要 Node.js ，先安装node.js开发环境，vue的运行是要依赖于node的npm的管理工具来实现
下载https://nodejs.org/en/，（安装LTS版本）安装完成之后，打开cmd开始输入命令。（win10系统需要管理员权限，右键点击以管理员身份运行cmd，否则可能会出现很多报错）

# 2：查看node的版本号
下载好node之后，以管理员身份打开cmd管理工具，，输入 node -v ，回车，查看node版本号，出现版本号则说明安装成功。
使用 npm install npm -g 更新至最新;

#3、全局安装 vue-cli
npm install --global vue-cli
或 sudo npm install vue-cli -g


# 安装依赖
npm install

# (可选）建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 运行
npm run dev(本地)
```

## bilibili学习网站https://www.bilibili.com/video/BV1Af4y1L7kA?p=2&vd_source=faac0c2e52329f987851035277338e12
## https://www.bilibili.com/video/BV1eL411P7G6/?spm_id_from=333.337.search-card.all.click&vd_source=faac0c2e52329f987851035277338e12
## https://www.bilibili.com/video/BV1zm4y1A7yQ/?p=2&spm_id_from=pageDriver&vd_source=faac0c2e52329f987851035277338e12
## 网上框架地址：https://github.com/PanJiaChen/vue-element-admin
## https://vue.ruoyi.vip/index




## 开发

```bash
# 克隆项目
git clone https://gitee.com/y_project/RuoYi-Vue

# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```


## 到docker中运行命令 docker run -d -p 8080:80 <镜像名称>
## 拉取dockerhub镜像 登录dockerhub账号，搜索镜像仓库ubuntu，选择对应的tag复制拉取命令，执行命令，查看镜像是否拉取成功
## 本地登录服务器ssh root@43.143.253.52 -p 22 输入密码lsg15781012.
