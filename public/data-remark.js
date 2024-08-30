export default {
    "code": "200",
    "msg": "success",
    "data": {
        "tableId": 1,//审批id
        "workFlowDef": {
            "name": "合同审批",//审批名称
        },
        "directorMaxLevel": 4,//审批主管最大层级
        "flowPermission": [],//发起人
        "nodeConfig": {
            "nodeName": "发起人",//节点名称
            "nodeType": 1,// 1发起人 2 网关 3条件 4审批 5抄送人
            "priorityLevel": "",// 条件优先级
            "setType": "", 
            "nodeProperty": 5,// 审批人设置 1指定成员 2主管 3指定角色  5发起人自己 
            "directorLevel": "", //审批终点   第n层主管
            "signType": "", //多人审批时采用的审批方式 1依次审批 2会签
            "noHeaderAction": "",//审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员 
            "ccSelfSelectFlag": "", //允许发起人自选抄送人
            "conditionList": [], //当审批单同时满足以下条件时进入此流程
            "nodeApproveList": [], //操作人
            "childNode": {
                "nodeName": "审核人",
                "type": 1,
                "setType": 2,
                
                
                "directorLevel": 1,
                "signType": 1,
                "noHeaderAction": 2, 
                "childNode": {
                    "nodeName": "路由",
                    "type": 4,
                    "priorityLevel": 1,
                    "setType": 1,
                    
                    
                    "directorLevel": 1,
                    "signType": 1,
                    "noHeaderAction": 2,
                    
                    "ccSelfSelectFlag": 1,
                    "conditionList": [],
                    "nodeApproveList": [],
                    "childNode": {
                        "nodeName": "抄送人",
                        "type": 2,
                        "ccSelfSelectFlag": 1,
                        "childNode": null,
                        "nodeApproveList": [],
                        
                    },
                    "conditionNodes": [{ //条件节点
                        "nodeName": "条件1",
                        "type": 3,
                        "priorityLevel": 1, 
                        "setType": 1,
                        
                        
                        "directorLevel": 1,
                        "signType": 1,
                        "noHeaderAction": 2,
                        
                        "ccSelfSelectFlag": 1,
                        "isDefault": 0,
                        "conditionList": [{ //当前条件
                            "columnId": 0, //发起人
                            "type": 1, //1 发起人 2其他
                            "optType": "", //["", "<", ">", "≤", "=", "≥"][optType]
                            "zdy1": "",//左侧自定义内容
                            "zdy2": "",//右侧自定义内容
                            "opt1": "",//左侧符号 < ≤
                            "opt2": "",//右侧符号 < ≤
                            "columnDbname": "",//条件字段名称
                            "columnType": "",//条件字段类型
                            "showType": "",//3多选 其他
                            "showName": "",//展示名
                            "fixedDownBoxValue": ""//多选数组
                        }],
                        "nodeApproveList": [{
                            "targetId": 85,
                            "type": 1,
                            "name": "天旭"
                        }],
                        "childNode": {
                            "nodeName": "审核人",
                            "type": 1,
                            "priorityLevel": 1,
                            "setType": 1,
                            
                            
                            "directorLevel": 1,
                            "signType": 1,
                            "noHeaderAction": 2,
                            
                            "ccSelfSelectFlag": 1,
                            "conditionList": [],
                            "nodeApproveList": [{
                                "targetId": 2515744,
                                "type": 1,
                                "name": "哈哈哈哈"
                            }],
                            "childNode": null,
                            "conditionNodes": [],
                            
                        },
                        "conditionNodes": [],
                        
                    }, {
                        "nodeName": "条件2",
                        "type": 3,
                        "priorityLevel": 2,
                        "setType": 1,
                        
                        
                        "directorLevel": 1,
                        "signType": 1,
                        "noHeaderAction": 2,
                        
                        "ccSelfSelectFlag": 1,
                        "conditionList": [],
                        "nodeApproveList": [],
                        "childNode": null,
                        "conditionNodes": [],
                        "isDefault": 1,
                        
                    }]
                },
                "nodeApproveList": []
            },
            "conditionNodes": []
        }
    }
}