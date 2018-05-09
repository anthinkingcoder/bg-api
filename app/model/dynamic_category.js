
class DynamicEnum {
    constructor(message, status,name) {
        this.message = message;
        this.status = status;
        this.name = name;
    }
}

const dynamic = {
    QUESTION_STATUS: new DynamicEnum(
        '修改状态为',
        10,'QUESTION_STATUS'),
    FINISHED_AT: new DynamicEnum(
        '修改结束时间为',
        11,'FINISHED_AT'),
    QUESTION_PRIORITY: new DynamicEnum(
        '修改优先级为',
        12,'QUESTION_PRIORITY'),
    QUESTION_SUMMARY: new DynamicEnum('修改问题描述', 13,'QUESTION_SUMMARY'),
    QUESTION_NAME: new DynamicEnum('修改问题标题', 14,'QUESTION_NAME'),
    QUESTION_CATEGORY: new DynamicEnum('修改类型为', 15,'QUESTION_CATEGORY'),
    POINTER_USER_ID: new DynamicEnum('指派给', 16,'POINTER_USER_ID'),
    MODEL_ID: new DynamicEnum('修改模块', 17,'MODEL_ID'),
    E_PROJECT: new DynamicEnum('退出了项目',18),
    J_PROJECT: new DynamicEnum('加入了项目',19),
    C_PROJECT: new DynamicEnum('创建了项目',20)

};




module.exports = dynamic;