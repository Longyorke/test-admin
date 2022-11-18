export default {
    token: (state) => { return state.app.token }, // 将作为getters对象导出到vuex的store对象中
    siderType: (state) => { return state.app.siderType }
}
