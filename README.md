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


## 到docker中运行命令 docker run -d -p 8080:80 <镜像名称> 比如：docker run -itd --name redis-test -p 6379:6379 redis
# docker run -itd --name auth_repository -p 9401:9401 shiguangliu/auth_repository
# docker run -itd --name gateway_repository -p 8090:8090 shiguangliu/gateway_repository
# docker run -itd --name goods_repository -p 8011:8011 shiguangliu/goods_repository
# docker run -itd --name user_repository -p 8010:8010 shiguangliu/user_repository
# docker run -itd --name vue_demo_repository -p 8080:80 shiguangliu/vue_demo_repository
# 重新启动docker容器 docker restart <容器名称> 比如：docker restart redis-test
## 拉取dockerhub镜像 登录dockerhub账号，搜索镜像仓库ubuntu，选择对应的tag复制拉取命令，执行命令，查看镜像是否拉取成功
## 本地登录服务器ssh root@43.143.253.52 -p 22 输入密码lsg15781012.
## 本地打镜像为linux/amd64架构的镜像：docker build --platform=linux/x86_64 . -f scripts/goods/Dockerfile -t goods-server:latest
### docker build --platform=linux/x86_64 . -f dockerfile目录地址 -t 镜像名称:版本号


## 本地启动jar架包命令 java -Dfile.encoding=utf-8 -jar xxx.jar
## 服务器运行java jar包：nohup java -Dfile.encoding=utf-8 -jar gateway-server-1.0-SNAPSHOT.jar &

## docker安装jenkins: https://www.cnblogs.com/fuzongle/p/12834080.html
## jenkins部署项目：https://www.bilibili.com/video/BV1xL411n7nz/?p=3&spm_id_from=pageDriver&vd_source=faac0c2e52329f987851035277338e12
## jenkins关联github：https://liuhaoan.com/2022/08/19/Jenkins-Github%E5%AE%9E%E7%8E%B0%E6%8C%81%E7%BB%AD%E5%8C%96%E9%83%A8%E7%BD%B2%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%E8%87%B3%E6%9C%8D%E5%8A%A1%E5%99%A8/

## 运行nacos docker命令：docker run -d \
-e PREFER_HOST_MODE=hostname \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=43.143.253.52 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=123456 \
-e MYSQL_SERVICE_DB_NAME=nacos_config \
-p 8848:8848 \
--name nacos-sa-mysql \
--restart=always \
nacos/nacos-server



jenkins执行脚本:
# 必须加，不然jenkins会kill应用程序
export BUILD_ID=dontKillMe

# 应用存放地址
APP_HOME=/home

# 应用名称
APP_NAME=oauth-server-1.0-SNAPSHOT.jar

# 获取PID
```
  PID=$(ps -ef | grep $APP_NAME | grep -v grep | awk '{ print $2 }')
  if [ -z "$PID" ]; then
    echo "进程不存在启动进程"
    cd $APP_HOME
    chmod 777 $APP_NAME
    source /etc/profile
    # 防止文件过大，导致jenkins卡死
    cat /dev/null > nohup.out
    # 这个命令就是启动jar工程的命令
    nohup java -jar $APP_NAME > /dev/null 2>&1 &
    if [ $? = 0 ]; then
      sleep 1
      tail -n 50 nohup.out
    fi
    echo "finished!!!"
  else
    echo "进程存在，杀死进程"
    kill -9 $PID
    echo $APP_NAME process stop, PID=$PID
    cd $APP_HOME
    chmod 777 $APP_NAME
    source /etc/profile
    # 防止文件过大，导致jenkins卡死
    cat /dev/null > nohup.out
    # 这个命令就是启动jar工程的命令
    nohup java -jar $APP_NAME > /dev/null 2>&1 &
    if [ $? = 0 ]; then
      sleep 1
      tail -n 50 nohup.out
    fi
    echo "finished!!!"
  fi
```
