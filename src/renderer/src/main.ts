import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import "@static/css/styles.scss";
import App from './App.vue'
import store from './store'
import router from './router';


const app = createApp(App)



app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
