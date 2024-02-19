import { createFile } from "@/main/utils/common"
import path from "path"
import { col } from "sequelize"


export default function generator(config) {
    
    
    config.data.forEach(item => {
        const key = item.key
        const Key = item.Key
        const column=item.column
      const fileName = 'index.vue'
      const viewIndexTemplateType=item.viewIndexTemplateType
    const content = source(Key,key,column,viewIndexTemplateType)
        const generatorPath = config.targetPath + config.name + '/src/renderer/src/views/'
            + key + '/'
    console.log('views/index目录', generatorPath,)
     console.log('views/index名称',fileName,)
    createFile(fileName,content,generatorPath)
    })

}
function dynamicTableColumn(column){
    let result = ''
    column.forEach(item => {
        const name=item.name
        const str=`<el-table-column
          prop="${name}"
          label="${name}"
        />\n`
        result=result+str
    })
    return result
}
function dynamicFormItem(column) {

        let result = ''
    column.forEach(item => {
        const name=item.name
        const str=`<el-form-item
          label="${name}"
          prop="${name}"
        >
          <el-input v-model="formData.${name}" />
        </el-form-item>\n`
        result=result+str
    })
    return result
}
function dynamicFormRules(column) {
      
    let result = ''
    column.forEach(item => {
        const name=item.name
        const str=`${name}: [
    { required: true, message: '请输入${name}', trigger: 'blur' },
    // 其他验证规则
    ],\n`
        result=result+str
    })
    return result
}
function source(Key, key, column,viewIndexTemplateType) {
  
  const firstColumn = column[0].name
  const primaryKey=column.find(item=>item.primaryKey).name
         const source= {
             'default':`
<template>
  <div class="page-container">
    <!-- 左侧功能区 -->
    <div class="left-section">
      <el-button
        type="primary"
        @click="mode='add';openDialog()"
      >
        新增
      </el-button>
    </div>
    <!-- 右侧筛选区 -->
    <div class="right-section">
      <el-input
        v-model="searchText"
        placeholder="请输入搜索关键词"
      />
      <el-button
        type="primary"
        @click="handleSearch"
      >
        搜索
      </el-button>
    </div>
    <!-- 列表 -->
    <div class="list-container">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        
        ${dynamicTableColumn(column)}
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="text"
              size="small"
              @click="mode='edit';openDialog(row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
        @current-change="currentChange"
      />
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增/编辑信息"
      :close-on-click-modal="false"
      width="30%"
      @closed="closeDialog"
    >
      <el-form
        ref="formRef"
        :rules="formRules"
        :model="formData"
      >
        ${dynamicFormItem(column)}
        <!-- 其他表单项 -->
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted ,reactive,inject,computed} from 'vue';
import { ElButton, ElInput, ElTable, ElTableColumn, ElDialog ,ElMessageBox} from 'element-plus';
import { useRouter } from 'vue-router';
//!特殊
const d = inject('deepCopy');

// 表单验证规则
const formRules = {
  ${dynamicFormRules(column)}
  // 其他表单项的验证规则
};

//!变量、计算属性和watch
const formRef=ref()
const formData=ref({})
const tableData = ref([]);
const currentPage = computed(() => Math.floor(offset.value / limit.value) + 1);
const offset=ref(0)
const limit=ref(5)
const total=ref(0)
const selectedData=ref({})
const mode=ref('')
const searchText = ref('');
const router = useRouter();
const dialogVisible = ref(false); // 控制对话框的显示和隐藏
const currentChange=(page)=>{
  console.log(page)
  offset.value=limit.value*(page-1)
  handleSearch()
}
//!函数
//清空表单
const clearFormData=()=>{
  formData.value={}
}
//关闭弹窗
const closeDialog=()=>{
  dialogVisible.value=false
  clearFormData()
}
// 打开弹窗
const openDialog = (row) => {
  selectedData.value=row
  if(mode.value==='edit'){
    formData.value=selectedData.value
  }
  dialogVisible.value = true; // 打开新增对话框
};
//保存
const save=async ()=>{
  const valid = await formRef.value.validate()
  if(!valid){
    return 
  }
  if(mode.value==='add'){
    window.api.create${Key}(d(formData.value))
  }else if(mode.value==="edit"){
    window.api.update${Key}ById(selectedData.value.${primaryKey},d(formData.value))
  }
  handleSearch()
  closeDialog()
}
// 删除功能
const handleDelete = async (row) => {
  await ElMessageBox.confirm(
    '确认删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then( async () => {
  await window.api.delete${Key}ById(row.${primaryKey})
    })
    .catch(() => {
     
    })
  handleSearch()
};
// 搜索功能
const handleSearch = async () => {
  // 执行搜索逻辑
  console.log('执行搜索逻辑', searchText.value);
 
  
  const res=await window.api.getAll${Key}s({offset:offset.value,limit:limit.value})
  console.log(res)
  tableData.value=res.data
  total.value=res.total
 
};
onMounted(() => {
  handleSearch()
  // 页面加载时加载数据
});

</script>

<style scoped>
.page-container {
  padding: 20px;
}

.left-section {
  margin-bottom: 20px;
}

.right-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.list-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}
</style>


`,
           'hongkai':`

<template>
  <div class="page-container">
    <div class="current">
      <div class="current-avatar">
          {{current.${firstColumn}}}
      </div>
      <div class="operation">
        <el-button link type="primary" @click="mode='edit';openDialog(current)">编辑</el-button>
        <el-button link type="danger" @click="handleDelete(current)">删除</el-button>
      </div>
    </div>
    <div >
      <el-row :gutter="20" >
      <el-col v-if="currentPage === 1" :xs="8" :sm="8" :md="8" :lg="6" :xl="4.8">
        <div  class="item" @click="mode='add';openDialog()">
          <el-icon size="3em"><Plus /></el-icon>
          <div>新增</div>
        </div>
      </el-col>
      <el-col
        v-for="(item,index) in tableData"
        :key="index"
        :xs="8"
        :sm="8"
        :md="8"
        :lg="6"
        :xl="4.8"
      >
         <div class="item" @click="changeCurrent(item)"> 
          <div class="item-avatar">
            {{ item.${firstColumn} }}
          </div>
          <div>{{ item.${firstColumn} }}</div>
        </div>
      </el-col>
    </el-row>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limitConstant"
        :current-page="currentPage"
        @current-change="currentChange"
      />
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增/编辑信息"
      :close-on-click-modal="false"
      width="30%"
      @closed="closeDialog"
    >
      <el-form
        ref="formRef"
        :rules="formRules"
        :model="formData"
      >
        ${dynamicFormItem(column)}

        <!-- 其他表单项 -->
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted ,reactive,inject,computed} from 'vue';
import { ElButton, ElInput, ElTable, ElTableColumn, ElDialog ,ElMessageBox} from 'element-plus';
import { useRouter } from 'vue-router';
//!特殊
const d = inject('deepCopy');

// 表单验证规则
const formRules = {
  ${dynamicFormRules(column)}

  // 其他表单项的验证规则
};

//!变量、计算属性和watch
const current=ref({})
const formRef=ref()
const formData=ref({})
const tableData = ref([]);
//每页数量常量,更改每页数量只需更改这个常数值
const limitConstant=3
const currentPage = ref(1)
const offset=ref(0)
const limit=computed(() =>{
  if(currentPage.value===1){
    return limitConstant-1
  }else{
    return limitConstant
  }
});
const total=ref(0)
const selectedData=ref({})
const mode=ref('')
const searchText = ref('');
const router = useRouter();
const dialogVisible = ref(false); // 控制对话框的显示和隐藏
const currentChange=(page)=>{
  currentPage.value=page
  if(page===1){
    offset.value=0
  }else{
offset.value=limit.value*(page-2)+limitConstant-1
  }
  
  handleSearch()
}
//!函数
//清空表单
const clearFormData=()=>{
  formData.value={}
}
//切换当前项
const changeCurrent=(row)=>{
  current.value=row
}
//关闭弹窗
const closeDialog=()=>{
  dialogVisible.value=false
  clearFormData()
}
// 打开弹窗
const openDialog = (row) => {
  selectedData.value=row
  if(mode.value==='edit'){
    formData.value=selectedData.value
  }
  dialogVisible.value = true; // 打开新增对话框
};
//保存
const save=async ()=>{
  const valid = await formRef.value.validate()
  if(!valid){
    return 
  }
  if(mode.value==='add'){
    window.api.create${Key}(d(formData.value))
  }else if(mode.value==="edit"){
    window.api.update${Key}ById(selectedData.value.${primaryKey},d(formData.value))
  }
  handleSearch()
  closeDialog()
}
// 删除功能
const handleDelete = async (row) => {
  await ElMessageBox.confirm(
    '确认删除?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then( async () => {
  await window.api.delete${Key}ById(row.${primaryKey})
    })
    .catch(() => {
     
    })
  handleSearch()
};
// 搜索功能
const handleSearch = async () => {
  // 执行搜索逻辑
  console.log('执行搜索逻辑', searchText.value);
 
  
  const res=await window.api.getAll${Key}s({offset:offset.value,limit:limit.value})
  console.log(res)
  tableData.value=res.data
  total.value=res.total+1
 
};
onMounted(async() => {
  await handleSearch()
  current.value=tableData.value[0]??{}
  // 页面加载时加载数据
});

</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}

.left-section {
  margin-bottom: 20px;
}
.item{
  border:1px solid;
  border-radius:8px;
  height:100px;
  display:flex;
  align-items:center;
  >div{
    margin-left:1rem;
  }
  >.item-avatar{
      flex:0 0 auto;
    background-color:#4096ff;
    width:80px;
    height:80px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    
}
}
.current{
  border:1px solid;
  border-radius:8px;
  height:200px;
  display:flex;
  align-items:center;
  margin-bottom:1rem;
  >div{
    margin-left:1rem;
  }
  >.current-avatar{
    flex:0 0 auto;
    background-color:#4096ff;
    width:150px;
    height:150px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    
}
}
</style>

`
        }
        return source[viewIndexTemplateType]
    }