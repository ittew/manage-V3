<template>
    <div class="basic-layout">
        <div class="nav-side"></div>
        <div class="content-right">
            <div class="nav-top">
                <span>面包屑</span>
                <span>用户</span>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.basic-layout{
    position: relative;
    .nav-side{
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        overflow-y: auto;
        color: #fff;
        transition: width 0.5s;
    }
    .content-right{
        margin-left: 200px;
    }
    .nav-top{
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 2px 2px #ddd;
        padding: 0 20px;
    }
    .wrapper{
        background-color: #eef0f3;
        padding: 20px;
        height: calc(100vh - 50px);
    }
}
</style>