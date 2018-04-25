
class DynamicEnum {
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}

const dynamic = {
    QUESTION_STATUS: new DynamicEnum(
        '修改状态为',
        10),
    FINISHED_AT: new DynamicEnum(
        '修改结束时间为',
        11),
    QUESTION_PRIORITY: new DynamicEnum(
        '修改优先级为',
        12),
    QUESTION_SUMMARY: new DynamicEnum('修改问题描述', 13),
    QUESTION_NAME: new DynamicEnum('修改问题标题', 14),
    QUESTION_CATEGORY: new DynamicEnum('修改类型为', 15),
    POINTER_USER_ID: new DynamicEnum('指派给', 16),
    MODEL_NAME: new DynamicEnum('修改模块', 17),
    E_PROJECT: new DynamicEnum('退出了项目'),
    J_PROJECT: new DynamicEnum('加入了项目')

};




module.exports = dynamic;