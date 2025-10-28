/*
 Navicat Premium Dump SQL

 Source Server         : mysql-dev
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : easykit:30308
 Source Schema         : authub

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 29/10/2025 00:19:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` bigint NOT NULL COMMENT '主键',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '邮箱',
  `username` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_time` datetime DEFAULT NULL COMMENT '最后活动时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '是否已删除',
  `enable` tinyint(1) DEFAULT '1' COMMENT '是否启用',
  `otp_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'OTP密钥',
  `otp_status` int DEFAULT '0' COMMENT 'OTP绑定状态: 0 未绑定 1 已绑定',
  `otp_enable_time` datetime DEFAULT NULL COMMENT 'OTP生效时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='账号';

-- ----------------------------
-- Table structure for account_token
-- ----------------------------
DROP TABLE IF EXISTS `account_token`;
CREATE TABLE `account_token` (
  `id` bigint NOT NULL COMMENT '主键',
  `account_id` bigint NOT NULL COMMENT '账号ID',
  `app_id` bigint NOT NULL COMMENT '应用ID',
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '刷新令牌',
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '访问令牌',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='账号授权';

-- ----------------------------
-- Table structure for app
-- ----------------------------
DROP TABLE IF EXISTS `app`;
CREATE TABLE `app` (
  `id` bigint NOT NULL COMMENT '应用ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '应用名称',
  `app_key` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '唯一标识',
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已删除',
  `owner_id` bigint NOT NULL COMMENT '创建人',
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'LOGO',
  `callback_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回调地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应用';

-- ----------------------------
-- Table structure for app_account
-- ----------------------------
DROP TABLE IF EXISTS `app_account`;
CREATE TABLE `app_account` (
  `id` bigint NOT NULL COMMENT '主键',
  `app_id` bigint NOT NULL COMMENT '应用ID',
  `account_id` bigint NOT NULL COMMENT '账号ID',
  `join_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `role` int DEFAULT '2' COMMENT '角色 1-管理员 2-成员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_id_account_id` (`app_id`,`account_id`) COMMENT '联合唯一'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应用账号';

SET FOREIGN_KEY_CHECKS = 1;
