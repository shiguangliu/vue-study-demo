<template>
    <dev class="home">
        <img alt="Vue logo" src="../assets/logo.png"/>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </dev>
</template>

<script>
import HelloWorldVue from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorldVue
    }
}
</script>