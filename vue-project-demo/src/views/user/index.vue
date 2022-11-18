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
                    <el-input placeholder="请输入姓名" v-model="queryInfo.userName" />
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入手机号码" v-model="queryInfo.mobile" />
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
                <el-table-column prop="userName" label="姓名" width="120px" />
                <el-table-column prop="mobile" label="电话号码" width="120px" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="status" label="状态" width="60px">
                    <template slot-scope="scope">
                        {{ scope.row.status == 1 ? '启用' : '停用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="160px" />
                <el-table-column prop="updateTime" label="修改时间" width="160px" />
                <el-table-column label="操作" width="170px">
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
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="addUserInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="addUserInfo.mobile"></el-input>
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
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="editUserInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="editUserInfo.mobile"></el-input>
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
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                callback()
            }
            // 验证手机号的正则表达式
            const regMobile = /^1[3|4|5|7|8][0-9]{9}$/
            if (!regMobile.test(value)) {
                callback(new Error('请输入正确的手机号'))
            }
            callback()
        }
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                userName: '',
                mobile: '',
                status: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            userList: [],
            userStatusList: [
                { id: 1, name: '启用' },
                { id: 2, name: '停用' }
            ],
            // 控制添加用户对话框的显示与隐藏
            addDialogVisible: false,
            // 控制修改用户对话框的显示与隐藏
            editDialogVisible: false,
            addUserInfo: {
                userName: '',
                mobile: '',
                email: ''
            },
            editUserInfo: {
                id: '',
                userName: '',
                mobile: '',
                email: ''
            },
            // 添加用户表单验证规则
            addUserInfoRules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                mobile: [
                    { validator: checkMobile, trigger: 'blur' }
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
        handleClick(event, data) {
            switch (event) {
                case 'search':
                    this.queryInfo.pageNum = 1
                    this.queryInfo.pageSize = 10
                    this.getUserList()
                    break
                case 'reset':
                    this.queryInfo.userName = ''
                    this.queryInfo.mobile = ''
                    this.queryInfo.status = ''
                    break
                case 'edit':
                    this.editDialogVisible = true
                    // const editParams = {
                    //     'id': data,
                    // }
                    // getUserInfoApi(editParams).then(res => {
                    // if (res.data.code === 200) {
                    //     this.editUserInfo = res.data
                    //     this.editDialogVisible = true
                    // } else {
                    //     this.$message.error(res.data.msg)
                    // }})
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