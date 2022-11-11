<template>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item"/>
      </el-carousel-item>
    </el-carousel>
    <el-row>
    <el-col v-for="o in cardList" :key="o" :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="o" class="image" />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <!-- <time class="time">{{ currentDate }}</time> -->
            <el-button type="primary" round>查看详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
        data(){
            return{
                imgList:[
                    "..//public/2.png",
                    "..//public/1.png",
                    "..//public/3.png",
                    "..//public/4.jpeg",
                    "..//public/5.jpeg",
                    "..//public/6.png"
                ],
                cardList:[
                    "..//public/2.png",
                    "..//public/1.png",
                    "..//public/6.png",
                    "..//public/4.jpeg"
                ]
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
  /* .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  } */
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
  