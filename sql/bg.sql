DROP TABLE IF EXISTS `bg_user`;
CREATE TABLE bg_user (
  `id`              BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at`       DATETIME     NOT NULL,
  `update_at`       DATETIME     NOT NULL,
  `delete_at`       DATETIME        DEFAULT NULL,
  `tel`             VARCHAR(30)  NOT NULL
  COMMENT '手机号码',
  `name`            VARCHAR(30)     DEFAULT NOT NULL
  COMMENT '真实姓名',
  `company_name`    VARCHAR(255) NOT NULL
  COMMENT '公司名',
  `work`            VARCHAR(255) NOT NULL
  COMMENT '职位',
  `email`           VARCHAR(255) NOT NULL
  COMMENT '邮箱',
  `head_img`        VARCHAR(255)    DEFAULT NULL
  COMMENT '头像路径',
  `password`        VARCHAR(255) NOT NULL
  COMMENT '密码',
  `salt`            VARCHAR(255) NOT NULL
  COMMENT '颜值',
  `last_login_time` DATETIME        DEFAULT NULL
  COMMENT '上次登录时间',
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (tel)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='用户表';


DROP TABLE IF EXISTS `bg_project`;
CREATE TABLE bg_project (
  `id`              BIGINT UNSIGNED                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           AUTO_INCREMENT,
  `create_at`       DATETIME        NOT NULL,
  `update_at`       DATETIME NOT NULL,
  `delete_at`       DATETIME                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               DEFAULT NULL,
  `project_name`    VARCHAR(255) NOT NULL
  COMMENT '项目名称',
  `project_bg`      VARCHAR(30)  NOT NULL
  COMMENT '项目背景',
  `project_summary` VARCHAR(255) NOT NULL
  COMMENT '项目描述',
  `project_room`    INTEGER      NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  DEFAULT 0
  COMMENT '项目空间 B为单位',
  `create_user_id`  BIGINT UNSIGNED NOT NULL
  COMMENT '创建人',
  `member_num`      BIGINT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 DEFAULT 0
  COMMENT '成员数量',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='项目表';

DROP TABLE IF EXISTS `bg_project_question`;
CREATE TABLE bg_project_question (
  `id`                BIGINT UNSIGNED  AUTO_INCREMENT,
  `create_at` DATETIME             NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `question_status` TINYINT NOT NULL DEFAULT 0
  COMMENT '问题状态',
  `question_priority` TINYINT NOT NULL
  COMMENT '问题优先级',
  `question_category` TINYINT NOT NULL
  COMMENT '问题类型',
  `create_user_id`    BIGINT UNSIGNED COMMENT '创建人',
  `pointer_user_id`   BIGINT UNSIGNED COMMENT '指派人',
  `finished_at`       DATETIME         DEFAULT NULL
  COMMENT '结束时间',
  `question_name`     VARCHAR(255) NOT NULL
  COMMENT '主题',
  `question_summary`  LONGTEXT         DEFAULT NULL
  COMMENT '问题描述',
  `project_id`        BIGINT UNSIGNED COMMENT '项目',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='项目问题表';
DROP TABLE IF EXISTS `bg_project_dynamic`;
CREATE TABLE bg_project_dynamic (
  `id`               BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME               NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `project_id` BIGINT UNSIGNED NOT NULL
  COMMENT '项目',
  `dynamic_category` VARCHAR(255) NOT NULL
  COMMENT '动态类别',
  `create_user_id`   BIGINT UNSIGNED NOT NULL
  COMMENT '创建人',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='项目动态表';

DROP TABLE IF EXISTS `bg_project_question_dynamic`;
CREATE TABLE bg_project_question_dynamic (
  `id`              BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME             NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `question_id` BIGINT UNSIGNED NOT NULL
  COMMENT '问题',
  `create_user_id` BIGINT UNSIGNED NOT NULL
  COMMENT '发表人',
  `update_category` VARCHAR(255)   NOT NULL
  COMMENT '动态类别',
  `update_content`  VARCHAR(255)   NOT NULL
  COMMENT '更新内容',
  `is_comment`      TINYINT        NOT NULL
  COMMENT '评论标示',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='问题动态表';

DROP TABLE IF EXISTS `bg_project_member`;
CREATE TABLE `bg_project_member` (
  `id`         BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME         NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `member_id` BIGINT UNSIGNED NOT NULL
  COMMENT '成员',
  `project_id` BIGINT UNSIGNED NOT NULL
  COMMENT '项目id',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='项目成员表';


DROP TABLE IF EXISTS `bg_project_member_invite`;
CREATE TABLE bg_project_member_invite (
  `id`         BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME         NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `key`       VARCHAR(255) NOT NULL
  COMMENT '邀请key',
  `project_id` BIGINT UNSIGNED NOT NULL
  COMMENT '问题',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='项目成员邀请表';


DROP TABLE IF EXISTS `bg_project_question_attachment`;
CREATE TABLE bg_project_question_attachment (
  `id`                  BIGINT UNSIGNED           AUTO_INCREMENT,
  `create_at` DATETIME                   NOT NULL,
  `update_at` DATETIME NOT NULL,
  `delete_at` DATETIME        DEFAULT NULL,
  `name`      VARCHAR(255) NOT NULL,
  `project_question_id` BIGINT UNSIGNED NOT NULL,
  `url`                 VARCHAR(255)    NOT NULL
  COMMENT '📎url',
  `sort`                TINYINT UNSIGNED NOT NULL DEFAULT 0
  COMMENT '排序',
  `uploader_id`         BIGINT UNSIGNED  NOT NULL
  COMMENT '上传者编号',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='附件表';


DROP TABLE IF EXISTS `bg_wiki`;
CREATE TABLE bg_wiki (
  `id`             BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME               NOT NULL,
  `update_at` DATETIME NOT NULL,
  `name`      VARCHAR(255)    DEFAULT NULL
  COMMENT 'wiki名称',
  `sort`      INT UNSIGNED DEFAULT 0 NOT NULL
  COMMENT '排序',
  `parent_id` BIGINT UNSIGNED DEFAULT NULL,
  `create_user_id` BIGINT UNSIGNED   NOT NULL
  COMMENT '创建人'
  COMMENT '上传者编号',
  `project_id`     BIGINT UNSIGNED   NOT NULL
  COMMENT '项目',
  `content`        LONGTEXT        DEFAULT NULL
  COMMENT '内容'
  COMMENT '知识点文档',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='wiki表';


DROP TABLE IF EXISTS `bg_model`;
CREATE TABLE `bg_model` (
  `id`         BIGINT UNSIGNED AUTO_INCREMENT,
  `create_at` DATETIME         NOT NULL,
  `update_at` DATETIME NOT NULL,
  `model_name` VARCHAR(255) NOT NULL
  COMMENT '模块名',
  `project_id` BIGINT UNSIGNED NOT NULL
  COMMENT '项目',
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COMMENT ='模块表';



