<template>
    <div class="login">
        <h1>登录</h1>
        <div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input type="text" placeholder="账号" v-model="loginForm.username" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var checkUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                callback();
            }
        };
        var checkPassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('密码长度不能少于6位'));  
            }else {
                callback();
            }
        };
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {    
                username: [
                    { validator: checkUserName, trigger: 'blur' }
                ],
                password: [
                    { validator: checkPassWord, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('登录成功!');
                    // 登录成功后跳转页面
                    this.$router.push("./home")
                } else {
                    console.log('登录失败');
                    return false;
                }
            });
        }
    }
}
</script>

<style>
    .login{
        text-align: center;
        position: absolute;
        top: 20%;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 25%;
    }
</style>