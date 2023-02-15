
import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';   
import App from './App.vue';

Vue.use(iView);
Vue.config.devtools = true
new Vue({
  el: '#app',
  render: h => h(App)
});