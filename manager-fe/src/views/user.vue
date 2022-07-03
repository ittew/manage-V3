<template>
    <div class="user-manage">
        <div class="query-form">
            <el-form :inline="true" :model="user">
                <el-form-item label="用户ID">
                    <el-input v-model="user.userId" placeholder="请输入用户ID" />
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="user.userName" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="user.state">
                        <el-option :value="0" label="所有"></el-option>
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary">新增</el-button>
                <el-button type="danger">批量删除</el-button>
            </div>
            <el-table :data="userList">
                <el-table-column type="selection" width="55" />
                <el-table-column 
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"    
                    :width="item.width"    
                >

                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default>
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
export default {
    name: 'user',
    setup () {
        const ctx = getCurrentInstance().appContext.config.globalProperties
        const user = reactive({ state: 0 })
        let userList = reactive([])
        const columns = reactive([
            {
                label: '用户角色',
                prop: 'userId'
            },
            {
                label: '用户名称',
                prop: 'userName'
            },
            {
                label: '用户邮箱',
                prop: 'userEmail'
            },
            {
                label: '用户角色',
                prop: 'createTime'
            },
            {
                label: '用户角色',
                prop: 'lastLoginTime'
            },
            {
                label: '用户角色',
                prop: 'role'
            },
            {
                label: '用户角色',
                prop: 'role'
            },
            {
                label: '用户角色',
                prop: 'role'
            }
        ])
        const pager = reactive({
            pageNum: 1,
            pageSize: 10
        })

        onMounted (() => {
            getUserList()
        })
        const getUserList = async () => {
            try {
                const { list, page } = await ctx.$api.getUserList()
                userList.push(...list)
            } catch (error) {
                console.log(error)
            }
        }
        

        return {
            user,
            userList,
            columns
        }
    }
}
</script>

<style lang="scss" scoped>

</style>