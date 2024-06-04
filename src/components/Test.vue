<template>
    <div class="login-container">
        <div class="login-box">
            <div>login</div>
            <el-form>
                <el-form-item><el-input>1</el-input></el-form-item>
                <el-form-item><el-input>1</el-input></el-form-item>
                <el-form-item><el-button>reset</el-button><el-button type="primary">sumbit</el-button></el-form-item>
                <el-form-item></el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    background-color: gray;
    height: 100%;
}

.login-box {
    width: 450px;
    height: 300px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
}
</style>