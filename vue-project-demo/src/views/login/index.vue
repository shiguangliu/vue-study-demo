<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="60px"
                class="login_form">
                <el-form-item label="账号" prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-date" type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/login/index'
export default {
    data() {
        return {
            loginForm: {
                username: '11111',
                password: '111111'
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码最少6个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.loginFormRef.validate((valid) => {
                if (valid) {
                    localStorage.setItem('token', "1")
                    // 跳转到首页
                    this.$router.push('./home')
                    // 调用登录接口
                    // login(this.loginForm).then(res => {
                    //     if (res.data.code === 200) {
                    //         // 登录成功
                    //         this.$message.success('登录成功')
                    //         // window.sessionStorage.setItem('token', res.data.data.token)
                    //         // 保存token
                    //         localStorage.setItem('token', res.data.data.token)
                    //         // 跳转到首页
                    //         this.$router.push('./home')
                    //     } else {
                    //         this.$message.error(res.data.msg)
                    //     }
                    // })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>


<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #ddd;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>