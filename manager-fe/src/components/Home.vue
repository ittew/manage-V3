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
                default-active="activeMenu"
                text-color="#fff"
                background-color="#001529"
                router
                :collapse="isCollapse"
                class="nav-menu"
                unique-opened
                active-text-color="#ffd04b"
            >
                <TreeMenu :userMenu="userMenu" v-if="userMenu.length" />
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
import TreeMenu from './TreeMenu.vue'
import Header from './Header.vue'
export default {
    components: {
       Header, TreeMenu
    },
    data () {
        return {
            isCollapse: false,
            userMenu: [],
        }
    },
    computed: {
        activeMenu () {
            return location.hash.slice(1)
        }
    },
    created () {
        this.getMenuList()
    },
    methods: {
        async getMenuList () {
            try {
                this.userMenu = await this.$api.getMenuList()
            } catch (error) {
                console.log(error)
            }
        }
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