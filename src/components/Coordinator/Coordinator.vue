<template>
    <section class="Coordinator">
        <!-- budget and privacy -->
        <el-row :gutter="10">
            <el-col :span="12"><el-card class="box-card">
                    <div>Balance Status</div>
                    <div style="width:100%; height:100%" id="chart1"></div>
                </el-card>
            </el-col>

            <!-- <el-col :span="8"><el-card class="box-card" >
                    <div class="left-right"><span>Balance:</span><span>{{ Balance }}</span></div>
                    <div class="left-right"><span>Budget:</span><span>{{ Budget
                            }}</span>
                    </div>
                    <div class="left-right"><el-input v-model="BudgetAdd" style="margin-right: 10px;"></el-input>
                        <el-button @click="ClickAddBudget" type="primary" style="width: 100%">Add
                        </el-button>
                    </div>
                    <div class="left-right"><el-input v-model="BudgetReduce" style="margin-right: 10px;"></el-input>
                        <el-button @click="ClickReduceBudget" type="danger" style="width: 100%;">Remove</el-button>
                    </div>
                </el-card>
            </el-col> -->

            <el-col :span="12">
                <el-card class="box-card">
                    <div>Privacy Using Percentage</div>
                    <div style="width:100%; height:100%" id="chart2"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- algo and commision rate -->
        <el-row :gutter="10">
            <el-col :span="24"><el-card class="box-card">
                    <div class="left-right">
                        <span>Existing Coordination Algorithm</span>
                        <span> <el-select style="width:100%" v-model="AlgoCurrentPicking" placeholder="select">
                                <el-option v-for="item in ExistingCoordinationAlgorithm" :key="item" :value="item">
                                </el-option>
                            </el-select></span>

                    </div>
                    <div class="left-right">
                        <span>Existing Commission Rate</span>
                        <span>
                            <el-select style="width:100%" v-model="RateCurrentPicking" placeholder="select">
                                <el-option v-for="item in ExistingCommissionRate" :key="item" :value="item">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                </el-card></el-col>
        </el-row>


        <!-- chart -->
        <el-row :gutter="10">
            <el-col :span="24"><el-card class="box-card">
                    <div>Requests, Transactions and Revenue</div>
                    <div style="width: 100%; height: 400px;" id="chart3">
                    </div>
                </el-card></el-col>
        </el-row>
        <!-- Stats -->
        <el-row :gutter="20">

            <el-col :span="6" v-for="item in Stats">
                <div>
                    <el-statistic :title="item.title" group-separator="," :style="randomRgb()">
                        <template slot="formatter">
                            {{ item.value }}
                        </template>
                    </el-statistic>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import * as echarts from 'echarts';
import { createPieChart, createMultiChart } from '../PlotUtils/PlotCharts.js'
import { getDate } from '../PlotUtils/Date.js'
import axios from 'axios'
export default {
    name: 'Coordinator',
    data() {
        return {
            Balance: '100',
            Stats: [
                { title: 'Today Active User', value: null },
                { title: 'Today Revenue', value: null },
                { title: 'Today Requests', value: null },
                { title: 'Today Transactions', value: null }
            ],
            BudgetPct:
                [{ name: 'Available', value: 77 },
                { name: 'Occupied', value: 23 }],
            PrivacyPct: [
                { name: 'c<0.02', value: 13 },
                { name: 'c>0.3', value: 48 },
                { name: '0.02<c<0.1', value: 29 },
                { name: '0.1<c<0.3', value: 10 }
            ],
            ExistingCoordinationAlgorithm: [
                'Boggart',
                'Decimalism_Greedy',
                'Decimalism_Random'
            ],
            AlgoCurrentPicking: 'Boggart',
            ExistingCommissionRate: ['0.01%', '0.1%', '1%'],
            RateCurrentPicking: '0.01%',
            IndicatorByTime: {
                Request: [{ time: '10:50', value: 20 }, { time: '10:51', value: 40 }, { time: '10:52', value: 60 }],
                Transaction: [{ time: '10:50', value: 10 }, { time: '10:51', value: 15 }, { time: '10:52', value: 20 }],
                Revenue: [{ time: '10:50', value: 10 }, { time: '10:51', value: 22 }, { time: '10:52', value: 30 }]

            },
            config: {
                stats: {
                    url: 'http://localhost:8080/statistics',
                    method: 'get',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                }
            }
            // Budget: 0,
            // BudgetAdd: 1,
            // BudgetReduce: 1

        }
    },
    components: {},
    watch: {},
    mounted() {


        this.createPieChart('chart1', this.BudgetPct)
        this.createPieChart('chart2', this.PrivacyPct)
        this.createMultiChart('chart3', this.IndicatorByTime, 'time', 'value', ['Request', 'Transaction', 'Revenue'])
        axios.request(this.config.stats).then(resp => {
            var d = new Date();
            let date = getDate('')
            console.log(date)
            let statsData = resp.data['data'][date]
            this.Stats = [{ title: 'Today Active User', value: statsData['user_num'] },
            { title: 'Today Revenue', value: parseFloat(statsData['revenue_amount']).toFixed(3) },
            { title: 'Today Requests', value: statsData['request_num'] },
            { title: 'Today Transactions', value: statsData['transaction_num'] }]
        })
    },
    methods: {
        // ClickAddBudget() {
        //     this.Budget += parseFloat(this.BudgetAdd)
        //     this.Budget = this.Budget > this.Balance ? this.Balance : this.Budget
        // },
        // ClickReduceBudget() {
        //     this.Budget -= parseFloat(this.BudgetReduce)
        //     this.Budget = this.Budget < 0 ? 0 : this.Budget

        // },
        randomRgb(item) {
            let R = Math.floor(Math.random() * 200 + 50);
            let G = Math.floor(Math.random() * 200 + 50);
            let B = Math.floor(Math.random() * 200 + 50);
            // console.log(R, G, B)
            return { background: 'rgb(' + R + ',' + G + ',' + B + ', .5)', borderRadius: '5px' }
        },
        createPieChart,
        createMultiChart,
        async fetchData(config) {
            let response = await axios.request(config);
            console.log(response.data)
        }
    }
}

</script>

<style scoped lang="less">
.el-card {
    margin-bottom: 10px;
}

.left-right {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    :first-child {
        flex: 1;
    }

    :last-child {
        flex: 1;
    }




}



.top-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

// 

.el-button {
    // width: 100px;
}

.el-select {
    width: 50%;
}
</style>
