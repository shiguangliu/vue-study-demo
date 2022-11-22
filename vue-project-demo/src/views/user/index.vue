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
                    <el-input placeholder="请输入姓名" v-model="queryInfo.username" />
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入手机号码" v-model="queryInfo.phone" />
                </el-col>
                <el-col :span="6">
                    <el-select v-model="queryInfo.status" placeholder="请选择状态">
                        <el-option v-for="item in userStatusList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" @click="handleClick('search')"><i class="el-icon-search">搜索</i>
                    </el-button>
                    <el-button type="info" @click="handleClick('reset')"><i class="el-icon-refresh">重置</i>
                    </el-button>
                </el-col>
            </el-row>
            <div class="globalAddButton">
                <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </div>
            <!-- 表格区域 -->
            <el-table :data="this.userList" :border="true" style="width: 100%">
                <el-table-column prop="id" label="id" width="50px" />
                <el-table-column prop="username" label="姓名" width="120px" />
                <el-table-column prop="phone" label="电话号码" width="140px" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="status" label="状态" width="80px">
                    <template slot-scope="scope">
                        {{ scope.row.status == 1 ? '启用' : '停用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="loginTime" label="上次登录时间" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column prop="updateTime" label="修改时间" />
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleClick('edit', scope.row.id)"><i
                                class="el-icon-edit">编辑</i></el-button>
                        <el-button type="danger" size="mini" @click="handleClick('updateStatus', scope.row)">
                            <i class="el-icon-setting">{{ scope.row.status == 1 ? '停用' : '启用' }}</i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum" :page-sizes="[10, 20, 50]" :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <!-- 添加用户对话框 -->
            <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 内容主题区域 -->
                <el-form :model="addUserInfo" :rules="addUserInfoRules" ref="addUserInfoRef" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addUserInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="addUserInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addUserInfo.email"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 底部按钮区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClick('cancelAddUser')">取 消</el-button>
                    <el-button type="primary" @click="handleClick('sealAddUser')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改用户对话框 -->
            <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 内容主题区域 -->
                <el-form :model="editUserInfo" :rules="addUserInfoRules" ref="addUserInfoRef" label-width="70px">
                    <el-form-item label="用户id">
                        <el-input v-model="editUserInfo.id" disabled />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editUserInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="editUserInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editUserInfo.email"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleClick('updateUserInfo')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { getUserListApi, updateUserStatusApi, addUserApi, getUserInfoApi } from '@/api/user/index'
export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            if (!value) {
                callback()
            }
            // 验证邮箱的正则表达式
            const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
            if (!regEmail.test(value)) {
                callback(new Error('请输入正确的邮箱'))
            }
            callback()
        }
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                callback()
            }
            // 验证手机号的正则表达式
            const regPhone = /^1[3|4|5|7|8][0-9]{9}$/
            if (!regPhone.test(value)) {
                callback(new Error('请输入正确的手机号'))
            }
            callback()
        }
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                username: '',
                phone: '',
                status: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            userList: [],
            userStatusList: [
                { id: '', name: '请选择' },
                { id: 1, name: '启用' },
                { id: 2, name: '停用' }
            ],
            // 控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            // 控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            addUserInfo: {
                username: '',
                phone: '',
                email: ''
            },
            editUserInfo: {
                id: '',
                username: '',
                phone: '',
                email: ''
            },
            // 添加用户表单验证规则
            addUserInfoRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { validator: checkPhone, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.getUserList()
    },
    methods: {
        getUserList() {
            // 获取用户列表
            getUserListApi(this.queryInfo).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.userList = res.data.list
                    this.total = res.data.total
                    this.queryInfo.pageNum = res.data.pageNum
                    this.queryInfo.pageSize = res.data.pageSize
                } else {
                    this.$message.error(res.message)
                }
            })
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
        handleClick(event, data) {
            switch (event) {
                case 'search':
                    this.queryInfo.pageNum = 1
                    this.queryInfo.pageSize = 10
                    this.getUserList()
                    break
                case 'reset':
                    this.queryInfo.username = ''
                    this.queryInfo.phone = ''
                    this.queryInfo.status = ''
                    break
                case 'edit':
                    const editParams = {
                        'id': data,
                    }
                    getUserInfoApi(editParams).then(res => {
                    if (res.code === 200) {
                        this.editUserInfo = res.data
                        this.editDialogVisible = true
                    } else {
                        this.$message.error(res.message)
                    }})
                    break
                case 'updateStatus':
                    const params = {
                        'id': data.id,
                        'status': data.status == 1 ? 2 : 1
                    }
                    updateUserStatusApi(params).then(res => {
                        if (res.code === 200) {
                            this.$message.success(res.message)
                            data.status = params.status
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                    break
                case 'cancelAddUser':
                    this.addDialogVisible = false
                    break
                case 'sealAddUser':
                    this.$refs.addUserInfoRef.validate((valid) => {
                        if (valid) {
                            this.$message.success('添加用户成功')
                            this.addDialogVisible = false
                            this.getUserList()
                        } else {
                            return false
                        }
                    })
                    break
                case 'updateUserInfo':
                    this.$refs.addUserInfoRef.validate((valid) => {
                        if (valid) {
                            this.$message.success('修改用户信息成功')
                            this.editDialogVisible = false
                            this.getUserList()
                        } else {
                            return false
                        }
                    })
            }
        },
        addDialogClosed() {
            this.$refs.addUserInfoRef.resetFields()
        }
    }
}
</script>

<style lang="less" scoped>

</style>