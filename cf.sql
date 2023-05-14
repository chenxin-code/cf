/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库连接
Source Server Version : 50520
Source Host           : 127.0.0.1:3306
Source Database       : cf

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-07-24 18:48:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cf_chat
-- ----------------------------
DROP TABLE IF EXISTS `cf_chat`;
CREATE TABLE `cf_chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL COMMENT 'userid为-1代表是站长所发聊天消息',
  `message` text NOT NULL COMMENT '聊天消息内容',
  `sendtime` int(10) unsigned NOT NULL COMMENT '发送聊天消息时间戳',
  `is_zhanzhang` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否为站长发的聊天消息（默认为0代表否  1代表是）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='聊天室聊天消息表';

-- ----------------------------
-- Records of cf_chat
-- ----------------------------

-- ----------------------------
-- Table structure for cf_depot
-- ----------------------------
DROP TABLE IF EXISTS `cf_depot`;
CREATE TABLE `cf_depot` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `cfdian` int(9) NOT NULL DEFAULT '0' COMMENT '当前CF点',
  `count` smallint(4) NOT NULL DEFAULT '0' COMMENT '武器总数',
  `juese_count` smallint(6) NOT NULL DEFAULT '0' COMMENT '角色总数',
  `v_count` smallint(4) NOT NULL DEFAULT '0' COMMENT 'V总数',
  `k_count` smallint(4) NOT NULL DEFAULT '0' COMMENT 'K(王者)总数',
  `shenpanzhe` tinyint(4) NOT NULL DEFAULT '0' COMMENT '审判者',
  `ling` tinyint(4) NOT NULL DEFAULT '0' COMMENT '零',
  `fuchouzhe` tinyint(4) NOT NULL DEFAULT '0' COMMENT '复仇者',
  `huoqilin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '火麒麟',
  `qilin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '麒麟',
  `wuying` tinyint(4) NOT NULL DEFAULT '0' COMMENT '无影',
  `heiwushi` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黑武士',
  `wangzhezhixin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '王者之心',
  `leishen` tinyint(4) NOT NULL DEFAULT '0' COMMENT '雷神',
  `heilong` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黑龙',
  `heiqishi` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黑骑士',
  `sishen` tinyint(4) NOT NULL DEFAULT '0' COMMENT '死神',
  `qianbian` tinyint(4) NOT NULL DEFAULT '0' COMMENT '千变',
  `meiguijingling` tinyint(4) NOT NULL DEFAULT '0' COMMENT '玫瑰精灵',
  `wangzhezhipo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '王者之魄',
  `jinniuzuo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '金牛座',
  `tianxiezuo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '天蝎座',
  `anjin94` tinyint(4) NOT NULL DEFAULT '0' COMMENT '暗金94',
  `anjing11` tinyint(4) NOT NULL DEFAULT '0' COMMENT '暗金G11',
  `huangjinsl` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黄金SL',
  `tianlong` tinyint(4) NOT NULL DEFAULT '0' COMMENT '天龙',
  `huimie` tinyint(4) NOT NULL DEFAULT '0' COMMENT '毁灭',
  `jiguang` tinyint(4) NOT NULL DEFAULT '0' COMMENT '极光',
  `wangzhezhili` tinyint(4) NOT NULL DEFAULT '0' COMMENT '王者之力',
  `wangzhezhinu` tinyint(4) NOT NULL DEFAULT '0' COMMENT '王者之怒',
  `lielong` tinyint(4) NOT NULL DEFAULT '0' COMMENT '烈龙',
  `zhengfuzhe` tinyint(4) NOT NULL DEFAULT '0' COMMENT '征服者',
  `panlong` tinyint(4) NOT NULL DEFAULT '0' COMMENT '盘龙',
  `canglei` tinyint(4) NOT NULL DEFAULT '0' COMMENT '苍雷',
  `xiuluo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '修罗',
  `wangzhezhihun` tinyint(4) NOT NULL DEFAULT '0' COMMENT '王者之魂',
  `tianchengzuo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '天秤座',
  `tulong` tinyint(4) NOT NULL DEFAULT '0' COMMENT '屠龙',
  `longxiao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '龙啸',
  `qingtian` tinyint(4) NOT NULL DEFAULT '0' COMMENT '擎天',
  `qilinci` tinyint(4) NOT NULL DEFAULT '0' COMMENT '麒麟刺',
  `longlin` tinyint(4) NOT NULL DEFAULT '0' COMMENT '龙鳞',
  `anjinyingzhua` tinyint(4) NOT NULL DEFAULT '0' COMMENT '暗金鹰爪',
  `jinzhuan` tinyint(4) NOT NULL DEFAULT '0' COMMENT '金砖',
  `huangjinjinggun` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黄金警棍',
  `ganjiangmoye` tinyint(4) NOT NULL DEFAULT '0' COMMENT '干将莫邪',
  `wuweizhimao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '无畏之矛',
  `shenhaijuqian` tinyint(4) NOT NULL DEFAULT '0' COMMENT '深海巨钳',
  `qinggang` tinyint(4) NOT NULL DEFAULT '0' COMMENT '清刚',
  `shenglizhiguang` tinyint(4) NOT NULL DEFAULT '0' COMMENT '胜利之光',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_depot
-- ----------------------------

-- ----------------------------
-- Table structure for cf_dianzan
-- ----------------------------
DROP TABLE IF EXISTS `cf_dianzan`;
CREATE TABLE `cf_dianzan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dianzan` varchar(50) NOT NULL COMMENT '点赞结果',
  `dianzantime` int(11) NOT NULL COMMENT '点赞时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='点赞结果记录表';

-- ----------------------------
-- Records of cf_dianzan
-- ----------------------------

-- ----------------------------
-- Table structure for cf_goods
-- ----------------------------
DROP TABLE IF EXISTS `cf_goods`;
CREATE TABLE `cf_goods` (
  `goodsid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `goodsname` varchar(30) NOT NULL,
  `depot_name` varchar(30) NOT NULL COMMENT '对应仓库里的字段名',
  `qb` smallint(6) NOT NULL COMMENT '原价QB',
  `cfdian` mediumint(9) NOT NULL COMMENT '原价CF点',
  `zhekou` tinyint(4) NOT NULL COMMENT '当前折扣（10折/9折/8折）',
  `desc` longtext NOT NULL COMMENT '描述',
  `logo` varchar(150) NOT NULL DEFAULT '' COMMENT '图片',
  `number` tinyint(3) unsigned NOT NULL COMMENT '库存量',
  PRIMARY KEY (`goodsid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_goods
-- ----------------------------
INSERT INTO `cf_goods` VALUES ('1', '审判者（永久）', 'shenpanzhe', '408', '40800', '10', '角色特点：①应急攻击②暗影利刃③灵魂武者④挑战模式移动增加⑤经验增加200%⑥同房间玩家经验值增加30%⑦同房间玩家GP增加20%', '/Statics/image/shop_image/shenpanzhe.png', '2');
INSERT INTO `cf_goods` VALUES ('2', '零（永久）', 'ling', '408', '40800', '10', '情报部队培养的特殊要员，拥有几乎无敌的战斗能力，传奇故事在全世界佣兵之间广为流传', '/Statics/image/shop_image/ling.png', '2');
INSERT INTO `cf_goods` VALUES ('3', '火麒麟（永久）', 'huoqilin', '888', '88800', '10', '整个枪身与火麒麟完美相融，是勇士不可或缺的神器，极具收藏价值', '/Statics/image/shop_image/huoqilin.png', '2');
INSERT INTO `cf_goods` VALUES ('4', '麒麟（永久）', 'qilin', '688', '68800', '10', '整个枪身装备了麒麟的装甲，同时前端加装了锋利的麒麟刺，是一把外观与性能并重的武器', '/Statics/image/shop_image/qilin.png', '2');
INSERT INTO `cf_goods` VALUES ('5', '无影（永久）', 'wuying', '888', '88800', '10', '银色的枪身闪耀着点点寒光，如受风神加护的利刃，静待着猎物的到来', '/Statics/image/shop_image/wuying.png', '2');
INSERT INTO `cf_goods` VALUES ('6', '黑武士（永久）', 'heiwushi', '888', '88800', '10', '增加了野兽样式，霸气威武', '/Statics/image/shop_image/heiwushi.png', '2');
INSERT INTO `cf_goods` VALUES ('7', '雷神（永久）', 'leishen', '888', '88800', '10', '整个枪身有蓝色的闪电环绕，犹如雷神下凡一般，摧毁一切与之对抗的敌人', '/Statics/image/shop_image/leishen.png', '2');
INSERT INTO `cf_goods` VALUES ('8', '黑龙（永久）', 'heilong', '888', '88800', '10', '整个枪身与一条黑龙完美相融，具有极高的战斗属性', '/Statics/image/shop_image/heilong.png', '2');
INSERT INTO `cf_goods` VALUES ('9', '黑骑士（永久）', 'heiqishi', '888', '88800', '10', '冷酷的黑色盔甲，若隐若现的红色微光，如黑夜中的骑士一般静静的等待出征', '/Statics/image/shop_image/heiqishi.png', '2');
INSERT INTO `cf_goods` VALUES ('10', '死神（永久）', 'sishen', '888', '88800', '10', '此枪一出，犹如冥界死神降临，横扫一切战场敌人', '/Statics/image/shop_image/sishen.png', '3');
INSERT INTO `cf_goods` VALUES ('11', '玫瑰精灵（永久）', 'meiguijingling', '468', '46800', '10', '枪身上跃动的玫瑰精灵会为战士们带来胜利的祝福', '/Statics/image/shop_image/meiguijingling.png', '3');
INSERT INTO `cf_goods` VALUES ('12', '天龙（永久）', 'tianlong', '688', '68800', '10', '整个枪身被一条飞翔的银龙缠绕，同时龙的头部成为了狙击的瞄准镜，整个武器与银龙图案完美相融，极具收藏价值', '/Statics/image/shop_image/tianlong.png', '3');
INSERT INTO `cf_goods` VALUES ('13', '毁灭（永久）', 'huimie', '888', '88800', '10', '暗黑与深红相间的枪身预示着毁灭一切的力量', '/Statics/image/shop_image/huimie.png', '1');
INSERT INTO `cf_goods` VALUES ('14', '极光（永久）', 'jiguang', '888', '88800', '10', '基本构造相同，但外型改造成了鲨鱼流线感觉', '/Statics/image/shop_image/jiguang.png', '1');
INSERT INTO `cf_goods` VALUES ('15', '烈龙（永久）', 'lielong', '488', '48800', '10', '枪身被一只飞翔的银龙缠绕，超大的携弹量，霸气的外观，绝对是收藏的不二选择', '/Statics/image/shop_image/lielong.png', '3');
INSERT INTO `cf_goods` VALUES ('16', '盘龙（永久）', 'panlong', '488', '48800', '10', '枪身盘绕着一条闪耀的银龙，是一把性能与外观并重的武器', '/Statics/image/shop_image/panlong.png', '3');
INSERT INTO `cf_goods` VALUES ('17', '苍雷（永久）', 'canglei', '258', '25800', '10', '第一把专为挑战模式设计的武器', '/Statics/image/shop_image/canglei.png', '6');
INSERT INTO `cf_goods` VALUES ('18', '修罗（永久）', 'xiuluo', '408', '40800', '10', '如墨般沉郁的枪身中跃动着血色的修罗魂，它每一次出现都将用它的子弹和利刃惩罚敌人', '/Statics/image/shop_image/xiuluo.png', '4');
INSERT INTO `cf_goods` VALUES ('19', '屠龙（永久）', 'tulong', '498', '49800', '10', '暗金色的龙骨刀身，鲜红的龙爪握把，这是屠龙勇者的神兵', '/Statics/image/shop_image/tulong.png', '3');
INSERT INTO `cf_goods` VALUES ('20', '龙啸（永久）', 'longxiao', '498', '49800', '10', '传说中盘古创造世界所使用的神器，拥有开天辟地的神力', '/Statics/image/shop_image/longxiao.png', '2');
INSERT INTO `cf_goods` VALUES ('21', '擎天（永久）', 'qingtian', '498', '49800', '10', '一共结合十余种致命武器于一身，传说是威力惊人胜过任何武器十倍的杀人利器', '/Statics/image/shop_image/qingtian.png', '1');

-- ----------------------------
-- Table structure for cf_goods_buy
-- ----------------------------
DROP TABLE IF EXISTS `cf_goods_buy`;
CREATE TABLE `cf_goods_buy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `buy` varchar(50) NOT NULL COMMENT '购买信息',
  `buytime` int(10) unsigned NOT NULL COMMENT '购买时间戳',
  `zhekou` varchar(5) NOT NULL COMMENT '购买时的折扣（-/9折/8折）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购买信息记录表';

-- ----------------------------
-- Records of cf_goods_buy
-- ----------------------------

-- ----------------------------
-- Table structure for cf_guaguale
-- ----------------------------
DROP TABLE IF EXISTS `cf_guaguale`;
CREATE TABLE `cf_guaguale` (
  `userid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `jifen` smallint(4) NOT NULL DEFAULT '0' COMMENT '当前积分',
  `guaguaka` smallint(4) NOT NULL DEFAULT '0' COMMENT '当前刮刮卡数量',
  `guaka_count` smallint(4) NOT NULL DEFAULT '0' COMMENT '当前刮卡次数',
  `pay` smallint(4) NOT NULL DEFAULT '0' COMMENT '刮刮乐活动一共花费QB',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_guaguale
-- ----------------------------

-- ----------------------------
-- Table structure for cf_guaguale_chongzhi
-- ----------------------------
DROP TABLE IF EXISTS `cf_guaguale_chongzhi`;
CREATE TABLE `cf_guaguale_chongzhi` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `chongzhi1` varchar(50) NOT NULL COMMENT '花费QB充值CF点',
  `chongzhi2` varchar(50) NOT NULL COMMENT '赠送刮刮卡',
  `chongzhitime` int(11) NOT NULL COMMENT '充值时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='充值记录表';

-- ----------------------------
-- Records of cf_guaguale_chongzhi
-- ----------------------------

-- ----------------------------
-- Table structure for cf_guaguale_duihuan
-- ----------------------------
DROP TABLE IF EXISTS `cf_guaguale_duihuan`;
CREATE TABLE `cf_guaguale_duihuan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `duihuan` varchar(50) NOT NULL COMMENT '兑换信息',
  `duihuantime` int(11) NOT NULL COMMENT '兑换时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='兑换记录表';

-- ----------------------------
-- Records of cf_guaguale_duihuan
-- ----------------------------

-- ----------------------------
-- Table structure for cf_guaguale_guaka
-- ----------------------------
DROP TABLE IF EXISTS `cf_guaguale_guaka`;
CREATE TABLE `cf_guaguale_guaka` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `guaka` varchar(50) NOT NULL COMMENT '刮卡结果',
  `guakatime` int(11) NOT NULL COMMENT '刮卡时间戳',
  `guakaobj` varchar(50) NOT NULL COMMENT '刮卡对象',
  `is_gonggao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '刮卡结果是否公告(默认小奖为0不公告,大奖为1要公告)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='刮卡结果记录表';

-- ----------------------------
-- Records of cf_guaguale_guaka
-- ----------------------------

-- ----------------------------
-- Table structure for cf_manager
-- ----------------------------
DROP TABLE IF EXISTS `cf_manager`;
CREATE TABLE `cf_manager` (
  `managerid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `managername` varchar(50) NOT NULL,
  `password` char(32) NOT NULL,
  PRIMARY KEY (`managerid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_manager
-- ----------------------------
INSERT INTO `cf_manager` VALUES ('1', 'cx', '2f2cac77040efbbf0fc9e547c7a9ee99');

-- ----------------------------
-- Table structure for cf_notice
-- ----------------------------
DROP TABLE IF EXISTS `cf_notice`;
CREATE TABLE `cf_notice` (
  `noticeid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '内容',
  PRIMARY KEY (`noticeid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='几个页面的右下角说明/告示/公告内容';

-- ----------------------------
-- Records of cf_notice
-- ----------------------------
INSERT INTO `cf_notice` VALUES ('1', '首页公告：①本网站数据与CF游戏数据毫无关系，玩家请自慰②点赞是获取QB的唯一渠道③首次点赞必得100QB，以后每次点赞随机获得10~100QB④每分钟只能点赞1次⑤QB属于虚拟货币，可用于在游戏商城消费或参与活动⑥K代表王者（王者可通过刮刮乐活动获得）');
INSERT INTO `cf_notice` VALUES ('2', '占卜活动说明：①警告示语表示该神器必出现在3张卡牌中之一②因作者水平有限，期限道具及其分解CF点和发送仓库功能暂不能实现，改为直接获得卡牌对应CF点③概率1/3？你太天真了！');
INSERT INTO `cf_notice` VALUES ('3', '刮刮乐活动说明：①刮卡有几率获得积分或对应神器②凭积分也可兑换相应的神器③良心活动，保底充值CF点，所以绝对不亏！④王者是个坑！请慎入！');
INSERT INTO `cf_notice` VALUES ('4', '生财宝箱活动说明：①开启生财宝箱可随机获得指定的CF点②中奖次数泛指获得66600CF点或88800CF点的次数③保底1000CF点，绝对不亏的抽奖活动！');
INSERT INTO `cf_notice` VALUES ('5', '商城告示：①不定期限量打8,9折促销②库存有限，不定期对已下架的商品进货');
INSERT INTO `cf_notice` VALUES ('6', '站长公告：欢迎来到首页！');
INSERT INTO `cf_notice` VALUES ('7', '聊天室说明：①点击用户头像可以查看对应的游戏仓库②站长（会有特殊标记）也会进入聊天室');

-- ----------------------------
-- Table structure for cf_shengcaibaoxiang
-- ----------------------------
DROP TABLE IF EXISTS `cf_shengcaibaoxiang`;
CREATE TABLE `cf_shengcaibaoxiang` (
  `userid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `yaoshi` smallint(255) NOT NULL DEFAULT '0' COMMENT '当前钥匙数量',
  `zhongjiang_count` smallint(6) NOT NULL DEFAULT '0' COMMENT '中奖次数（获得66600CF点或88800CF点的次数）',
  `kaixiang_count` smallint(6) NOT NULL DEFAULT '0' COMMENT '当前开箱次数',
  `spend` smallint(6) NOT NULL DEFAULT '0' COMMENT '生财宝箱活动一共消费QB',
  `leijihuode_cfdian` mediumint(9) NOT NULL DEFAULT '0' COMMENT '累计开箱获得的CF点',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_shengcaibaoxiang
-- ----------------------------

-- ----------------------------
-- Table structure for cf_shengcaibaoxiang_goumai
-- ----------------------------
DROP TABLE IF EXISTS `cf_shengcaibaoxiang_goumai`;
CREATE TABLE `cf_shengcaibaoxiang_goumai` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `goumai` varchar(50) NOT NULL COMMENT '消费QB购买钥匙',
  `goumaitime` int(11) NOT NULL COMMENT '购买时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购买记录表';

-- ----------------------------
-- Records of cf_shengcaibaoxiang_goumai
-- ----------------------------

-- ----------------------------
-- Table structure for cf_shengcaibaoxiang_kaixiang
-- ----------------------------
DROP TABLE IF EXISTS `cf_shengcaibaoxiang_kaixiang`;
CREATE TABLE `cf_shengcaibaoxiang_kaixiang` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `kaixiang` varchar(50) NOT NULL COMMENT '开箱结果',
  `kaixiangtime` int(11) NOT NULL COMMENT '开箱时间戳',
  `is_gonggao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '开箱结果是否公告(默认获得小额CF点为0不公告,获得66600CF点或88800CF点为1要公告)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='开箱结果记录表';

-- ----------------------------
-- Records of cf_shengcaibaoxiang_kaixiang
-- ----------------------------

-- ----------------------------
-- Table structure for cf_user
-- ----------------------------
DROP TABLE IF EXISTS `cf_user`;
CREATE TABLE `cf_user` (
  `userid` smallint(255) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` char(32) NOT NULL,
  `showpassword` varchar(30) NOT NULL COMMENT '用户登录密码（后台查看）',
  `loginroot` tinyint(4) NOT NULL DEFAULT '1' COMMENT '登录权限',
  `qb` mediumint(6) NOT NULL DEFAULT '0' COMMENT '当前QB',
  `leijihuode_qb` mediumint(9) NOT NULL DEFAULT '0' COMMENT '累计获得QB（点赞是获得QB的唯一渠道）',
  `dianzancount` mediumint(6) NOT NULL DEFAULT '0' COMMENT '点赞次数',
  `lastdianzantime` int(11) NOT NULL DEFAULT '0' COMMENT '上次点赞时间戳',
  `dianzanroot` tinyint(4) NOT NULL DEFAULT '1' COMMENT '点赞权限',
  `chatroot` tinyint(4) NOT NULL DEFAULT '1' COMMENT '聊天权限',
  `registertime` int(11) NOT NULL COMMENT '注册时间戳',
  `head` varchar(60) NOT NULL DEFAULT '/Statics/head/moren.png' COMMENT '头像图片的路径',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of cf_user
-- ----------------------------

-- ----------------------------
-- Table structure for cf_zhanbu
-- ----------------------------
DROP TABLE IF EXISTS `cf_zhanbu`;
CREATE TABLE `cf_zhanbu` (
  `userid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `zhanbuqiu` smallint(4) NOT NULL DEFAULT '0' COMMENT '当前占卜球数量',
  `zhongjiang_count` smallint(4) NOT NULL DEFAULT '0' COMMENT '中奖次数',
  `fanpai_count` smallint(4) NOT NULL DEFAULT '0' COMMENT '翻牌次数',
  `cost` smallint(4) NOT NULL DEFAULT '0' COMMENT '占卜活动一共消费QB',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cf_zhanbu
-- ----------------------------

-- ----------------------------
-- Table structure for cf_zhanbu_fanpai
-- ----------------------------
DROP TABLE IF EXISTS `cf_zhanbu_fanpai`;
CREATE TABLE `cf_zhanbu_fanpai` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fanpai` varchar(50) NOT NULL COMMENT '翻牌结果',
  `fanpaitime` int(11) NOT NULL COMMENT '翻牌时间戳',
  `fanpaiobj` varchar(4) NOT NULL COMMENT '翻牌对象（卡牌1,卡牌2,卡牌3）',
  `fanpaimubiao` varchar(30) NOT NULL COMMENT '翻牌目标(警告出现的是什么V)',
  `is_gonggao` tinyint(4) NOT NULL DEFAULT '0' COMMENT '翻牌结果是否公告(默认小奖为0不公告,中V为1要公告)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='翻牌结果记录表';

-- ----------------------------
-- Records of cf_zhanbu_fanpai
-- ----------------------------

-- ----------------------------
-- Table structure for cf_zhanbu_goumai
-- ----------------------------
DROP TABLE IF EXISTS `cf_zhanbu_goumai`;
CREATE TABLE `cf_zhanbu_goumai` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `goumai` varchar(50) NOT NULL COMMENT '消费QB购买占卜球',
  `goumaitime` int(11) NOT NULL COMMENT '购买时间戳',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购买记录表';

-- ----------------------------
-- Records of cf_zhanbu_goumai
-- ----------------------------
