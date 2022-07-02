<template>
    <template v-for="menu in userMenu">
        <!-- 有父菜单 -->
        <el-sub-menu v-if="menu.children && menu.children.length && menu.children[0].menuType == 1" :index="menu.path"  :key="menu._id">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>{{menu.menuName}}</span>
            </template>
            <TreeMenu :userMenu="menu.children" />
        </el-sub-menu>
        <!--  无父菜单 -->
        <el-menu-item v-else-if="menu.menuType == 1 " :index="menu.path"  :key="menu._id">{{menu.menuName}}</el-menu-item>
    </template>
</template>

<script>
import { Setting } from '@element-plus/icons-vue'
export default {
    name: 'TreeMenu',
    props: {
        userMenu: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        Setting
    }
}
</script>

<style>

</style>