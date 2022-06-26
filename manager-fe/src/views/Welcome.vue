<template>
   <div class="welcome">
       <div class="content">
           <div class="subtitle">欢迎体验</div>
           <div class="title">通用后台管理系统</div>
           <div class="desc">-Vue3.0+Element-plus+Node+Mongo打造通用后台管理系统</div>
       </div>
       <div class="img"></div>
   </div>
</template>

<script>
    export default {
        mounted () {

        }
    }
</script>

<style lang="scss" scoped>
.welcome{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #fff;
    .content{
        .subtitle{
            font-size: 30px;
            line-height: 42px;
            color: #333;
        }
        .title{
            font-size: 40px;
            line-height: 62px;
            color: #4094ff;
        }
        .desc{
            color: #999;
            text-align: right;
            font-size: 14px;
            margin-top: 10px;
        }
    }
    .img{
        width: 371px;
        height: 438px;
        margin-left: 100px;
        background: url('../assets/images/welcome.png');
    }
}
</style>