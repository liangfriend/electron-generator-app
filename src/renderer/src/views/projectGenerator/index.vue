<template>
  <div style="width:100%;height:100%">
    <!-- 工程名称输入框 -->
    <el-form
      :model="config"
      label-width="150px"
    >
      <div class="project-information">
        <el-form-item label="工程名称">
          <el-input v-model="config.name" />
        </el-form-item>
        <!-- 工程模版选择器 -->
        <el-form-item label="工程模版">
          <el-select v-model="config.projectTemplateType">
            <el-option
              v-for="option in projectTemplateTypeOption"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <!-- 目标路径输入框 -->
        <!-- <el-form-item label="目标路径">
        <el-input v-model="config.targetPath" />
        </el-form-item> -->
      
        <!-- Main 模版选择器 -->
        <el-form-item label="Main 模版">
          <el-select v-model="config.mainTemplateType">
            <el-option
              v-for="option in mainTemplateTypeOption"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      
        <!-- Preload 模版选择器 -->
        <el-form-item label="Preload 模版">
          <el-select v-model="config.preloadTemplateType">
            <el-option
              v-for="option in preloadTemplateTypeOption"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      
        <!-- Renderer 模版选择器 -->
        <el-form-item label="Renderer 模版">
          <el-select v-model="config.rendererTemplateType">
            <el-option
              v-for="option in rendererTemplateTypeOption"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-popover
            :visible="warningVisible"
            placement="bottom"
            title="注意事项"
            :width="500"
          >
            <template #default>
              <li>每个数据表有且只有一个字段选中主键，这里没有做限制，请开发者自行遵守</li>
              <li>所有的输入框都是必填项</li>
              <li>如果生成后的项目无法直接npm install,删除sqlite3,重新install,然后单独npm install sqlite3@5.1.7</li>
              <li>详情见：https://www.baidu.dom</li>
              <li>生成的工程内置migration表，请不要输入名为migration的数据表，否则会产生冲突</li>
            </template>
            <template #reference>
              <el-button
                type="warning"
                link
                @click="warningVisible=!warningVisible"
              >
                注意事项
              </el-button>
            </template>
          </el-popover>
        </el-form-item>
      </div>
      
      <!-- 动态表单 -->
      <el-form-item
        label="数据"
      >
        <!-- 增加数据表按钮 -->
        <div>
          <el-button
            type="primary"
            @click="addTable"
          >
            增加数据表
          </el-button>
          <el-button
            type="primary"
            @click="importSqliteFile"
          >
            导入sqlite文件
          </el-button>
          <div
            v-for="(item, tableIndex) in config.data"
            :key="tableIndex"
          >
            <!-- viewIndexTemplateTypeOption 模版选择器 -->
            <el-form-item
              label="列表页模版"
              width="200"
            >
              <div class="list-page-template">
                <el-select v-model="item.viewIndexTemplateType">
                  <el-option
                    v-for="option in viewIndexTemplateTypeOption"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                
                <el-image
                  class="list-page-template-image"
                  :preview-src-list="[rendererViewIndexImageMap[item.viewIndexTemplateType]]"
                  fit="cover"
                  :src="rendererViewIndexImageMap[item.viewIndexTemplateType]"
                />
              </div>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="item.name" />
            </el-form-item>

            <el-form-item label="关键字(首字母小写)">
              <el-input v-model="item.key" />
            </el-form-item>

            <el-button
              type="primary"
              @click="addColumn(tableIndex)"
            >
              增加字段
            </el-button>
            <div class="column">
              <div
                v-for="(column,columnIndex) in item.column"
                :key="columnIndex"
                class="column-item"
              >
                <!-- 目标路径输入框 -->
                <el-form-item label="字段名称">
                  <el-input v-model="column.name" />
                </el-form-item>
                <el-form-item label="允许为空">
                  <el-checkbox v-model="column.allowNull">
                    允许
                  </el-checkbox>
                </el-form-item>
                <el-form-item label="是否主键">
                  <el-checkbox v-model="column.primaryKey">
                    主键
                  </el-checkbox>
                </el-form-item>
                <el-form-item label="字段类型">
                  <el-select v-model="column.type">
                    <el-option
                      v-for="type in columnType"
                      :key="type.value"
                      :label="type.label"
                      :value="type.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="操作">
                  <el-button
                 
                    type="danger"
                    link
                    @click="removeColumn(tableIndex,columnIndex)"
                  >
                    删除字段
                  </el-button>
                </el-form-item>
              </div>
            </div>
            <!-- 删除数据表按钮 -->
            <el-button
              v-if="config.data.length > 1"
              type="danger"
              @click="removeTable(tableIndex)"
            >
              删除数据表
            </el-button>
            <el-divider v-if="tableIndex !== config.data.length - 1" />
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="bottom-operation">
      <el-button
        type="success"
        @click="generatorStart"
      >
        生成文件
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {_mainTemplateTypeOption,_preloadTemplateTypeOption,_rendererTemplateTypeOption,_viewIndexTemplateTypeOption,_projectTemplateTypeOption} from '@renderer/config/constant'
import {d} from '@renderer/utils/common'
import {SQLTransOBJ} from '@renderer/utils/SQLTransOBJ'

import viewIndexDefault from '@static/images/viewIndex-default.png'
import viewIndexHongKai from '@static/images/viewIndex-hongkai.png'

const rendererViewIndexImageMap=ref({
  'default':viewIndexDefault,
  'hongkai':viewIndexHongKai,
})
const warningVisible=ref(false)
const mainTemplateTypeOption = ref(_mainTemplateTypeOption);
const preloadTemplateTypeOption = ref(_preloadTemplateTypeOption);
const rendererTemplateTypeOption = ref(_rendererTemplateTypeOption);
const viewIndexTemplateTypeOption=ref(_viewIndexTemplateTypeOption);
const projectTemplateTypeOption=ref(_projectTemplateTypeOption);
const columnType = ref([
  { label: 'INTEGER', value: 'INTEGER' },
  { label: 'TEXT', value: 'TEXT' },
]);

const config = ref({
  name: 'electron软件',
  projectTemplateType:"/resources/frame/0000",
  targetPath: 'C:/Users/22173/Desktop/test',
  mainTemplateType: 'default',
  preloadTemplateType: 'default',
  rendererTemplateType: 'default',
  data: [
    {
      viewIndexTemplateType: 'default',
      key: 'user',
      Key: 'User',
      name: '学生管理',
      column: [
        {
          name: 'id',
          primaryKey: true,
          allowNull:false,
          type: 'INTEGER'
        },
        {
          name: 'lastName',
          allowNull:true,
          primaryKey: false,
          type: 'TEXT'
        },
        {
          name: 'firstName',
          allowNull:true,
          primaryKey: false,
          type: 'TEXT'
        }
      ]
    }
  ]
});

const getPath = async() => {
  return await window.api.getPath();
};

const generatorStart =async  () => {
  const targetPath=await getPath()

  config.value.targetPath=targetPath
  config.value.data=config.value.data.map(element => {
    const str=element.key
    element.Key=str.charAt(0).toUpperCase() + str.slice(1);
    return element
  });
  console.log(config.value)
  window.api.generatorStart(d({
    config:config.value,
    callback:generatorProgress
  }));
};
const generatorProgress=(src,dest)=>{
  console.log(src,dest)
}
const load = () => {
  // Your loading logic here
};

const addTable = () => {
  config.value.data.push({
    viewIndexTemplateType: 'default',
    key: '',
    Key: '',
    name: '',
    column: [
      {
        name: '',
        primaryKey: false,
        allowNull:true,
        type: 'INTEGER' // or any default type
      }
    ]
  });
};
const importSqliteFile= async ()=>{
  const content= await window.api.getFileContent()

  config.value.data=SQLTransOBJ(content)
}
const removeTable = (tableIndex: number) => {
  if (config.value.data.length > 1) {
    config.value.data.splice(tableIndex, 1);
  }
};
const addColumn = (tableIndex) => {
  config.value.data[tableIndex].column.push(
      {
        name: '',
        primaryKey: false,
        type: 'INTEGER' // or any default type
      }
  
 );
};

const removeColumn = (tableIndex,columnIndex: number) => {
  if (config.value.data[tableIndex].column.length > 1) {
    config.value.data[tableIndex].column.splice(columnIndex, 1);
  }
};
onMounted(() => {
  load();
});
</script>

<style scoped lang="scss">
.el-input {
  --el-input-width: 220px;
}

.el-select {
  --el-select-width: 220px;
}
.column{
  display:flex;
  border:1px solid;
  overflow:auto;
  width:calc(100vw - 500px);
  >.column-item{
    min-width:400px;
  }
}

.bottom-operation{
  position:absolute;
  right:1rem;
  bottom:1rem;
}
.list-page-template{
  display:flex;
  &-image{
    border:1px solid;
    height:30px;
  }
}
.project-information{
  display:flex;width:100%;flex-wrap:wrap;
}
</style>
