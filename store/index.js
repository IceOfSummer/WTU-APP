import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import localCachePlugin from './plugin/localCachePlugin'

export default createStore({
  state,
  mutations,
  actions,
  plugins: [localCachePlugin]
})
