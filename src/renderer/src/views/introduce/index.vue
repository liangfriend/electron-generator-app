<template>
  <div>
    <h1>只要是重复的代码，就应该生成！</h1>
    <h3>重复代码中灵活变动的东西，就应该集成出配置列表！</h3>
    <h5>目前只实现了windows桌面应用</h5>
  </div>
</template>
<script setup lang='ts'>
import request from '../utils/request'
import {ref,onMounted,reactive} from 'vue'
import router from '../router/index'


const load=()=>{

}
onMounted(()=>{
load()
})
</script>
<style scoped>
</style>
