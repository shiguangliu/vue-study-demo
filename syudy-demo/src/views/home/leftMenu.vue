<template>
    <el-row class="tac">
        <!-- <h5 class="mb-2">Default colors</h5> -->
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-menu-item index="/index">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/static">
                <el-icon>
                    <setting />
                </el-icon>
                <span>数据管理</span>
            </el-menu-item>
            <el-sub-menu index="/wms">
                <template #title>
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>信息管理</span>
                </template>
                <el-menu-item index="/wms/list">列表管理</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-row>
</template>
  
<script  setup>
import {
    Calendar,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'

</script>
  