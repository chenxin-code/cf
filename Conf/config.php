<?php
return array(

    //'配置项'=>'配置值'
    'APP_GROUP_LIST' => 'Home,Admin', //项目分组设定

    'DEFAULT_GROUP'  => '', //默认分组为空  这样url就不会自动省略掉分组名

    'LOGIN_KEY'=>'ls1gyhzc45g4',//混淆码（登录密钥）

    //'SHOW_PAGE_TRACE' =>true,//显示页面Trace信息

    'DEFAULT_FILTER' => 'trim,htmlspecialchars',//默认参数过滤方法 用于I()函数

    //默认错误跳转对应的模板文件
    'TMPL_ACTION_ERROR' => 'Public:error',

    //默认成功跳转对应的模板文件
    'TMPL_ACTION_SUCCESS' => 'Public:success',

    'ERROR_PAGE'=>'./error.html',//定义错误跳转页面URL地址

    'TMPL_EXCEPTION_FILE'=>'./error.html',//定义公共错误模板

    'URL_HTML_SUFFIX'=>'',//关闭URL伪静态功能   开发阶段最好使用此行代码  上线后可将此行代码注释掉

    'URL_CASE_INSENSITIVE' =>true,//实现URL访问不区分大小写

    //'URL_MODEL' => '2',//URL模式  (URL重写技术要求参数必须设置为2,但是设置为2后会发现验证码无法显示了)

    //'SESSION_AUTO_START' => false,

    'DB_PREFIX' => 'cf_', // 数据表前缀设定

    //连接数据库
    'DB_CONFIG4' => array(
        'db_type'  => 'mysql',
        'db_user'  => 'root',
        'db_pwd'   => '',
        'db_host'  => '127.0.0.1',
        'db_port'  => '3306',
        'db_name'  => 'cf'
    ),
);


