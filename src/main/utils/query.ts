// 通用查询操作辅助函数

import { Op } from "sequelize"

    const type=(descripator)=> {
        switch (descripator) {
            case 'lte':
                return Op.lte
            case 'lt':
                return Op.lt
            case 'gte':
                return Op.gte
            case 'gt':
                return Op.gt
            case 'contains':
                return Op.like
            case 'eq':
                return Op.eq
            // case 'orderby':
            //     return 'orderby';
            // case 'limit':
            //     return 'limit';
            // case 'offset':
            //     return 'offset';
            default:
                return Op.eq
        }
    }
export function queryData(data) {
    const specific = ['offset', 'limit', 'orderby']
    const query={}
    const where={}
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const tempArr = key.split('_')
                    let descripator = key
                    let target = key
                    if (tempArr.length > 1) {
                        descripator = tempArr[tempArr.length - 1]
                        target = key.replace('_' + descripator, '')
                    }
                    
                    if (specific.includes(descripator)) {
                        query[key]=data[key]
                    } else {
                         where[target]={ [type(descripator)]: data[key] };
                    }


                    
                }
    }
    query['where']=where
    return query
}