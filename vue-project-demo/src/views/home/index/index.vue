<template>
    <div>
        <!-- 走马灯 -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in imgList" :key="item">
                <img :src="item" height="200px" />
            </el-carousel-item>
        </el-carousel>
        <!-- 卡片 -->
        <el-row :gutter="20">
            <el-col :span="6" v-for="o in cardLists" :key="o.url">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="o.url" class="image">
                    <div style="padding: 14px;">
                        <span>{{  o.title  }}</span>
                        <div class="bottom clearfix">
                            <el-button type="primary" class="button">点击详情</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgList: [
                require("@/assets/img/2.jpeg"),
                require("@/assets/img/1.jpeg"),
                require("@/assets/img/3.jpeg"),
                require("@/assets/img/4.jpeg"),
                require("@/assets/img/5.jpeg"),
                require("@/assets/img/6.jpeg")
            ],
            cardLists: [
                { title: "可乐", url: require("@/assets/img/7.jpeg") },
                { title: "雪碧", url: require("@/assets/img/8.jpeg") },
                { title: "红牛", url: require("@/assets/img/9.jpeg") },
                { title: "美年达", url: require("@/assets/img/10.jpeg") }
            ]
        };
    },
    methods: {}
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}


.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
}

.image {
    width: 100%;
    height: 200px;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
} 

.clearfix:after {
    clear: both
}
</style>