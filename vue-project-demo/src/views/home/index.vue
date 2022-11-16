<template>
    <dev>
        <el-button type="primary" @click="logout()">退出</el-button>
    </dev>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push('./login')
        }
    }
}
</script>

<style lang="less" scoped>
</style>