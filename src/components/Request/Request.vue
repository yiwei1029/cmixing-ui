<template>
    <section class="Request">
        <el-row :gutter="10">
            <!-- 左边 -->
            <el-col :span="12">
                <!-- input -->

                <el-card>
                    <el-row><span>Input</span></el-row>
                    <el-row v-for="input  in InputList" :gutter="20" :key="input.id">
                        <!-- <el-col :span="15">
                            <el-popover placement="top-start" trigger="hover" :content="input.hash">
                                <el-button slot="reference" type="text">{{ input.hash.substring(0, 40) + "..."
                                    }}
                                </el-button>
                            </el-popover>
                        </el-col> -->
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
                    <el-row v-for="output  in OutputList" :gutter="20" :key="output.id">
                        <!-- <el-col :span="15">
                            <el-popover placement="top-start" trigger="hover" :content="output.hash">
                                <el-button slot="reference" type="text">{{ output.hash.substring(0, 40) + "..."
                                    }}</el-button>
                            </el-popover>
                        </el-col> -->
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

                    <!-- form to sumbit c -->
                    <div>
                        <el-form :model="form" style=" align-items: start;">

                            <el-form-item>
                                <el-select v-model="form.CoordToSelect" style="width: 100%;"
                                    placeholder="Select A Coordination">
                                    <el-option v-for="item in Coords" :key="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-input style="width: 200px; margin-right: 10px;" placeholder="Please input c"
                                    v-model="form.valueOfC"></el-input>
                            </el-form-item>
                            <el-button style="width: 100%; font-size: 12px;" type="primary" @click="onSubmit">Send
                                Request</el-button>
                        </el-form>
                    </div>
                    <br>
                    <!-- 展示decompose细节 -->
                    <div>
                        <!-- <el-button type="text" @click="dialogVisible = true">Check Decomposition</el-button> -->

                        <el-dialog title="Details" :visible.sync="dialogVisible" width="30%"
                            :before-close="handleClose">
                            <span v-for="(value, key, index ) in decompose.decomposeData" :key=key>
                                {{ key }}: {{ value }}<br>
                            </span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">cancel</el-button>
                                <el-button type="primary" @click="dialogVisible = false">ok</el-button>
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
import axios from 'axios';

export default {
    name: 'Request',
    data() {
        return {
            dialogVisible: false,
            InputList: [
                // { id: 0, amount: null },
                // { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 0.00127342 },
                // { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 0.00349666 },
                // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }

            ],
            OutputList: [
                // { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 0.00571223 },
                // { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 0.00127342 },
                // { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 0.00349666 },
                // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }
                { id: 0, amount: null },


            ],
            show: true,
            NumberDisplay: false,
            PromptInputHash: '',
            PromptOutputHash: '',
            Coords: ['dg', 'dr'],
            form: {
                // amount: InputList[0].amount,
                CoordToSelect: '',
                valueOfC: 0.3
            },
            receiveDecomposition: false,
            decompose: {},

        }
    },
    components: {},
    watch: {

    },
    mounted() { },
    methods: {
        onSubmit() {
            let formData = {
                "amount": this.InputList[0].amount,
                "method": this.form.CoordToSelect,
                "c": this.form.valueOfC
            }
            axios.post('http://localhost:8080/f1/pre_transfer', formData).then(
                resp => {
                    // this.receiveDecomposition = !this.receiveDecomposition
                    // this.decomposeData = resp.data.data
                    let decomposeData = resp.data.data['processed_data']
                    let coords = resp.data.data['data']
                    let cValue = resp.data.data['c']
                    let replenishData = resp.data.data['replenished_data']
                    this.decompose = { decomposeData, coords, cValue, replenishData }
                    this.dialogVisible = !this.dialogVisible
                    // console.log(resp.data.data)
                }
            ).catch(err => { console.log(err) })
        },
        sendTransaction() {
            this.$message({
                type: 'success',
                message: 'Send transaction success'
            });
            this.$router.push('/query')

        },
        addInput() {
            this.$msgbox.prompt('', 'Please input transfer amount', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                inputValidator: value => {
                    // string
                    let parseValue = parseFloat(value)
                    if (isNaN(parseValue) || parseValue < 0.1) {
                        return false
                    }
                },
                inputErrorMessage: 'input amount is not legal or too small(>0.1)'
            }).then(({ value }) => {
                // const newAdd = { hash: value, amount:  }
                this.InputList.push({
                    id: this.InputList.length,
                    amount: value
                })
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
