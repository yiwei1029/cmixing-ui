import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        blockData:{},
        budget:100,
    },
    mutations: { // 用来修改state和getters里面的数据
        updateBlockData(state, data) {
            state.blockData = data
        },
        addBudget(state,amount){
            state.budget += amount
        },
        reduceBudget(state,amount){
            state.budget -= amount
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
