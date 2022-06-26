<template>
    <div class="basic-layout">
        <div class="nav-side" :style="{'width': isCollapse ? '64px' : '200px'}">
            <!-- 系统Logo -->
            <div class="logo">
                <img src="../assets/logo.png" alt="">
                <span v-show="!isCollapse">Manager</span>
            </div>
            <!-- 导航菜单 -->
            <el-menu
                default-active="1"
                text-color="#fff"
                background-color="#001529"
                router
                :collapse="isCollapse"
                class="nav-menu"
                active-text-color="#ffd04b"
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>Navigator One</span>
                    </template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item one</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>Navigator One</span>
                    </template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item one</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="content-right" :style="{'margin-left': isCollapse ? '64px' : '200px' }">
            <Header @toggleMenu="isCollapse = !isCollapse" />
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { Location } from '@element-plus/icons-vue'
import Header from './Header.vue'
export default {
    components: {
        Location, Header
    },
    data () {
        return {
            isCollapse: false
        }
    },
    created () {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.basic-layout{
    position: relative;
    .nav-side{
        position: fixed;
        height: 100vh;
        background-color: #001529;
        overflow-y: auto;
        overflow-x: hidden;
        color: #fff;
        transition: width 0.5s;
        .logo{
            display: flex;
            align-items: center;
            font-size: 18px;
            height: 50px;
            img{
                width: 32px;
                height: 32px;
                margin: 0 16px;
            }
        }
        .nav-menu{
            height: calc(100vh - 50px);
            border-right: none;
        }
    }
    .content-right{
        transition: all 0.5s;
    }
    .wrapper{
        background-color: #eef0f3;
        padding: 20px;
        height: calc(100vh - 50px);
    }
}
</style>