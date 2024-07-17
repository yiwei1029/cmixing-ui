import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        blockData:{},
        budget:100,
        balance:1000
    },
    mutations: { // 用来修改state和getters里面的数据
        updateBlockData(state, data) {
            state.blockData = data
        },
        addBudget(state,amount){
            state.budget += parseFloat(amount)
        },
        reduceBudget(state,amount){
            if(state.budget<parseFloat(amount)){
                alert('too large reduction cannot be executed!')
                return 
            }
            state.budget -= parseFloat(amount)
        },
        updateBalance(state, change){
            state.balance-=change
        }
    },
    getters: { // 相当于计算属性
    },
    actions: { // vuex中用于发起异步请求
    },
    modules: {// 拆分模块
    }
})
export default store
