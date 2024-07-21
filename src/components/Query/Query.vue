<template>
    <section class="Request">

        <el-row :gutter="10">
            <el-col :span="24">
                <el-card>
                    <el-select v-model="BlockCurrentPick" style="width: 100%" placeholder="Select a Transaction"
                        no-data-text="No block available" clearable>
                        <el-option v-for="item in BlockList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-card>
            </el-col>
        </el-row>
        <!-- 左边 input output-->
        <!-- <el-row :gutter="10" v-if="BlockCurrentPick"> -->
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- input -->

                <el-card>
                    <el-row><span>Input</span></el-row>
                    <el-row v-for=" input in InputList " :gutter="20" :key="input.id">
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
                    <el-row v-for=" output in OutputList" :gutter="20" :key="output.id">
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
            <el-col :span="12">
                <!-- 最近的交易 -->

                <el-card>
                    <div>Latest transactions</div><br>
                    <div v-for="([t, b]) in BlockTimeList" class="left-right">
                        <span style="font-size: 14px;">
                            {{ t }}
                        </span>
                        <span style="font-size: 14px; cursor: pointer; " @click="BlockCurrentPick = b">{{ b }}
                        </span>
                    </div>
                </el-card>

                <!-- 右边 block的信息-->


                <el-card>
                    <div class="left-right">
                        <span>Block Height</span>
                        <span style="width:50%">{{ BlockBasicInfo.height }}</span>
                    </div>
                    <div class="left-right">
                        <span>Block Hash</span>
                        <span style="width:50%">
                            <el-popover placement="top-start" width="200" :content="BlockBasicInfo.hash"
                                trigger="hover">
                                <span slot="reference">{{ BlockBasicInfo.hash }}</span>
                            </el-popover>
                        </span>
                    </div>
                    <div class="left-right">
                        <span>Time</span>
                        <span style="width:50%">{{ BlockBasicInfo.time }}</span>
                    </div>
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
                                <el-option v-for=" item  in  InputList " :key="item.id" :value="item.hash">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                    <div class="left-right">
                        <span>Output</span>
                        <span><el-select v-model="OutputCurrentPick" style="width: 100%;"
                                placeholder="select an output">
                                <el-option v-for=" item  in  OutputList " :key="item.id" :value="item.hash">
                                </el-option>

                            </el-select></span>
                        <!-- <span>{{ OutputCurrentPick.id }}</span> -->
                    </div>
                    <!-- <div>{{ findOutputByHash(OutputCurrentPick) }}</div> -->
                    <div class="left-right">
                        <span><i class="iconfont icon-jisuanqi"></i></span>
                        <span><el-button style="width: 100%;" @click="queryProbByTxid(BlockCurrentPick)">Calculate The
                                Probability</el-button></span>
                    </div>

                    <el-button style="width: 100%; background-color: #91cc75; color: black;">Probability: {{
            prob }}</el-button>
                </el-card>
            </el-col>
        </el-row>
        <el-backtop :bottom="50">
            <div
                style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px; color: #1989fa; font-size: 20px;">
                UP
            </div>
        </el-backtop>
    </section>
</template>

<script>
import * as echarts from 'echarts'
import { createChart } from '../PlotUtils/PlotCharts.js'
import { timestampToDate } from '../PlotUtils/Date.js'
import axios from 'axios'
import eventBus from '../event-bus.js'
export default {
    name: 'Request',
    data() {
        return {
            // Prob: '',
            username: this.$store.state.username,
            showProb: false,
            BlockList: [],
            TimeList: [],
            BlockTimeList: [],
            InputList: [
                // { hash: 'bc1quqfl65xqtkprhrygpdpeg4r7q20zyaq8xvxd3a', amount: 20 },


            ],
            OutputList: [
                // { hash: 'bc1qnalwjznls42dzvaw4m5u48td032692aslqwg9m', amount: 7 },

            ],
            // InputSelect: {},
            // OutputSelect: {},
            InputCurrentPick: '',
            OutputCurrentPick: '',
            OutputStats: [
                // { OutputAmount: 7, Stats: 3 },
                // { OutputAmount: 3, Stats: 3 },

            ],
            Blocks: [

            ],
            BlockCurrentPick: '',
            BlockBasicInfo: {
                height: null,
                hash: '',
                time: ''
            },
            prob: 0
        }
    },
    computed: {
        // BlockTimeList: function () {
        //     this.TimeList.map((e, i) => [e, this.BlockList[i]])
        // }
    },
    components: {},
    watch: {
        BlockCurrentPick: {
            handler(newVal, oldVal) {
                this.queryBlockById(newVal)
                // this.queryProbByTxid(newVal)
                // setTimeout(() => {
                //     this.createChart('chart1', this.OutputStats)
                // }, 100);
                // console.log({ oldVal, newVal })
            }
        },
        OutputStats: {
            handler(newVal, oldVal) {
                this.createChart('chart1', newVal)
            }
        },
        // InputCurrentPick: {
        //     handler(newVal, oldVal) {
        //         this.queryProbByTxid(newVal)
        //     },
        // },
        // OutputCurrentPick: {
        //     handler(newVal, oldVal) {
        //         this.queryProbByTxid(newVal)
        //     },
        // }

    },
    mounted() {
        console.log(this.$store.state.username)
        // let blockData = this.$store.state.blockData.data
        // 获取block txid列表最近三个
        axios.get(`http://localhost:8080/${this.username}/transfer`).then(resp => {
            for (const txid of resp.data.data.slice(-3)) {
                this.BlockList.push(txid)
                // console.log(txid)

            }
            this.getBlockTime(this.BlockList)
            // this.BlockTimeList = this.TimeList.map((e, i) => [e, this.BlockList[i]])
            // console.log(this.BlockTimeList)

            // console.log(this.TimeList)
        }).catch(err => { console.error(err) })

    },
    beforeDestroy() {
        // eventBus.$off('block_data')
    },
    methods: {
        createChart,
        handleBlockData(block) {
            // console.log(block)
        },
        renderAddressAmount() {
            let txData = this.$store.state.blockData.data.blcok.tx

        },
        findOutputByHash(hash) {
            for (let output of this.OutputList) {
                if (output.hash === hash) {
                    return output
                }
            }
            return null
        },
        findInputByHash(hash) {
            for (let input of this.InputList) {
                if (input.hash === hash) {
                    return input
                }
            }
            return null
        },
        getBlockTime(blockList) {
            // const promises = []
            // for (const blockId of blockList) {
            //     const promise = axios.get("http://localhost:8080/f1/transfer/" + blockId).then(resp => {
            //         this.TimeList.push(timestampToDate(resp.data.data.block.time))
            //     })
            //     promises.push(promise)
            // }
            const promises = this.BlockList.map(blockId => axios.get(`http://localhost:8080/${this.username}/transfer/${blockId}`).then(
                resp => {
                    return timestampToDate(resp.data.data.block.time)
                }
            ))
            Promise.all(promises).then((times) => {
                this.TimeList = times
                // console.log(this.TimeList)
                this.BlockTimeList = this.TimeList.map((e, i) => [e, this.BlockList[i]])
            })
        },
        queryProbByTxid(txid) {
            axios.get(`http://localhost:8080/${this.username}/probability/${txid}`).then(resp => {
                // console.log(resp.data.data)
                let tempData = resp.data.data
                for (let input in tempData) {
                    if (input == this.InputCurrentPick) {
                        let problist = tempData[input]
                        console.log(problist)
                        for (let probres of problist) {
                            if (probres.address == this.OutputCurrentPick) {
                                // console.log(probres.address)
                                this.prob = probres.probability
                                console.log(this.prob)
                            }
                        }
                    }
                }
            })
        },
        queryBlockById(blockId) {
            axios.get(`http://localhost:8080/${this.username}/transfer/${blockId}`).then(resp => {
                console.log(resp.data)
                let dataTemp = resp.data
                this.BlockBasicInfo = {
                    height: dataTemp.data.block.height,
                    hash: dataTemp.data.block.hash,
                    time: timestampToDate(dataTemp.data.block.time)
                }

                this.InputList = []
                this.OutputList = []
                let input = dataTemp.data['format_data']['input']
                let output = dataTemp.data['format_data']['output']
                for (let hash in input) {
                    let info = input[hash]
                    let amount = info.value
                    let role = info.flag
                    this.InputList.push({ hash, amount, role, id: this.InputList.length })
                }
                for (let hash in output) {
                    let info = output[hash]
                    let amount = info.value
                    let role = info.flag
                    this.OutputList.push({ hash, amount, role, id: this.OutputList.length })
                }

                //统计outputlist
                let outputStats = {}
                for (const element of this.OutputList) {
                    let amount = element.amount
                    if (outputStats[amount]) {
                        outputStats[amount]++
                    } else {
                        outputStats[amount] = 1
                    }
                }
                this.OutputStats = Object.entries(outputStats).map(([key, value]) =>
                    ({ 'OutputAmount': key, 'Stats': value }))
                // console.log(this.OutputStats)
            })
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

.left-right1 {
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
