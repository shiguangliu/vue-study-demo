<template>
    <el-row class="tac">
        <!-- <h5 class="mb-2">Default colors</h5> -->
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-menu-item index="/home">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <setting />
                </el-icon>
                <span>数据管理</span>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>信息管理</template>
                <el-menu-item index="3-1">列表管理</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-row>
</template>
  
<script  setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

</script>
  