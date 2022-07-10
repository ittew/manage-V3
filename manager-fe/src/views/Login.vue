<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form ref="loginForm" :model="user" status-icon :rules="rules">
                <div class="title">大鱼</div>
                <el-form-item prop="userName">
                    <el-input type="text" size="large" v-model="user.userName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" size="large" autocomplete="new-password" placeholder="请输入密码" v-model="user.userPwd" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" class="login-btn" @click="loginHandle">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                userName: '',
                userPwd: ''
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        loginHandle () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$api.login(this.user).then(res => {
                        this.$store.commit('saveUserInfo', res)
                        this.$router.push('/welcome')
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;
    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px 3px #ddd;
        .title {
            font-size: 40px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }
        .login-btn {
            width: 100%;
        }
    }
}
</style>