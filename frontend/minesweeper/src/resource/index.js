import Vue from 'vue'
import VueResource from 'vue-resource'
import {LOCAL_STORAGE} from '@/shared/constants'
import {config} from '@/config'

Vue.use(VueResource)

Vue.http.options.root = config.api.root
Vue.http.interceptors.push((request, next) => {
  console.log('request: ', request)
  next()
})

let authUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.AUTH_USER))
if (authUser && authUser.token) {
  Vue.http.headers.common['Authorization'] = 'Bearer ' + authUser.token
}
