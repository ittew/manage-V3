<template>
    <h2>欢迎页</h2>
    <el-button>测试</el-button>
</template>

<script>
    export default {
        mounted () {
            // this.$request({
            //     url: '/nation',
            //     data: {
            //         name: 'jack'
            //     }
            // }).then(res => {
            //     console.log(res)
            // })
            this.$request.get('/nation', {name: 'jack'}).then(res => {
                console.log(res)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>