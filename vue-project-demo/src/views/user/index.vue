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
                    <el-input placeholder="请输入姓名" v-model="queryInfo.username" clearable />
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入手机号码" v-model="queryInfo.phone" clearable />
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
                <el-table-column label="操作" width="350px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleClick('detail', scope.row.id)">
                            <i class="el-icon-info">详情</i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="handleClick('edit', scope.row.id)">
                            <i class="el-icon-edit">编辑</i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="handleClick('assignRole', scope.row.id)">
                            <i class="el-icon-setting">分配角色</i>
                        </el-button>
                        <el-button :type="scope.row.status == 1 ?'danger':'success'" size="mini" @click="handleClick('updateStatus', scope.row)">
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
                    <el-form-item label="密码">
                        <el-input v-model="addUserInfo.password"></el-input>
                        <span style="color:brown">*如果不输入密码，那么则由后台自动生成默认密码</span>
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
            <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
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

            <!-- 用户详情对话框 -->
            <el-dialog title="用户详情" :visible.sync="detailDialogVisible" width="50%">
                <!-- 内容主题区域 -->
                <el-form :model="detailUserInfo" label-width="100px">
                    <el-form-item label="用户id">
                        <el-input v-model="detailUserInfo.id" disabled />
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="detailUserInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="detailUserInfo.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="detailUserInfo.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-tag :type="detailUserInfo.status == 1 ? 'success' : 'danger'">
                            {{ detailUserInfo.status == 1 ? '启用' : '停用' }}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="上次登录时间">
                        <el-input v-model="detailUserInfo.loginTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="detailUserInfo.createTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <el-input v-model="detailUserInfo.updateTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-tag v-for="item in detailUserInfo.roleNameList">{{ item }}</el-tag>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 分配权限 -->
            <el-dialog title="分配角色" :visible.sync="roleDialogVisible" width="30%">
                <span>已有角色:
                    <el-tag v-for="item in userRoleList">{{ item.roleName }}</el-tag>
                </span>
                <div class="userRoleDialogChecked">
                    <!-- 多选框 -->
                    <span>可选角色:</span>
                    <el-checkbox-group v-model="userRoleCheckedList" :min="1">
                        <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{ role.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="roleDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleClick('userRoleAdd')">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { getUserListApi, updateUserStatusApi, addUserApi, getUserInfoApi, editUserApi, getUserRoleApi, getAllRoleApi, addUserRoleApi } from '@/api/user/index'
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
            // 控制用户详情对话框的显示与隐藏
            detailDialogVisible: false,
            // 分配角色对话框的显示与隐藏
            roleDialogVisible: false,
            addUserInfo: {
                username: '',
                password: '',
                phone: '',
                email: ''
            },
            editUserInfo: {
                id: '',
                username: '',
                phone: '',
                email: ''
            },
            detailUserInfo: {
                id: '',
                username: '',
                phone: '',
                email: '',
                status: '',
                loginTime: '',
                createTime: '',
                updateTime: '',
                roleNameList: []
            },
            // 保存用户角色
            userRoleList: [],
            roleList: [],
            userRoleCheckedList: [],
            // 用户添加角色
            userRoleAddRequest:{
                userId: '',
                roleIds: []
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
                case 'detail':
                    const detailParams = {
                        'id': data,
                    }
                    getUserInfoApi(detailParams).then(res => {
                        if (res.code === 200) {
                            this.detailUserInfo = res.data
                            this.detailDialogVisible = true
                        } else {
                            this.$message.error(res.message)
                        }
                    })
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
                        }
                    })
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
                            addUserApi(this.addUserInfo).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('添加用户成功')
                                    this.addDialogVisible = false
                                    this.getUserList()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        } else {
                            return false
                        }
                    })
                    break
                case 'updateUserInfo':
                    this.$refs.addUserInfoRef.validate((valid) => {
                        if (valid) {
                            editUserApi(this.editUserInfo).then(res => {
                                if (res.code === 200) {
                                    this.$message.success('修改用户成功')
                                    this.editDialogVisible = false
                                    this.getUserList()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        } else {
                            return false
                        }
                    })
                    break
                case 'assignRole':
                    // 查询用户角色
                    const roleListParams = {
                        'userId': data,
                    }
                    getUserRoleApi(roleListParams).then(res => {
                        if (res.code === 200) {
                            this.userRoleList = res.data.list
                            // 获取角色id
                            this.userRoleCheckedList = this.userRoleList.map(item => item.roleId)
                            this.roleDialogVisible = true
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                    // 查询所有角色
                    getAllRoleApi("").then(res => {
                        if (res.code === 200) {
                            this.roleList = res.data
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                    // 将用户id赋值给userRoleAddRequest
                    this.userRoleAddRequest.userId = data
                    break
                case 'userRoleAdd':
                    this.userRoleAddRequest.roleIds = this.userRoleCheckedList
                    addUserRoleApi(this.userRoleAddRequest).then(res => {
                        if (res.code === 200) {
                            this.$message.success('分配角色成功')
                            this.roleDialogVisible = false
                            this.getUserList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                    break
            }
        },
        addDialogClosed() {
            this.$refs.addUserInfoRef.resetFields()
        }
    }
}
</script>

<style lang="less" scoped>
.userRoleDialogChecked {
    margin-top: 20px;

    .el-checkbox-group {
        margin-top: 10px;
    }
}
</style>