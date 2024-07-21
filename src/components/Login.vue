<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avatar" style="text-align: center;">
                <h1>login</h1>
            </div>
            <el-form :rules="LoginRules" class="login-form" ref="form" :model="LoginForm" label-width="0px">
                <el-form-item label="" prop="username">
                    <el-input v-model="LoginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="LoginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="info" @click="resetLoginForm">reset</el-button>
                    <el-button type="primary" @click="login">submit</el-button>
                </el-form-item>
            </el-form>


        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            LoginForm: {
                username: '',
                password: ''
            },
            LoginRules: {
                username: [
                    { required: true, message: 'pls input wallet name', trigger: 'blur' },
                    { min: 0, max: 20, message: '', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'pls input password', trigger: 'blur' },
                    { min: 0, max: 99, message: '', trigger: 'blur' }
                ]
            }
        }
    },
    components: {},
    watch: {},
    mounted() { },
    methods: {
        login() {
            const wallets = this.$store.state.wallets
            if (wallets.includes(this.LoginForm.username)) {
                this.$store.commit('updateUsername', this.LoginForm.username)
                console.log(this.$store.state.username)
                this.$message({ message: 'login success', type: 'success' })
                this.$router.push('/Coordinator')
            }
            // this.$router.push('/Coordinator')
            else {
                this.$message({ message: 'wallet not found', type: 'error' })
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    background-color: #007acc;
    height: 100%;
}

.login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.login-form {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 0
}

.btns {
    display: flex;
    justify-content: end;
}
</style>
