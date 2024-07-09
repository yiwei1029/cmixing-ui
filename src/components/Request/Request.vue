<template>
    <section class="Request">
        <el-row :gutter="10">
            <!-- 左边 -->
            <el-col :span="12">
                <!-- input -->

                <el-card>
                    <el-row><span>Input</span></el-row>
                    <el-row v-for="input  in InputList" :gutter="20">
                        <el-col :span="15">
                            <!-- <div>{{ input.hash }}</div> -->
                            <el-popover placement="top-start" trigger="hover" :content="input.hash">
                                <el-button slot="reference" type="text">{{ input.hash.substring(0, 40) + "..."
                                    }}</el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="6">
                            <el-popover disabled>
                                <el-button slot="reference" type="text">{{ input.amount }}</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15">
                            <el-button style="width: 100%;" @click="addInput">+ add a input </el-button>
                        </el-col>
                    </el-row>
                </el-card>
                <!-- output -->
                <el-card>
                    <el-row><span>Output</span></el-row>
                    <el-row v-for="output  in OutputList" :gutter="20">
                        <el-col :span="15">
                            <el-popover placement="top-start" trigger="hover" :content="output.hash">
                                <el-button slot="reference" type="text">{{ output.hash.substring(0, 40) + "..."
                                    }}</el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="6">
                            <el-popover disabled>
                                <el-button slot="reference" type="text">{{ output.amount }}</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="15">
                            <el-button style="width: 100%;" @click="addOutput">+ add a output </el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <!-- 右边 -->
            <el-col :span="12">
                <el-card>
                    <div class="left-right">
                        <el-select v-model="CoordToSelect" style="width: 100%;" placeholder="Select A Coordination">
                            <el-option v-for="item in Coords" :key="item" :value="item">

                            </el-option>
                        </el-select>
                        <!-- <el-button></el-button> -->

                    </div>
                    <!-- form to sumbit c -->
                    <div>
                        <el-form :model="Form" style="display: flex; align-items: start;">
                            <el-form-item>
                                <el-input style="width: 200px; margin-right: 10px;" placeholder="Please input c"
                                    v-model="Form.valueOfC"></el-input>
                            </el-form-item>
                            <el-button style="width: 100%; font-size: 12px;" type="primary" @click="sendRequest">Send
                                Request</el-button>
                        </el-form>
                    </div>
                    <div>
                        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                            <span>这是一段信息</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <div class="number-display" v-if="NumberDisplay">
                        <div>#Input: {{ 5 }}</div>
                        <div>#Output: {{ 13 }}</div>
                        <div>Fee: {{ 0.01 }}</div>
                    </div>

                    <el-button type="primary" style="width: 100%;" @click="sendTransaction">Send Transaction</el-button>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
export default {
    name: 'Request',
    data() {
        return {
            dialogVisible: false,
            InputList: [
                { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 0.00571223 },
                // { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 0.00127342 },
                // { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 0.00349666 },
                // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }

            ],
            OutputList: [
                // { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 0.00571223 },
                // { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 0.00127342 },
                // { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 0.00349666 },
                // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }
                { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00571223 },


            ],
            show: true,
            NumberDisplay: false,
            Form: {
                valueOfC: ''
            },
            PromptInputHash: '',
            PromptOutputHash: '',
            Coords: ['C1', 'C2', 'C3'],
            CoordToSelect: '',
        }
    },
    components: {},
    watch: {},
    mounted() { },
    methods: {
        sendRequest() {
            this.NumberDisplay = true;
        },
        sendTransaction() {
            this.$message({
                type: 'success',
                message: 'Send transaction success'
            });
            this.$router.push('/query')

        },
        addInput() {
            this.$msgbox.prompt('please input', 'Input', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
            }).then(({ value }) => {
                const newAdd = { hash: value, amount: Math.random() }
                this.InputList.push(newAdd)
                this.$message({
                    type: 'success',
                    message: 'your input: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancel'
                });
            });
        },
        addOutput() {
            this.$msgbox.prompt('please input', 'Output', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
            }).then(({ value }) => {
                const newAdd = { hash: value, amount: this.InputList[this.InputList.length - 1].amount }
                this.OutputList.push(newAdd)
                this.$message({
                    type: 'success',
                    message: 'your input: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancel'
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
.el-col {
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-card {
    margin-bottom: 20px;
}

.left-right {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;

    :first-child {
        flex: 1;
    }

    :last-child {
        flex: 1;
    }

}

.el-input {
    // width: 50%;
}

.number-display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    >div {
        background-color: #8977fd;
        color: #fff;
        padding: 4px 6px;
        border-radius: 6px;

    }
}
</style>
