<template>
  <el-container>
    <el-aside :width="_layout.asideWidth">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        :default-active="activeIndex"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="(menuItem,index) in menuItems">
          <el-sub-menu
            v-if="menuItem.children && menuItem.children.length > 0"
            :key="index"
            :index="menuItem.index"
          >
            <template #title>
              <el-icon>{{ menuItem.icon }}</el-icon>
              <span>{{ menuItem.title }}</span>
            </template>
            <el-menu-item-group
              v-for="group in menuItem.children"
              :key="group.title"
              :title="group.title"
            >
              <el-menu-item
                v-for="item in group.items"
                :key="item.index"
                :index="item.index"
                @click="handleMenuItemClick(item)"
              >
                {{ item.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="menuItem.index"
            :index="menuItem.index"
            @click="handleMenuItemClick(menuItem)"
          >
            <el-icon>{{ menuItem.icon }}</el-icon>
            <span>{{ menuItem.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {routes} from '@renderer/router'
import {useRouter,useRoute} from 'vue-router'
import {_layout} from '@renderer/config/constant'
import {defaultPageLabel} from '@renderer/config/constant'
const menuItems = ref([]);
const router=useRouter()

const activeIndex=ref('')
const loadMenuItems = () => {

    //排序
  const sort={"introduce":1,"projectGenerator":2,"pageGenerator":3,"formGenerator":4}
  
  routes.sort((a,b)=>{
    console.log("排序",a)
    const sortA=sort[a.meta?.key]
    const sortB=sort[b.meta?.key]
    if(!sortA || !sortB){
      return 1
    }
    return sortA-sortB
  }).forEach((route) => {
    if (route.name) {
      menuItems.value.push({
        index: route.meta.key,
        title: route.meta.name,
        icon: route.meta.icon || "", // 自定义的路由 meta 中的 icon 属性
        children: [], // 可以根据需要自行定义子菜单
      });
    }
  });
  activeIndex.value=defaultPageLabel
};

const handleMenuItemClick = (menuItem) => {

  const path=menuItem.index
  router.push({path:"/"+path})
  // 处理菜单项点击事件，可以根据需要进行路由跳转等操作
};

onMounted(() => {
  loadMenuItems();
});
</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
</style>
