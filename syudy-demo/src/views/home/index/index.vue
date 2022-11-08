<template>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgList" :key="item">
        <el-image :src="item" />
      </el-carousel-item>
    </el-carousel>
  </template>
  
<script>
import ims from '@/static/1.png'
export default {
        data(){
            return{
                imgList:[
                ims,
                    "../static/2.png",
                    "../static/3.png",
                    "../static/4.jpeg",
                    "../static/5.jpeg",
                    "../static/6.png"
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
  </style>
  