<?php

class LoginAction extends Action {

    //登录
    public function login(){

        //session_set_cookie_params(10);
        //dump($_SESSION);exit;
        //echo "我进来了!!";

        //ini_set('session.save_path', 'C:/Users/Administrator/Desktop/1234/');

        //判断是否已登录  (判断是否有其它用户登录或者判断当前用户是否已登录)
        if($_SESSION['ok'])
        {
            redirect('index',2,'用户'.$_SESSION['ok']['username'].'已登录!正在跳转至首页......');
        }
        else
        {
            //如果用户提交了表单
            if(IS_POST){

                //dump($_SESSION);exit;
                //dump($_POST);
                //$username=$_POST['username'];//dump($username);
                $username=I('post.username');
                //$password=$_POST['password'];
                $password=I('post.password');
                //$yzm=$_POST['yzm'];
                $yzm=I('post.yzm');
                //如果输入信息有1行为空   则失败
                if(!$username||!$password||!$yzm)
                {
                    if($username==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
                    {
                        $this->error('非法输入！',U('login'));
                    }
                    elseif($password==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
                    {
                        $this->error('非法输入！',U('login'));
                    }
                    elseif($yzm==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
                    {
                        $this->error('非法输入！',U('login'));
                    }
                    else
                    {
                        $this->error('请输入完整的信息!',U('login'));
                    }
                }
                else
                {
                    //判断登录信息是否为纯空格
                    if(ctype_space($username)||ctype_space($password)||ctype_space($yzm))
                    {
                        $this->error('登录信息不能为纯空格!',U('login'));
                    }
                    else
                    {
                        //校验验证码
                        if($_SESSION['verify'] != md5($yzm))
                        {
                            $this->error('验证码错误!',U('login'));
                        }
                        else
                        {
                            $data=D('User')->check($username,md5($password.C('LOGIN_KEY')));
                            //dump($data);exit;
                            //校验用户名和密码
                            if($data)
                            {
                                //获取用户的登录权限
                                $loginroot=$data['loginroot'];
                                //$loginroot=D('User')->where("username=$username")->getField('loginroot');
                                //判断用户是否有登录权限
                                if($loginroot==1)
                                {

                                    $_SESSION['ok']=$data;//dump($data);exit;

                                    //session(array('name'=>$_SESSION['ok'],'expire'=>3600),$data);

                                    redirect('index',1,'登录成功!正在跳转至首页......');


                                }
                                else
                                {
                                    $this->error('对不起 该用户已被后台管理员设置为禁止登录',U('login'));
                                }

                            }
                            else
                            {
                                $this->error('用户名或密码错误!',U('login'));
                            }
                        }

                    }

                }


            }


            $this->display();//展示登录界面
        }


    }

    //注销用户
    public function logout()
    {

        //先判断是否有登录权限
        $loginroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('loginroot');
        if($loginroot&&$loginroot==0)
        {
            unset($_SESSION['ok']);
            $unset=1;//区分提示信息
        }

        //访问该页面前先判断用户是否登录
        if($_SESSION['ok'])
        {
            unset($_SESSION['ok']);

            redirect('login',3,'注销用户成功!');
        }
        else
        {
            if($unset==1)
            {
                redirect('login',4,'你的手动注销失败!   你的账号已经被停封  系统将自动强制注销你的用户......');
            }
            else
            {
                $this->error('非法操作!',U('login'));
            }

        }

    }

    //设置头像
    public function head(){


        //先判断是否有登录权限
        $loginroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('loginroot');
        if($loginroot&&$loginroot==0)
        {
            unset($_SESSION['ok']);
            //unset($_SESSION['go']);
            $unset=1;//区分提示信息
        }

        //访问该页面前先判断用户是否登录
        if($_SESSION['ok'])
        {
            if(IS_POST)
            {
                //dump($_POST);dump($_FILES);die;
                import('ORG.Net.UploadFile');
                /*
                 * TP框架底层源码
                 * （复制粘贴过来的）
                 * 用于判断图像文件是否真的是一张图片
                 *
                // 如果是图像文件 检测文件格式
                if( in_array(strtolower($file['extension']),array('gif','jpg','jpeg','bmp','png','swf'))) {
                $info   = getimagesize($file['tmp_name']);
                if(false === $info || ('gif' == strtolower($file['extension']) && empty($info['bits']))){
                $this->error = '非法图像文件';
                return false;
                }
                }
                */
                $upload = new UploadFile();// 实例化上传类
                $upload->maxSize  = 3145728 ;// 设置附件上传大小
                $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
                $upload->savePath =  './Statics/head/';// 设置附件上传目录
                $upload->thumb = true;//是否需要对图片文件进行缩略图处理
                $upload->thumbMaxWidth = '50';//缩略图的宽度
                $upload->thumbMaxHeight = '50';//缩略图的高度
                $upload->thumbRemoveOrigin = true;//生成缩略图后要删除原图

                if(!$upload->upload())
                {
                    // 上传错误提示错误信息
                    $this->error($upload->getErrorMsg(), U('head'));
                }
                else
                {
                    // 上传成功 获取上传文件信息
                    $info = $upload->getUploadFileInfo();
                    //dump($info);die;
                    $data1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');//获取原头像的路径
                    if($data1=='/Statics/head/moren.png')
                    {
                        //系统默认头像不能删除，这里无代码
                    }
                    else
                    {
                        unlink('.'.$data1);//根据原头像的路径删除原头像图片（前面还要多加一个点）
                    }
                    $data2=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->setField('head','/Statics/head/thumb_'.$info[0]['savename']);
                    if($data2)
                    {
                        //$this->success('上传头像成功！', U('head'));
                        redirect('head',1,'上传头像成功！');
                    }
                    else
                    {
                        //$this->error('上传头像失败！', U('head'));
                        redirect('head',1,'上传头像失败！');
                    }
                }

                /*// 保存表单数据 包括附件数据
                $User = M("User"); // 实例化User对象
                $User->create(); // 创建数据对象
                $User->photo = $info[0]['savename']; // 保存上传的照片根据需要自行组装
                $User->add(); // 写入用户数据到数据库
                $this->success('数据保存成功！');*/


                

                /*// 接收表单，根据模型中定义的规则验证表单
                // 第二个参数：1.添加 2.修改
                if(D('User')->create(I('post.'), 2))
                {
                    // 表单中的数据插入到数据库中
                    if(FALSE !== D('User')->save())
                    {
                        $this->success('上传头像成功！', U('head'));
                        // 停止后面代码的执行
                        exit;
                    }
                }
                // 获取失败的原因
                $error = D('User')->getError();
                $this->error($error, U('head'));*/
            }

            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');
            $this->assign('head',$head);
            
            $this->display();
        }
        else
        {
            if($unset==1)
            {
                redirect('login',5,'不允许设置头像!   你的账号已经被停封  系统将强制注销你的用户......');
            }
            else
            {
                $this->error('你还没有登录!',U('login'));
            }

        }
    }

    //修改密码
    public function update(){


        //先判断是否有登录权限
        $loginroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('loginroot');
        if($loginroot&&$loginroot==0)
        {
            unset($_SESSION['ok']);
            //unset($_SESSION['go']);
            $unset=1;//区分提示信息
        }

        //访问该页面前先判断用户是否登录
        if($_SESSION['ok'])
        {
            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');
            $this->assign('head',$head);
            $this->display();//载入修改密码页面
        }
        else
        {
            if($unset==1)
            {

                redirect('login',5,'不允许修改密码!   你的账号已经被停封  系统将强制注销你的用户......');
            }
            else
            {
                $this->error('你还没有登录!',U('login'));
            }

        }
    }

    //ajax修改密码
    public function ajaxupdate(){
        
        //$password0=$_POST['password0'];
        $password0=I('post.password0');
        //$password1=$_POST['password1'];
        $password1=I('post.password1');
        //$password2=$_POST['password2'];
        $password2=I('post.password2');
        //$yzm=$_POST['yzm'];
        $yzm=I('post.yzm');


        //如果有1行为空   则失败
        if(!$password0||!$password1||!$password2||!$yzm)
        {
            //$this->error('信息无效 请重试',U('update'));
            echo "信息无效 请重试";
        }
        else
        {

            //判断输入的信息是否为纯空格
            if(ctype_space($password0)||ctype_space($password1)||ctype_space($password2)||ctype_space($yzm))
            {
                //$this->error('输入的信息不能为纯空格!',U('update'));
                echo "输入的信息不能为纯空格!";
            }
            else
            {
                //校验验证码
                if($_SESSION['verify'] != md5($yzm))
                {
                    //$this->error('验证码错误!',U('update'));
                    echo "验证码错误!";
                }
                else
                {
                    if(strlen($password1)>16||strlen($password2)>16)
                    {
                        echo "新密码长度不能超过16位";
                    }
                    elseif(strlen($password1)<6||strlen($password2)<6)
                    {
                        echo "新密码长度不能低于6位";
                    }
                    else
                    {
                        $data1=D('User')->check($_SESSION['ok']['username'],md5($password0.C('LOGIN_KEY')));

                        //判断用户输入的当前密码是否正确
                        if($data1)
                        {

                            //新密码是否一致
                            if($password1==$password2){

                                //新密码不能与原密码相同
                                if($password1==$password0)
                                {
                                    //$this->error('新密码不能与原密码一致!',U('update'));
                                    echo "新密码不能与原密码一致!";
                                }
                                else
                                {
                                    //echo "执行改密代码";exit;

                                    //改密代码

                                    $password1=md5($password1.C('LOGIN_KEY'));//混淆码md5()加密

                                    //修改记录密码
                                    //最好开启事务模式！！！！！！
                                    $data2=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->setField('password',$password1);
                                    $data3=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->setField('showpassword',$password2);
                                    //echo $data;exit;
                                    if($data2&&$data3)
                                    {
                                        unset($_SESSION['ok']);
                                        //unset($_SESSION['go']);


                                        //$this->success('恭喜你! 修改密码成功 系统将自动注销该用户 请重新登录!',U('login'));
                                        //redirect('login',5,'恭喜你! 修改密码成功 系统将自动注销该用户 请重新登录!');
                                        echo "恭喜你! 修改密码成功 系统将自动注销该用户 请重新登录!";

                                    }
                                    else
                                    {
                                        //$this->error('操作失败! 请重试!',U('update'));
                                        echo "操作失败! 请重试!";
                                    }
                                }

                            }
                            else
                            {
                                //$this->error('新密码不一致 请重试',U('update'));
                                echo "新密码不一致 请重试";
                            }

                        }

                        else
                        {
                            //$this->error('当前密码错误!',U('update'));
                            echo "当前密码错误!";
                        }
                    }

                }

            }

        }

        
    }

    //首页
    public function index(){


        //dump($_GET);
        //dump($_SESSION['ok']);die;
        //先判断是否有登录权限
        $loginroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('loginroot');
        //dump($loginroot);exit;
        if($loginroot&&$loginroot==0)//这里因逻辑需求 没有!
        {
            unset($_SESSION['ok']);
            //unset($_SESSION['go']);
            $unset=1;//区分提示信息
        }


        //访问该页面前先判断用户是否登录
        if($_SESSION['ok'])
        {
            $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');

            $count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('count');
            $v_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('v_count');
            $k_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('k_count');
            $juese_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('juese_count');
            
            $leijihuode_qb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('leijihuode_qb');
            $dianzancishu=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('dianzancount');
            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');

            $totledianzancishu=D('Dianzan')->count();

            $shouyegonggao=D('Notice')->where(array('noticeid'=>1))->getField('content');
            //$zhanzhanggonggao=D('Notice')->where(array('noticeid'=>6))->getField('content');

            $this->assign('myqb',$myqb);
            $this->assign('mycfdian',$mycfdian);
            $this->assign('leijihuode_qb',$leijihuode_qb);
            $this->assign('totledianzancishu',$totledianzancishu);
            $this->assign('dianzancishu',$dianzancishu);
            $this->assign('count',$count);
            $this->assign('v_count',$v_count);
            $this->assign('k_count',$k_count);
            $this->assign('juese_count',$juese_count);
            $this->assign('head',$head);
            $this->assign('shouyegonggao',$shouyegonggao);
            //$this->assign('zhanzhanggonggao',$zhanzhanggonggao);
            
            
            $this->display();


        }
        else
        {
            if($unset==1)
            {
                //$this->error('你已被后台管理员设置为禁止登录  系统将强制注销你的用户......',U('login'));
                redirect('login',4,'你的账号已经被停封 系统将强制注销你的用户 若有疑问请与站长联系');
            }
            else
            {
                if($_SESSION['ri']==1)
                {
                    unset($_SESSION['ri']);

                    redirect('login',0);
                }
                else
                {
                    $this->error('你还没有登录!',U('login'));
                }
                //$this->error('你还没有登录!',U('login'));
            }

        }

    }

    //ajax获取站长公告
    public function getZhanZhangGongGao(){
        //echo "OK";
        $zhanzhanggonggao=D('Notice')->where(array('noticeid'=>6))->getField('content');
        echo $zhanzhanggonggao;
    }

    //注册
    public function register(){

        if($_SESSION['ok'])
        {
            redirect('index',2,'用户'.$_SESSION['ok']['username'].'已登录!正在跳转至首页......');
        }
        else
        {
            //echo '<script type="text/javascript">setTimeout(\'window.location.href="'.U('login').'";\',4000);</script>';

            $this->display();
        }

    }

    //ajax注册
    public function ajaxregister(){


        //dump(IS_AJAX);die;
        /*if(IS_AJAX)
        {
            echo "测试一下1";
        }
        else
        {
            echo "测试一下2";
        }

        die;*/


        //I(‘get.name’);  ==>     htmlspeicalchars($_GET[‘name’]);
        //I(‘post.name’);  ==>    htmlspeicalchars($_POST[‘name’]);

        //$username=$_POST['username'];
        $username=I('post.username');
        //$password1=$_POST['password1'];
        $password1=I('post.password1');
        //$password2=$_POST['password2'];
        $password2=I('post.password2');
        //$yzm=$_POST['yzm'];
        $yzm=I('post.yzm');

        //如果注册信息有1行为空   则失败
        if(!$username||!$password1||!$password2||!$yzm)
        {
            if($username==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
            {
                echo "用户名长度违规！";
            }
            elseif($password1==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
            {
                echo "密码长度不能低于6位";
            }
            elseif($password2==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
            {
                echo "密码长度不能低于6位";
            }
            elseif($yzm==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
            {
                echo "验证码错误!";
            }
            else
            {
                echo "注册信息无效 请重试";
            }
        }
        else
        {

            //判断注册信息是否为纯空格
            if(ctype_space($username)||ctype_space($password1)||ctype_space($password2)||ctype_space($yzm))
            {
                //$this->error('注册信息不能为纯空格!',U('register'));
                echo "注册信息不能为纯空格!";
            }
            else
            {
                //校验验证码
                if($_SESSION['verify'] != md5($yzm))
                {
                    //$this->error('验证码错误!',U('register'));
                    echo "验证码错误!";
                }
                else
                {
                    if(strlen($password1)>16||strlen($password2)>16)
                    {
                        echo "密码长度不能超过16位";
                    }
                    elseif(strlen($password1)<6||strlen($password2)<6)
                    {
                        echo "密码长度不能低于6位";
                    }
                    else
                    {
                        if(strlen($username)>40||strlen($username)<2)
                        {
                            echo "用户名长度违规！";
                        }
                        else
                        {
                            if(strstr($username,'SB')||strstr($username,'sb')||strstr($username,'Sb')||strstr($username,'sB')
                                ||strstr($username,'傻')||strstr($username,'日')||strstr($username,'猪')||strstr($username,'狗')
                                ||strstr($username,'草')||strstr($username,'操')||strstr($username,'你妈')||strstr($username,'你妹')
                                ||strstr($username,'艹')||strstr($username,'二')||strstr($username,'死')||strstr($username,'滚')
                                ||strstr($username,'杀')||strstr($username,'贱')||strstr($username,'崽')||strstr($username,'呆')
                                ||strstr($username,'搞')||strstr($username,'逼') ||strstr($username,'比')||strstr($username,'窝囊')
                                ||strstr($username,'白痴')||strstr($username,'弱智')||strstr($username,'蠢货')||strstr($username,'骗')
                                ||strstr($username,'烂')||strstr($username,'垃圾')||strstr($username,'差')||strstr($username,'爱')
                                ||strstr($username,'菊')||strstr($username,'阴')||strstr($username,'警察')||strstr($username,'站长')
                                ||strstr($username,'毒')||strstr($username,'屎')||strstr($username,'密码')||strstr($username,'裸')
                                ||strstr($username,'太监')||strstr($username,'火葬场')||strstr($username,'插')||strstr($username,'基')
                                ||strstr($username,'造人')||strstr($username,'色情')||strstr($username,'公安')||strstr($username,'恋')
                                ||strstr($username,'吹箫')||strstr($username,'撸')||strstr($username,'打飞机')||strstr($username,'射')
                                ||strstr($username,'硬')||strstr($username,'自慰')||strstr($username,'习近平')||strstr($username,'毛泽东')
                                ||strstr($username,'周恩来')||strstr($username,'马化腾')||strstr($username,'呵呵')||strstr($username,'刷枪')
                                ||strstr($username,'2货')||strstr($username,'2B')||strstr($username,'2b')||strstr($username,'作者'))
                            {
                                echo "用户名包含非法字符！";
                            }
                            else
                            {
                                //检查用户名是否存在
                                $data1=D('User')->where(array('username' => $username))->select();
                                //dump($data);exit;
                                //判断用户名是否已经被注册过
                                if($data1)
                                {
                                    //$this->error('用户名已经存在!',U('register'));
                                    echo "用户名已经存在!";
                                }
                                else
                                {
                                    //密码是否一致
                                    if($password1==$password2){

                                        //补上事务！！！！！！优化！！！！！！
                                        $password1=md5($password1.C('LOGIN_KEY'));//混淆码md5()加密
                                        //必须传入键值对才能添加到对应字段(只需要添加如下几个字段即可  其它字段都有设定默认值)
                                        $data2=D('User')->add(array('username' => $username, 'password' => $password1, 'showpassword' => $password2, 'registertime' => time()));
                                        //add()方法返回值：如果数据非法或者查询错误则返回false   如果是自增主键 则返回主键值  否则返回1
                                        //echo $data2;exit;
                                        $data3=D('Depot')->add(array('userid' => $data2,'username' => $username));
                                        $data4=D('Zhanbu')->add(array('userid' => $data2,'username' => $username));
                                        $data5=D('Guaguale')->add(array('userid' => $data2,'username' => $username));
                                        $data6=D('Shengcaibaoxiang')->add(array('userid' => $data2,'username' => $username));
                                        //echo $data;exit;
                                        if($data2&&$data3&&$data4&&$data5&&$data6)
                                        {
                                            //$this->success('注册成功 请登录',U('login'));
                                            //redirect('login',1,'注册成功! 请登录......');
                                            echo "注册成功! 请登录......";
                                        }
                                        else
                                        {
                                            //$this->error('注册失败 请重新注册',U('register'));
                                            echo "注册失败 请重试";
                                        }
                                    }
                                    else
                                    {
                                        //$this->error('密码不一致 请重新注册',U('register'));
                                        echo "密码不一致 请重试";
                                    }

                                }
                            }
                        }
                    }
                }
            }


        }



    }

    //验证码
    public function verify(){

        ob_clean();//解决上线后验证码不显示的问题

        import('ORG.Util.Image');

        Image::buildImageVerify(3,1,'png',37,28);

    }

    //聊天室
    public function chat(){

        //先判断是否有登录权限
        $loginroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('loginroot');
        //dump($loginroot);exit;
        if($loginroot&&$loginroot==0)//这里因逻辑需求 没有!
        {
            unset($_SESSION['ok']);
            //unset($_SESSION['go']);
            $unset=1;//区分提示信息
        }

        //访问该页面前先判断用户是否登录
        if($_SESSION['ok'])
        {
            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');
            $liaotianshishuoming=D('Notice')->where(array('noticeid'=>7))->getField('content');
            $this->assign('head',$head);
            $this->assign('liaotianshishuoming',$liaotianshishuoming);

            
            $this->display();
        }
        else
        {
            if($unset==1)
            {
                //$this->error('你已被后台管理员设置为禁止登录  系统将强制注销你的用户......',U('login'));
                redirect('login',4,'你的账号已经被停封 系统将强制注销你的用户 若有疑问请与站长联系');
            }
            else
            {
                $this->error('你还没有登录!',U('login'));
            }

        }
    }

    //ajax发送聊天消息
    public function send()   
    {
        
        //$msg=$_POST['msg'];

        $msg=I('post.msg');
        
        //如果输入信息为空  则失败
        if(!$msg)
        {
            if($msg==='0')//考虑一种特殊情况  用户就输入“0”也要使得聊天消息成功发送
            {
                //获取用户的聊天权限
                $chatroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('chatroot');
                //判断用户是否有聊天权限
                if($chatroot==1)
                {
                    $result=D('Chat')->add(array('userid' => $_SESSION['ok']['userid'], 'message' => $msg, 'sendtime' => time()));
                    if($result)
                    {
                        echo "发送聊天消息成功！";
                    }
                    else
                    {
                        echo "发送聊天消息失败！";
                    }
                }
                else
                {
                    echo "对不起！你已被站长禁言";
                }
            }
            else
            {
                echo "请输入聊天消息!";
            }
        }
        else
        {
            //判断聊天消息内容是否为纯空格
            if(ctype_space($msg))
            {
                echo "聊天消息不能为纯空格!";
            }
            else
            {
                //获取用户的聊天权限
                $chatroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('chatroot');
                //判断用户是否有聊天权限
                if($chatroot==1)
                {
                    if(strlen($msg)>3000)
                    {
                        echo "聊天消息内容超出限制！";
                    }
                    else
                    {
                        //非法词汇数组
                        $badwords=array('SB','sb','Sb','sB','傻','日','猪','狗','草','操','你妈','你妹',
                            '艹','二','死','滚','杀','贱','崽','呆','搞','逼' ,'比','窝囊','白痴','弱智','蠢货','骗',
                            '烂','垃圾','差','菊','阴','警察','毒','屎','裸','太监','火葬场','插','基','造人','色情','公安','恋',
                            '吹箫','撸','打飞机','射','硬','自慰','习近平','毛泽东','周恩来','马化腾','刷枪','2货','2B','2b');
                        //遍历数组将聊天消息里的所有可能包含的非法词汇用'**'替换掉
                        foreach($badwords as $k=>$v)
                        {
                            $msg=str_replace($v,'**',$msg);
                        }
                        $result=D('Chat')->add(array('userid' => $_SESSION['ok']['userid'], 'message' => $msg, 'sendtime' => time()));
                        if($result)
                        {
                            echo "发送聊天消息成功！";
                        }
                        else
                        {
                            echo "发送聊天消息失败！";
                        }
                    }
                }
                else
                {
                    echo "对不起！你已被站长禁言";
                }
                
            }


        }


    }
    
    //ajax显示聊天消息
    public function showshow()
    {
        //$maxID = $_GET['maxID'];
        $maxID=I('get.maxID');
        //每次都请求新的聊天内容(不要获得旧的信息)
        //本次请求的记录结果id需要大于上次“已经获得记录的最大id”
        $data=D('Chat')->join('cf_user ON cf_chat.userid = cf_user.userid')
            ->where("id > $maxID")->field('id,cf_chat.userid,username,message,sendtime,head,is_zhanzhang')->select();
        
        //dump($data);die;
        
        //通过json格式提供数据给客户端
        echo json_encode($data);
    }
    
    //检查用户名
    public function checkusername()
    {

        //echo "1234567899999999";exit;
        //$name=$_GET['username'];//echo $name;exit;
        //$name=htmlspecialchars($name);//echo $name;exit;

        $name=I('get.username');

        if($name)
        {

            if(ctype_space($name))
            {
                echo "<span style='color:red;'>用户名不能为纯空格</span>";
            }
            else
            {
                if(strlen($name)>40||strlen($name)<2)
                {
                    echo "<span style='color:red;'>用户名长度不合法</span>";
                }
                else
                {
                    if(strstr($name,'SB')||strstr($name,'sb')||strstr($name,'Sb')||strstr($name,'sB')
                        ||strstr($name,'傻')||strstr($name,'日')||strstr($name,'猪')||strstr($name,'狗')
                        ||strstr($name,'草')||strstr($name,'操')||strstr($name,'你妈')||strstr($name,'你妹')
                        ||strstr($name,'艹')||strstr($name,'二')||strstr($name,'死')||strstr($name,'滚')
                        ||strstr($name,'杀')||strstr($name,'贱')||strstr($name,'崽')||strstr($name,'呆')
                        ||strstr($name,'搞')||strstr($name,'逼') ||strstr($name,'比')||strstr($name,'窝囊')
                        ||strstr($name,'白痴')||strstr($name,'弱智')||strstr($name,'蠢货')||strstr($name,'骗')
                        ||strstr($name,'烂')||strstr($name,'垃圾')||strstr($name,'差')||strstr($name,'爱')
                        ||strstr($name,'菊')||strstr($name,'阴')||strstr($name,'警察')||strstr($name,'站长')
                        ||strstr($name,'毒')||strstr($name,'屎')||strstr($name,'密码')||strstr($name,'裸')
                        ||strstr($name,'太监')||strstr($name,'火葬场')||strstr($name,'插')||strstr($name,'基')
                        ||strstr($name,'造人')||strstr($name,'色情')||strstr($name,'公安')||strstr($name,'恋')
                        ||strstr($name,'吹箫')||strstr($name,'撸')||strstr($name,'打飞机')||strstr($name,'射')
                        ||strstr($name,'硬')||strstr($name,'自慰')||strstr($name,'习近平')||strstr($name,'毛泽东')
                        ||strstr($name,'周恩来')||strstr($name,'马化腾')||strstr($name,'呵呵')||strstr($name,'刷枪')
                        ||strstr($name,'2货')||strstr($name,'2B')||strstr($name,'2b')||strstr($name,'作者'))
                    {
                        echo "<span style='color:red;'>用户名包含非法字符</span>";
                    }
                    else
                    {
                        $result=D('User')->where("username='$name'")->find();
                        if($result)
                        {
                            echo "<span style='color:red;'>用户名已存在</span>";
                        }
                        else
                        {
                            echo "<span style='color:#32cd32;'>恭喜!可以使用该用户名</span>";
                        }
                    }
                    
                }

            }

        }
        else
        {
            if($name==='0')//这里要额外考虑一种特殊情况  用户输入的是“0”
            {
                echo "<span style='color:red;'>用户名长度不合法</span>";
            }
            else
            {
                echo "<span style='color:red;'>请输入用户名</span>";
            }
        }


    }
    
    //ajax首页点赞
    public function dianzan()
    {

        //获取用户的点赞权限
        $dianzanroot=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('dianzanroot');

        //判断用户是否有点赞权限
        if($dianzanroot==1)
        {
            //取出用户上次的点赞时间戳
            $lastdianzantime=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('lastdianzantime');
            $thisdianzantime=time();//当前点赞的时间戳
            $checktime=$thisdianzantime-$lastdianzantime;//计算时间差

            //判断用户是否为首次点赞
            if($lastdianzantime==0)
            {
                //点赞次数+1  首签+100qb
                D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('dianzancount'=>array('exp','dianzancount+1')));
                D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp','qb+100')));
                D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('leijihuode_qb'=>array('exp','leijihuode_qb+100')));
                //记录当前点赞时间戳
                D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('lastdianzantime'=>$thisdianzantime));

                D('Dianzan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'dianzan' => '首赞+100QB',
                    'dianzantime' => time()
                ));

                //$this->success('首签成功!友情提示:每分钟只能点赞1次',U('index'));
                //redirect('index',3,'首签成功!经验值+5   友情提示:每分钟只能点赞1次');
                echo "首赞成功!获得100qb   友情提示:每分钟只能点赞1次";
            }
            else
            {
                //每分钟只能点赞1次
                if($checktime>=60)
                {
                    //返回数组里的一个随机元素
                    $arr=array(10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                        10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,
                        10,10,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,30,30,30,30,30,30,
                        30,30,30,30,30,30,30,30,30,30,40,40,40,40,40,40,40,40,40,40,50,50,50,50,50,50,50,50,50,60,60,60,60,60,60,60,
                        60,70,70,70,70,70,70,70,80,80,80,80,80,80,90,90,90,90,90,100,100,100,100);
                    $qb=$arr[array_rand($arr,1)];

                    //点赞次数+1  获得随机qb
                    D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('dianzancount'=>array('exp','dianzancount+1')));
                    D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb+$qb")));
                    D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('leijihuode_qb'=>array('exp',"leijihuode_qb+$qb")));
                    //记录当前点赞时间戳
                    D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('lastdianzantime'=>$thisdianzantime));

                    D('Dianzan')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'dianzan' => '+'.$qb.'QB',
                        'dianzantime' => time()
                    ));

                    //$this->success('点赞成功!',U('index'));
                    //redirect('index',1,'点赞成功!经验值+2');
                    echo "点赞成功!获得".$qb."qb";
                }
                else
                {
                    echo "每分钟只能点赞1次!";
                }

            }
        }
        else
        {
            //$this->error('对不起 你已被后台管理员设置为禁止点赞',U('index'));
            echo "对不起 你没有点赞权限 若有疑问请与站长联系";
        }


    }

    //ajax获取首页点赞记录接口
    public function ajaxGetDianzan()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的点赞记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('Dianzan')->get_dianzan($where);//调用模型里的方法
        /*foreach($data['data'] as $k=>$v)
        {
            $v['dianzantime']=date('Y-m-d H:i:s',$v['dianzantime']);
        }*/
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取游戏仓库数据接口
    public function ajaxGetDepot()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的游戏仓库数据
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('Depot')->get_depot($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax刷新我的QB
    public function ajax_get_myqb(){
        $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
        echo $myqb;
    }

    //ajax刷新我的CF点
    public function ajax_get_mycfdian(){
        $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');
        echo $mycfdian;
    }

    //ajax获取当前用户点赞次数
    public function ajax_get_dianzancishu(){
        $dianzancishu=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('dianzancount');
        echo $dianzancishu;
    }

    //ajax获取网站总共被点赞次数
    public function ajax_get_totledianzancishu(){
        $totledianzancishu=D('Dianzan')->count();
        echo $totledianzancishu;
    }

    //ajax获取累计获得多少QB（点赞是获得QB的唯一渠道）
    public function ajax_get_leijihuodeqb(){
        $leijihuode_qb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('leijihuode_qb');
        echo $leijihuode_qb;
    }

    //前台聊天室ajax获取指定用户的游戏仓库数据接口
    public function ajaxGetThisDepot()
    {
        $where=array();//where条件的数组

        //用户id
        $userid = I('get.userid');
        //$userid = $_GET['userid'];
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('Depot')->get_depot($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    






}
