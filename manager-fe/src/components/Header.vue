<template>
    <div class="nav-top">
        <el-icon class="cursor" @click="toggleMenu"><Fold /></el-icon>
        <div class="breadcrumb">
            <span>面包屑</span>
        </div>
        <div class="userInfo cursor">
            <el-badge :is-dot="noticeCount" class="notice">
                <el-icon><Bell /></el-icon>
            </el-badge>
            <el-dropdown @command="commandHandle">
                <div class="el-dropdown-link">
                    <span>{{userInfo.userName}}</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="email">邮箱: {{userInfo.userEmail}}</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { Fold, Bell, ArrowDown } from '@element-plus/icons-vue'
export default {
    components: {
        Fold, Bell, ArrowDown
    },
    data () {
        return  {
            userInfo: this.$store.state.userInfo,
            noticeCount: 0
        }
    },
    created () {
        this.getNoticeCount()
    },
    methods: {
        commandHandle (com) {
            if (com === 'email') return
            this.$store.commit('saveUserInfo', '')
            this.userInfo = {}
            this.$router.push('/login')
        },
        toggleMenu () {
            this.$emit('toggleMenu')
        },
        async getNoticeCount () {
            this.noticeCount = await this.$api.getNoticeCount() || 0
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-top{
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 2px #ddd;
    padding: 0 20px;
    .breadcrumb{
        margin-left: 10px;
    }
    .userInfo {
        margin-left: auto;
        .notice{
            margin-right: 12px;
        }
        .el-icon--right{
            top:  2px;
        }
        .el-dropdown-link{
            color: #4094ff;
        }
    }
    .icon{
        cursor: pointer;
    }
}
</style>