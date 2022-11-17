<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="this.queryInfo.userName" />
                </el-col>
                <el-col :span="4">
                    <el-button type="success" @click="handleClick('search')"><i class="el-icon-search">搜索</i></el-button>
                </el-col>
            </el-row>
            <div class="globalAddButton"><el-button type="primary">添加用户</el-button></div>
            <!-- 表格区域 -->
            <el-table :data="this.userList" :border="true" style="width: 100%">
                <el-table-column prop="id" label="id" width="50px" />
                <el-table-column prop="userName" label="姓名" width="120px" />
                <el-table-column prop="mobile" label="电话号码" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="status" label="状态" width="60px">
                    <template slot-scope="scope">
                        {{ scope.row.status == 1 ? '启用' : '停用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="updateTime" label="修改时间" />
                <el-table-column label="操作" width="170px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleClick('edit',scope.row)"><i class="el-icon-edit">编辑</i></el-button>
                        <el-button type="danger" size="mini" @click="handleClick('updateStatus',scope.row)">
                            <i class="el-icon-setting">{{ scope.row.status == 1 ? '停用' : '启用' }}</i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="this.queryInfo.pageNum" :page-sizes="[10, 20, 50]" :page-size="this.queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { getUserListApi,updateUserStatusApi } from '@/api/user/index'
export default {
    data() {
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                userName: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            userList: []
        };
    },
    created() {
        this.getUserList()
    },
    methods: {
        getUserList() {
            this.userList = [
                {
                    id: 1,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 2
                },
                {
                    id: 2,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 3,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 4,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 5,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 6,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 7,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                },
                {
                    id: 8,
                    userName: 'admin',
                    mobile: '13800138000',
                    email: '',
                    createTime: '2020-01-01 12:00:00',
                    updateTime: '2020-01-01 12:00:00',
                    status: 1
                }
            ],
            this.queryInfo.pageNum = 1
            this.queryInfo.pageSize = 10
            this.total = 8
            // 获取用户列表
            // getUserListApi(this.queryInfo).then(res => {
            //     if (res.data.code === 200) {
            //         this.userList = res.data
            //     } else {
            //         this.$message.error(res.data.msg)
            //     }
            // })
        },
        // 分页大小改变时触发
        handleSizeChange(pageSize) {
            this.queryInfo.pageSize = pageSize
            this.getUserList()
        },
        // 当前页改变时触发
        handleCurrentChange(pageNum) {
            this.queryInfo.pageNum = pageNum
            this.getUserList()
        },
        handleClick(event,data){
            switch(event){
                case 'search':
                    this.queryInfo.pageNum = 1
                    this.queryInfo.pageSize = 10
                    this.getUserList()
                    break
                case 'edit':
                    this.$router.push({path:'./edit',query:{id:data.id}})
                    break
                case 'updateStatus':
                    this.$message.success('修改状态成功')
                    const params = {
                        'id': data.id,
                        'status': data.status == 1 ? 2 : 1
                    }
                    // updateUserStatusApi(params).then(res => {
                    //     if (res.data.code === 200) {
                    //         this.$message.success(res.data.msg)
                    //         data.status = params.status
                    //     } else {
                    //         this.$message.error(res.data.msg)
                    //     }
                    // })
                    break
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>