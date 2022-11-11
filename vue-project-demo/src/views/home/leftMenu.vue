<template>
    <div class="about">
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64"
                        text-color="#fff" active-text-color="#ffd04b" router>
                        <el-menu-item index="/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="/stats">
                            <i class="el-icon-document"></i>
                            <span slot="title">数据管理</span>
                        </el-menu-item>
                        <el-submenu index="/wms">
                            <template slot="title">
                                <i class="el-icon-document"></i> 信息管理</template>
                            <el-menu-item index="/wms/list">列表管理</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-row>
            </el-aside>
        </el-container>
    </div>
</template>

<script>

export default {
    data() {
        return {};
    },
    methods: {

    }
}
</script>