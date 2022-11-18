<template>
    <el-container class="home-container">
        <!-- 顶部导航栏 -->
        <el-header>
            <div>
                <img src="@/assets/img/1.jpeg" alt="" width="80px">
                <span>欢迎您，{{ username }}</span>
            </div>
            <el-button type="primary" @click="logout()">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 左侧菜单栏 -->
            <el-aside :width="this.isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse()">|||</div>
                <!-- 菜单栏 -->
                <el-menu background-color="#0b1118" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="this.isCollapse" :collapse-transition="false" router :default-active="this.activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模版区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="item.icon"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 一级菜单下的二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-star-on"></i>
                                <!-- 文本 -->
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容区域 -->
            <el-main>
                <!-- 路由占位区域 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        // 进入页面时，加载菜单
        this.getMenuList(),
        this.activePath = localStorage.getItem('activePath')
    },
    data() {
        return {
            menuList: [],
            username: localStorage.getItem('username'),
            // 菜单栏是否折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: ''
        };
    },
    methods: {
        // 获取菜单列表
        getMenuList() {
            this.menuList = [
            {
                    id: 1,
                    authName: '首页',
                    path: null,
                    icon: 'el-icon-user-solid'
                },
                {
                    id: 2,
                    authName: '用户管理',
                    path: null,
                    icon: 'el-icon-user-solid',
                    children: [
                        {
                            id: 5,
                            authName: '用户列表',
                            path: 'users',
                            children: null
                        }
                    ]
                },
                {
                    id: 3,
                    authName: '权限管理',
                    path: null,
                    icon: 'el-icon-circle-plus',
                    children: [
                        {
                            id: 6,
                            authName: '角色列表',
                            path: 'roles',
                            children: null
                        },
                        {
                            id: 7,
                            authName: '权限列表',
                            path: 'rights',
                            children: null
                        }
                    ]
                },
                {
                    id: 4,
                    authName: '商品管理',
                    path: null,
                    icon: 'el-icon-goods',
                    children: [
                        {
                            id: 8,
                            authName: '商品列表',
                            path: 'goods',
                            children: null
                        },
                        {
                            id: 9,
                            authName: '分类参数',
                            path: 'params',
                            children: null
                        },
                        {
                            id: 10,
                            authName: '商品分类',
                            path: 'categories',
                            children: null
                        }
                    ]
                },
                {
                    id: 11,
                    authName: '订单管理',
                    path: 'orders',
                    icon: 'el-icon-s-order',
                    children: null
                },
                {
                    id: 12,
                    authName: '数据统计',
                    path: 'reports',
                    icon: 'el-icon-s-marketing',
                    children: null
                }
            ]
        },
        // 点击按钮切换菜单栏的展开和收起
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        // 退出登录
        logout() {
            localStorage.removeItem('token')
            this.$router.push('./login')
        },
        saveNavState(activePath){
            // 保存当前的导航状态
            localStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        >img {
            margin-right: 10px;
        }
    }
}

.el-aside {
    background-color: #0b1118;

    .el-menu {
        border-right: none;
    }

    .el-menu-item {
        padding: 0;
    }

}

.el-main {
    background-color: #E9EEF3;
}

.toggle-button{
    background-color: 0b1118;
    font-size: 10px;
    line-height: 24px;
    color: aliceblue;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>