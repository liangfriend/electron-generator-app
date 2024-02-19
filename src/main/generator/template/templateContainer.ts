//注册renderer中的文件夹
import controllerGenerator from './main/controller'
import migrationGenerator from './main/migration'
import modelsGenerator from './main/models'
import registerGenerator from './main/register'
import repositoryGenerator from './main/repository'
import serviceGenerator from './main/service'
import groupApiGenerator from './preload/groupApi'
import indexGenerator from './preload/index'
import layoutGenerator from './renderer/layout'
import groupRouterGenerator from './renderer/groupRouter'
import routerGenerator from './renderer/router'
import viewIndexGenerator from './renderer/viewIndex'


 const templateMainDefault= [
     controllerGenerator,
     migrationGenerator,
     modelsGenerator,
     registerGenerator,
     repositoryGenerator,
     serviceGenerator,
    
]

 const templatePreloadDefault:object[] = [
     groupApiGenerator,
     indexGenerator
]

 const templateRendererDefault:object[] = [
     layoutGenerator,
     routerGenerator,
     viewIndexGenerator,
     groupRouterGenerator
]

export const templateMainMap = new Map()
export const templatePreloadMap = new Map()
export const templateRendererMap = new Map()
templateMainMap.set('default', templateMainDefault)
templatePreloadMap.set('default',templatePreloadDefault)
templateRendererMap.set('default', templateRendererDefault)
