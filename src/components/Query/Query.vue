<template>
    <section class="Request">

        <el-row :gutter="10">
            <el-col :span="24">
                <el-card>
                    <el-select v-model="BlockCurrentPick" style="width: 100%" placeholder="Select a Transaction">
                        <el-option v-for="item in Blocks" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-card>
            </el-col>
        </el-row>
        <!-- 左边 -->
        <!-- <el-row :gutter="10" v-if="BlockCurrentPick"> -->
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- input -->

                <el-card>
                    <el-row><span>Input</span></el-row>
                    <el-row v-for=" input   in  InputList " :gutter="20">
                        <el-col :span="20">
                            <!-- <div>{{ input.hash }}</div> -->
                            <el-popover placement="top-start" trigger="hover" :content="input.hash">
                                <el-button slot="reference" type="text">{{ input.hash
                                    }}</el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="4">
                            <el-popover disabled>
                                <el-button slot="reference" type="text">{{ input.amount }}</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                </el-card>
                <!-- output -->
                <el-card>
                    <el-row><span>Output</span></el-row>
                    <el-row v-for=" output   in  OutputList " :gutter="20">
                        <el-col :span="20">
                            <el-popover placement="top-start" trigger="hover" :content="output.hash">
                                <el-button slot="reference" type="text">{{ output.hash.substring(0, 40) + "..."
                                    }}</el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="4">
                            <el-popover disabled>
                                <el-button slot="reference" type="text">{{ output.amount }}</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <!-- 右边 -->
            <el-col :span="12">
                <el-card>
                    <el-row>
                        <div class="left-right"><span>Block Height</span><span style="width:50%">{{
            parseInt(Math.random() * 100) }}</span></div>
                        <div class="left-right"><span>Block Hash</span><span style="width:50%">{{
            BlockCurrentPick.substring(0, 10) + '...' }}</span>
                        </div>
                        <div class="left-right"><span>Time</span><span style="width:50%">{{ '2023-10-23 23:59:59'
                                }}</span></div>
                    </el-row>

                </el-card>
                <!-- chart图表 -->
                <el-card>
                    <div id="chart1" style="width:100%; height:200px"></div>
                </el-card>
                <!-- form提交输入输出 -->
                <el-card>

                    <div class="left-right">
                        <span>Input</span>
                        <span>
                            <el-select v-model="InputCurrentPick" style="width: 100%;" placeholder="select an input">
                                <el-option v-for=" item  in  InputListToSelect " :key="item.hash" :value="item.hash">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                    <div class="left-right">
                        <span>Output</span>
                        <span><el-select v-model="OnputCurrentPick" style="width: 100%;" placeholder="select an output">
                                <el-option v-for=" item  in  OutputListToSelect " :key="item.hash" :value="item.hash">
                                </el-option>
                            </el-select></span>

                    </div>
                    <div class="left-right">
                        <span><i class="iconfont icon-jisuanqi"></i></span>
                        <span><el-button style="width: 100%;" @click="showProb = !showProb">Calculate The
                                Probability</el-button></span>
                    </div>

                    <el-button v-if="showProb"
                        style="width: 100%; background-color: #91cc75; color: balck;">Probability: {{
                        2 / 3 }}</el-button>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import * as echarts from 'echarts'
import { createChart } from '../PlotUtils/PlotCharts.js'
import axios from 'axios'
import eventBus from '../event-bus.js'
export default {
    name: 'Request',
    data() {
        return {
            Prob: '',
            showProb: false,
            InputList: [
                { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 20 },
                { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 3 },
                // { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 0.00428200 }

            ],
            OutputList: [
                { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 7 },
                { hash: 'bc1qwt9n2akyfesvgrh6ppct5wtvfq44xj48a8xq7c', amount: 3 },
                { hash: 'bc1q7us0u59m2v2taggyydwaw2zfyl8psgjnzssk07', amount: 3 },
                { hash: 'bc1q35td3t5yldmx6tcllf5jvq8y6yan3ymc9709pt', amount: 7 },
                { hash: 'bc1qu2mfpjszwgalh8dfjjua3w6ssn8cl6dquq5ru7', amount: 3 }



            ], InputListToSelect: [
                { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 20 },
                { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                { hash: 'bc1q5t94hycpjv2uegcchfr7q30tsuhq8wd2u90cg4', amount: 3 },

            ],
            OutputListToSelect: [
                { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },
                { hash: 'bc1qm4ztr7257hlqk3x670zr6maz36qnehczuetqrn', amount: 7 },
                { hash: 'bc1qwt9n2akyfesvgrh6ppct5wtvfq44xj48a8xq7c', amount: 3 },
                { hash: 'bc1q7us0u59m2v2taggyydwaw2zfyl8psgjnzssk07', amount: 3 },
                { hash: 'bc1q35td3t5yldmx6tcllf5jvq8y6yan3ymc9709pt', amount: 7 },
                { hash: 'bc1qu2mfpjszwgalh8dfjjua3w6ssn8cl6dquq5ru7', amount: 3 }

            ],
            InputCurrentPick: '',
            OnputCurrentPick: '',
            OutputStats: [
                { OutputAmount: 7, Stats: 3 },
                { OutputAmount: 3, Stats: 3 },

            ],
            Blocks: [
                '00000000000000000003b48f935bfaaa68a8e3444a266bb529136a863fe98bd4',
                '000000000000000000014b6c9352acf8af6ca6bcf5578c57c6dc9a661a4fbbcc'
            ],
            BlockCurrentPick: ''
        }
    },
    components: {},
    watch: {
        BlockCurrentPick: {
            handler(newVal, oldVal) {
                setTimeout(() => {
                    this.createChart('chart1', this.OutputStats)
                }, 1);


                // console.log({ oldVal, newVal })
            }
        }
    },
    mounted() {
        // this.fetchData();
        // this.createChart('chart1', this.OutputStats)
        eventBus.$on('block_data', this.handleBlockData)
    },
    beforeDestroy() {
        eventBus.$off('block_data')
    },
    methods: {
        createChart,
        fetchData() {
        },
        handleBlockData(block) {
            console.log(block)
        },

    }
}
</script>

<style scoped lang="less">
.el-col {
    overflow: hidden;
    text-overflow: ellipsis;
}

.el-card {
    margin-bottom: 10px;
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

// .el-input {
//     width: 50%;
// }</style>
