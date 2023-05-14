<?php

class LoginAction extends Action {

    //后台登录
    public function login(){


        if(IS_POST){

            //dump($_SESSION);exit;
            //dump($_POST);
            //$managername=$_POST['managername'];
            $managername=I('post.managername');

            //$password=$_POST['password'];
            $password=I('post.password');

            //$yzm=$_POST['yzm'];
            $yzm=I('post.yzm');

            //如果输入信息有1行为空   则失败
            if(!$managername||!$password||!$yzm)
            {
                $this->error('请输入完整的信息!',U('login'));
                //redirect('login',1,'请输入完整的信息!');
            }
            else
            {
                //判断登录信息是否为纯空格
                if(ctype_space($managername)||ctype_space($password)||ctype_space($yzm))
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
                        $data=D('Manager')->check($managername,md5(md5(md5(C('LOGIN_KEY').$password))));
                        //dump($data);exit;
                        if($data)
                        {
                            $_SESSION['yes']=$data;

                            redirect('index',1,'登录成功!正在跳转至后台首页......');
                            //$this->success('登录成功!正在跳转至后台首页......',U('index'));
                        }
                        else
                        {
                            $this->error('管理员账号或密码错误!',U('login'));
                        }
                    }

                }

            }


        }

        /*//判断是否已登录  来调节登录界面的背景颜色
        if($_SESSION['yes'])
        {
            $backcolor='#00bfff';
        }
        else
        {
            $backcolor='#278296';
        }

        //分配变量$backcolor给模板
        $this->assign('bc',$backcolor);*/

        $this->display();

    }

    public function index()
    {
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    public function top()
    {
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    public function menu()
    {
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    public function main()
    {
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }
    
    //注销
    public function logout()
    {

        if($_SESSION['yes'])
        {
            unset($_SESSION['yes']);

            redirect('login',2,'注销成功!');
        }
        else
        {
            $this->error('非法操作!',U('login'));
        }

    }
    
    //用户信息
    public function user(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //后台ajax获取用户信息接口
    public function ajaxGetUser()
    {

        $where=array();//where条件的数组


        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //登录权限
        $loginroot=$_POST['loginroot'];
        if($loginroot=='全部'){}
        elseif($loginroot=='允许'){$where['loginroot']=array('eq', '1');}
        elseif($loginroot=='禁止'){$where['loginroot']=array('eq', '0');}
        //点赞权限
        $dianzanroot=$_POST['dianzanroot'];
        if($dianzanroot=='全部'){}
        elseif($dianzanroot=='允许'){$where['dianzanroot']=array('eq', '1');}
        elseif($dianzanroot=='禁止'){$where['dianzanroot']=array('eq', '0');}
        //聊天权限
        $chatroot=$_POST['chatroot'];
        if($chatroot=='全部'){}
        elseif($chatroot=='允许'){$where['chatroot']=array('eq', '1');}
        elseif($chatroot=='禁止'){$where['chatroot']=array('eq', '0');}
        //注册时间
        $registertime1=$_POST['registertime1'];
        $registertime2=$_POST['registertime2'];
        //用到功能强大的strtotime()函数
        if($registertime1&&$registertime2){$where['registertime']=array('between',array(strtotime("$registertime1 00:00:00"),strtotime("$registertime2 23:59:59")));}
        elseif($registertime1){$where['registertime']=array('egt',strtotime("$registertime1 00:00:00"));}//注册时间>=$registertime1
        elseif($registertime2){$where['registertime']=array('elt',strtotime("$registertime2 23:59:59"));}//注册时间<=$registertime2

        /***********************************/

        $data=D('User')->admin_get_user($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //ajax修改登录权限
    public function updateLoginRoot(){
        $userid=$_GET['userid'];
        $loginroot=D('User')->where(array('userid'=>$userid))->getField('loginroot');
        if($loginroot==1){$result=D('User')->where(array('userid'=>$userid))->setField('loginroot',0);}
        elseif($loginroot==0){$result=D('User')->where(array('userid'=>$userid))->setField('loginroot',1);}
        if($result){echo "修改成功";}else{echo "修改失败";}
    }

    //ajax修改点赞权限
    public function updateDianzanRoot(){
        $userid=$_GET['userid'];
        $dianzanroot=D('User')->where(array('userid'=>$userid))->getField('dianzanroot');
        if($dianzanroot==1){$result=D('User')->where(array('userid'=>$userid))->setField('dianzanroot',0);}
        elseif($dianzanroot==0){$result=D('User')->where(array('userid'=>$userid))->setField('dianzanroot',1);}
        if($result){echo "修改成功";}else{echo "修改失败";}
    }

    //ajax修改聊天权限
    public function updateChatRoot(){
        $userid=$_GET['userid'];
        $chatroot=D('User')->where(array('userid'=>$userid))->getField('chatroot');
        if($chatroot==1){$result=D('User')->where(array('userid'=>$userid))->setField('chatroot',0);}
        elseif($chatroot==0){$result=D('User')->where(array('userid'=>$userid))->setField('chatroot',1);}
        if($result){echo "修改成功";}else{echo "修改失败";}
    }
    
    //仓库信息
    public function depot(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //占卜信息
    public function zhanbu(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //刮刮乐信息
    public function guaguale(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //生财宝箱信息
    public function shengcaibaoxiang(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //后台ajax获取仓库信息接口
    public function ajaxGetDepot()
    {

        $where=array();//where条件的数组


        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //是否有王者
        $is_k=$_POST['is_k'];
        if($is_k=='全部'){}
        elseif($is_k=='有王者'){$where['k_count']=array('neq', '0');}//有王者的用户K总数肯定不为0
        elseif($is_k=='无王者'){$where['k_count']=array('eq', '0');}//无王者的用户K总数肯定为0

        /***********************************/

        $data=D('Depot')->admin_get_depot($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //后台ajax获取占卜信息接口
    public function ajaxGetZhanbu()
    {

        $where=array();//where条件的数组


        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //是否有中奖
        $is_zhongjiang=$_POST['is_zhongjiang'];
        if($is_zhongjiang=='全部'){}
        elseif($is_zhongjiang=='有中奖'){$where['zhongjiang_count']=array('neq', '0');}//有中奖的用户中奖次数肯定不为0
        elseif($is_zhongjiang=='无中奖'){$where['zhongjiang_count']=array('eq', '0');}//无中奖的用户中奖次数肯定为0

        /***********************************/

        $data=D('Zhanbu')->admin_get_zhanbu($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //后台ajax获取刮刮乐信息接口
    public function ajaxGetGuaguale()
    {

        $where=array();//where条件的数组


        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}

        /***********************************/

        $data=D('Guaguale')->admin_get_guaguale($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //后台ajax获取生财宝箱信息接口
    public function ajaxGetShengcaibaoxiang()
    {

        $where=array();//where条件的数组


        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //是否有中奖
        $is_zhongjiang=$_POST['is_zhongjiang'];
        if($is_zhongjiang=='全部'){}
        elseif($is_zhongjiang=='有中奖'){$where['zhongjiang_count']=array('neq', '0');}//有中奖的用户中奖次数肯定不为0
        elseif($is_zhongjiang=='无中奖'){$where['zhongjiang_count']=array('eq', '0');}//无中奖的用户中奖次数肯定为0

        /***********************************/

        $data=D('Shengcaibaoxiang')->admin_get_shengcaibaoxiang($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //后台ajax获取指定用户的游戏仓库数据接口
    public function ajaxGetThisDepot()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        $userid = $_GET['userid'];
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('Depot')->get_depot($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //商品信息
    public function goods(){


        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }

    }

    //后台ajax获取商品信息接口
    public function ajaxGetGoods()
    {
        $data=D('Goods')->select();
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //后台ajax修改商品当前折扣
    public function updateZheKou(){
        $goodsid=$_GET['goodsid'];
        $zhekou=$_GET['zhekou'];
        $cur_zhekou=D('Goods')->where(array('goodsid'=>$goodsid))->getField('zhekou');
        if($zhekou==$cur_zhekou)
        {
            echo "无效修改！";
        }
        else
        {
            $result=D('Goods')->where(array('goodsid'=>$goodsid))->setField('zhekou',$zhekou);
            if($result)
            {
                echo "修改成功！";
            }
            else
            {
                echo "修改失败！";
            }
        }
    }

    //后台ajax进货（增加库存量）
    public function jinHuo(){
        $goodsid=$_GET['goodsid'];
        $x=$_GET['x'];
        $result=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number+$x")));
        if($result)
        {
            $goodsname=D('Goods')->where(array('goodsid'=>$goodsid))->getField('goodsname');
            $number=D('Goods')->where(array('goodsid'=>$goodsid))->getField('number');
            echo $goodsname."×".$x."件进货成功！当前".$goodsname."库存量：".$number."件";
        }
        else
        {
            $goodsname=D('Goods')->where(array('goodsid'=>$goodsid))->getField('goodsname');
            echo $goodsname."×".$x."件进货失败！";
        }
    }

    //根据接收到的商品ID去查询对应的商品名称并将其返回
    public function showGoodsname(){

        $goodsid=$_GET['goodsid'];
        //echo $goodsid;exit;
        $goodsname=D('Goods')->where(array('goodsid'=>$goodsid))->getField('goodsname');
        echo $goodsname;

    }

    //商城购买记录
    public function goods_buy(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取商城购买记录接口
    public function ajaxGetGoodsBuy()
    {

        $where=array();//where条件的数组


        //商城购买记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //购买信息
        $buy=$_POST['buy'];
        if($buy){$where['buy']=array('like', "%$buy%");}
        //购买时间
        $buytime1=$_POST['buytime1'];
        $buytime2=$_POST['buytime2'];
        //用到功能强大的strtotime()函数
        if($buytime1&&$buytime2){$where['buytime']=array('between',array(strtotime("$buytime1 00:00:00"),strtotime("$buytime2 23:59:59")));}
        elseif($buytime1){$where['buytime']=array('egt',strtotime("$buytime1 00:00:00"));}//购买时间>=$buytime1
        elseif($buytime2){$where['buytime']=array('elt',strtotime("$buytime2 23:59:59"));}//购买时间<=$buytime2
        //购买折扣
        $zhekou=$_POST['zhekou'];
        if($zhekou=='全部'){}
        elseif($zhekou=='原价'){$where['zhekou']=array('eq', '-');}
        elseif($zhekou=='9折'){$where['zhekou']=array('eq', '9折');}
        elseif($zhekou=='8折'){$where['zhekou']=array('eq', '8折');}

        /***********************************/

        $data=D('GoodsBuy')->admin_get_goods_buy($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //占卜购买记录
    public function zhanbu_goumai(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取占卜购买记录接口
    public function ajaxGetZhanbuGoumai()
    {

        $where=array();//where条件的数组


        //占卜购买记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //购买方式
        $goumai=$_POST['goumai'];
        if($goumai){$where['goumai']=array('like', "%$goumai%");}
        //购买时间
        $goumaitime1=$_POST['goumaitime1'];
        $goumaitime2=$_POST['goumaitime2'];
        //用到功能强大的strtotime()函数
        if($goumaitime1&&$goumaitime2){$where['goumaitime']=array('between',array(strtotime("$goumaitime1 00:00:00"),strtotime("$goumaitime2 23:59:59")));}
        elseif($goumaitime1){$where['goumaitime']=array('egt',strtotime("$goumaitime1 00:00:00"));}//购买时间>=$goumaitime1
        elseif($goumaitime2){$where['goumaitime']=array('elt',strtotime("$goumaitime2 23:59:59"));}//购买时间<=$goumaitime2


        /***********************************/

        $data=D('ZhanbuGoumai')->admin_get_zhanbu_goumai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //占卜翻牌记录
    public function zhanbu_fanpai(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取占卜翻牌记录接口
    public function ajaxGetZhanbuFanpai()
    {

        $where=array();//where条件的数组


        //占卜翻牌记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //翻牌结果
        $fanpai=$_POST['fanpai'];
        if($fanpai=='全部'){}
        elseif($fanpai=='火麒麟（永久）'){$where['fanpai']=array('eq', '火麒麟（永久）');}
        elseif($fanpai=='黑武士（永久）'){$where['fanpai']=array('eq', '黑武士（永久）');}
        elseif($fanpai=='雷神（永久）'){$where['fanpai']=array('eq', '雷神（永久）');}
        elseif($fanpai=='黑龙（永久）'){$where['fanpai']=array('eq', '黑龙（永久）');}
        elseif($fanpai=='黑骑士（永久）'){$where['fanpai']=array('eq', '黑骑士（永久）');}
        elseif($fanpai=='极光（永久）'){$where['fanpai']=array('eq', '极光（永久）');}
        elseif($fanpai=='毁灭（永久）'){$where['fanpai']=array('eq', '毁灭（永久）');}
        elseif($fanpai=='700CF点'){$where['fanpai']=array('eq', '700CF点');}
        elseif($fanpai=='600CF点'){$where['fanpai']=array('eq', '600CF点');}
        elseif($fanpai=='500CF点'){$where['fanpai']=array('eq', '500CF点');}
        elseif($fanpai=='400CF点'){$where['fanpai']=array('eq', '400CF点');}
        elseif($fanpai=='300CF点'){$where['fanpai']=array('eq', '300CF点');}
        elseif($fanpai=='200CF点'){$where['fanpai']=array('eq', '200CF点');}
        elseif($fanpai=='100CF点'){$where['fanpai']=array('eq', '100CF点');}
        //翻牌时间
        $fanpaitime1=$_POST['fanpaitime1'];
        $fanpaitime2=$_POST['fanpaitime2'];
        //用到功能强大的strtotime()函数
        if($fanpaitime1&&$fanpaitime2){$where['fanpaitime']=array('between',array(strtotime("$fanpaitime1 00:00:00"),strtotime("$fanpaitime2 23:59:59")));}
        elseif($fanpaitime1){$where['fanpaitime']=array('egt',strtotime("$fanpaitime1 00:00:00"));}//翻牌时间>=$fanpaitime1
        elseif($fanpaitime2){$where['fanpaitime']=array('elt',strtotime("$fanpaitime2 23:59:59"));}//翻牌时间<=$fanpaitime2
        //翻牌对象
        $fanpaiobj=$_POST['fanpaiobj'];
        if($fanpaiobj=='全部'){}
        elseif($fanpaiobj=='卡牌1'){$where['fanpaiobj']=array('eq', '卡牌1');}
        elseif($fanpaiobj=='卡牌2'){$where['fanpaiobj']=array('eq', '卡牌2');}
        elseif($fanpaiobj=='卡牌3'){$where['fanpaiobj']=array('eq', '卡牌3');}
        //翻牌目标
        $fanpaimubiao=$_POST['fanpaimubiao'];
        if($fanpaimubiao=='全部'){}
        elseif($fanpaimubiao=='火麒麟'){$where['fanpaimubiao']=array('eq', '火麒麟');}
        elseif($fanpaimubiao=='黑武士'){$where['fanpaimubiao']=array('eq', '黑武士');}
        elseif($fanpaimubiao=='雷神'){$where['fanpaimubiao']=array('eq', '雷神');}
        elseif($fanpaimubiao=='黑龙'){$where['fanpaimubiao']=array('eq', '黑龙');}
        elseif($fanpaimubiao=='黑骑士'){$where['fanpaimubiao']=array('eq', '黑骑士');}
        elseif($fanpaimubiao=='极光'){$where['fanpaimubiao']=array('eq', '极光');}
        elseif($fanpaimubiao=='毁灭'){$where['fanpaimubiao']=array('eq', '毁灭');}
        //是否公告
        $is_gonggao=$_POST['is_gonggao'];
        if($is_gonggao=='全部'){}
        elseif($is_gonggao=='公告'){$where['is_gonggao']=array('eq', '1');}
        elseif($is_gonggao=='不公告'){$where['is_gonggao']=array('eq', '0');}

        /***********************************/

        $data=D('ZhanbuFanpai')->admin_get_zhanbu_fanpai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //刮刮乐充值记录
    public function guaguale_chongzhi(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取刮刮乐充值记录接口
    public function ajaxGetGuagualeChongzhi()
    {

        $where=array();//where条件的数组


        //刮刮乐充值记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //充值方式
        $chongzhi1=$_POST['chongzhi1'];
        if($chongzhi1){$where['chongzhi1']=array('like', "%$chongzhi1%");}
        //赠送刮刮卡
        $chongzhi2=$_POST['chongzhi2'];
        if($chongzhi2){$where['chongzhi2']=array('like', "%$chongzhi2%");}
        //充值时间
        $chongzhitime1=$_POST['chongzhitime1'];
        $chongzhitime2=$_POST['chongzhitime2'];
        //用到功能强大的strtotime()函数
        if($chongzhitime1&&$chongzhitime2){$where['chongzhitime']=array('between',array(strtotime("$chongzhitime1 00:00:00"),strtotime("$chongzhitime2 23:59:59")));}
        elseif($chongzhitime1){$where['chongzhitime']=array('egt',strtotime("$chongzhitime1 00:00:00"));}//充值时间>=$chongzhitime1
        elseif($chongzhitime2){$where['chongzhitime']=array('elt',strtotime("$chongzhitime2 23:59:59"));}//充值时间<=$chongzhitime2

        /***********************************/

        $data=D('GuagualeChongzhi')->admin_get_guaguale_chongzhi($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //刮刮乐刮卡记录
    public function guaguale_guaka(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取刮刮乐刮卡记录接口
    public function ajaxGetGuagualeGuaka()
    {

        $where=array();//where条件的数组


        //刮刮乐刮卡记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //刮卡结果
        $guaka=$_POST['guaka'];
        if($guaka){$where['guaka']=array('like', "%$guaka%");}
        //刮卡时间
        $guakatime1=$_POST['guakatime1'];
        $guakatime2=$_POST['guakatime2'];
        //用到功能强大的strtotime()函数
        if($guakatime1&&$guakatime2){$where['guakatime']=array('between',array(strtotime("$guakatime1 00:00:00"),strtotime("$guakatime2 23:59:59")));}
        elseif($guakatime1){$where['guakatime']=array('egt',strtotime("$guakatime1 00:00:00"));}//刮卡时间>=$guakatime1
        elseif($guakatime2){$where['guakatime']=array('elt',strtotime("$guakatime2 23:59:59"));}//刮卡时间<=$guakatime2
        //刮卡对象
        $guakaobj=$_POST['guakaobj'];
        if($guakaobj=='全部'){}
        elseif($guakaobj=='死神'){$where['guakaobj']=array('eq', '死神');}
        elseif($guakaobj=='无影'){$where['guakaobj']=array('eq', '无影');}
        elseif($guakaobj=='天龙'){$where['guakaobj']=array('eq', '天龙');}
        elseif($guakaobj=='屠龙'){$where['guakaobj']=array('eq', '屠龙');}
        elseif($guakaobj=='修罗'){$where['guakaobj']=array('eq', '修罗');}
        elseif($guakaobj=='王者之心'){$where['guakaobj']=array('eq', '王者之心');}
        //是否公告
        $is_gonggao=$_POST['is_gonggao'];
        if($is_gonggao=='全部'){}
        elseif($is_gonggao=='公告'){$where['is_gonggao']=array('eq', '1');}
        elseif($is_gonggao=='不公告'){$where['is_gonggao']=array('eq', '0');}

        /***********************************/

        $data=D('GuagualeGuaka')->admin_get_guaguale_guaka($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //刮刮乐兑换记录
    public function guaguale_duihuan(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取刮刮乐兑换记录接口
    public function ajaxGetGuagualeDuihuan()
    {

        $where=array();//where条件的数组


        //刮刮乐兑换记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //兑换信息
        $duihuan=$_POST['duihuan'];
        if($duihuan=='全部'){}
        elseif($duihuan=='使用98积分兑换了死神（永久）'){$where['duihuan']=array('eq', '使用98积分兑换了死神（永久）');}
        elseif($duihuan=='使用98积分兑换了无影（永久）'){$where['duihuan']=array('eq', '使用98积分兑换了无影（永久）');}
        elseif($duihuan=='使用80积分兑换了天龙（永久）'){$where['duihuan']=array('eq', '使用80积分兑换了天龙（永久）');}
        elseif($duihuan=='使用60积分兑换了屠龙（永久）'){$where['duihuan']=array('eq', '使用60积分兑换了屠龙（永久）');}
        elseif($duihuan=='使用50积分兑换了修罗（永久）'){$where['duihuan']=array('eq', '使用50积分兑换了修罗（永久）');}
        //兑换时间
        $duihuantime1=$_POST['duihuantime1'];
        $duihuantime2=$_POST['duihuantime2'];
        //用到功能强大的strtotime()函数
        if($duihuantime1&&$duihuantime2){$where['duihuantime']=array('between',array(strtotime("$duihuantime1 00:00:00"),strtotime("$duihuantime2 23:59:59")));}
        elseif($duihuantime1){$where['duihuantime']=array('egt',strtotime("$duihuantime1 00:00:00"));}//兑换时间>=$duihuantime1
        elseif($duihuantime2){$where['duihuantime']=array('elt',strtotime("$duihuantime2 23:59:59"));}//兑换时间<=$duihuantime2

        /***********************************/

        $data=D('GuagualeDuihuan')->admin_get_guaguale_duihuan($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //生财宝箱购买记录
    public function shengcaibaoxiang_goumai(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取生财宝箱购买记录接口
    public function ajaxGetShengcaibaoxiangGoumai()
    {

        $where=array();//where条件的数组


        //生财宝箱购买记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //购买方式
        $goumai=$_POST['goumai'];
        if($goumai){$where['goumai']=array('like', "%$goumai%");}
        //购买时间
        $goumaitime1=$_POST['goumaitime1'];
        $goumaitime2=$_POST['goumaitime2'];
        //用到功能强大的strtotime()函数
        if($goumaitime1&&$goumaitime2){$where['goumaitime']=array('between',array(strtotime("$goumaitime1 00:00:00"),strtotime("$goumaitime2 23:59:59")));}
        elseif($goumaitime1){$where['goumaitime']=array('egt',strtotime("$goumaitime1 00:00:00"));}//购买时间>=$goumaitime1
        elseif($goumaitime2){$where['goumaitime']=array('elt',strtotime("$goumaitime2 23:59:59"));}//购买时间<=$goumaitime2

        /***********************************/

        $data=D('ShengcaibaoxiangGoumai')->admin_get_shengcaibaoxiang_goumai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //生财宝箱开箱记录
    public function shengcaibaoxiang_kaixiang(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取生财宝箱开箱记录接口
    public function ajaxGetShengcaibaoxiangKaixiang()
    {

        $where=array();//where条件的数组


        //生财宝箱开箱记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //开箱结果
        $kaixiang=$_POST['kaixiang'];
        if($kaixiang=='全部'){}
        elseif($kaixiang=='1000CF点'){$where['kaixiang']=array('eq', '1000CF点');}
        elseif($kaixiang=='1100CF点'){$where['kaixiang']=array('eq', '1100CF点');}
        elseif($kaixiang=='1200CF点'){$where['kaixiang']=array('eq', '1200CF点');}
        elseif($kaixiang=='2000CF点'){$where['kaixiang']=array('eq', '2000CF点');}
        elseif($kaixiang=='5000CF点'){$where['kaixiang']=array('eq', '5000CF点');}
        elseif($kaixiang=='66600CF点'){$where['kaixiang']=array('eq', '66600CF点');}
        elseif($kaixiang=='88800CF点'){$where['kaixiang']=array('eq', '88800CF点');}
        //开箱时间
        $kaixiangtime1=$_POST['kaixiangtime1'];
        $kaixiangtime2=$_POST['kaixiangtime2'];
        //用到功能强大的strtotime()函数
        if($kaixiangtime1&&$kaixiangtime2){$where['kaixiangtime']=array('between',array(strtotime("$kaixiangtime1 00:00:00"),strtotime("$kaixiangtime2 23:59:59")));}
        elseif($kaixiangtime1){$where['kaixiangtime']=array('egt',strtotime("$kaixiangtime1 00:00:00"));}//开箱时间>=$kaixiangtime1
        elseif($kaixiangtime2){$where['kaixiangtime']=array('elt',strtotime("$kaixiangtime2 23:59:59"));}//开箱时间<=$kaixiangtime2
        //是否公告
        $is_gonggao=$_POST['is_gonggao'];
        if($is_gonggao=='全部'){}
        elseif($is_gonggao=='公告'){$where['is_gonggao']=array('eq', '1');}
        elseif($is_gonggao=='不公告'){$where['is_gonggao']=array('eq', '0');}

        /***********************************/

        $data=D('ShengcaibaoxiangKaixiang')->admin_get_shengcaibaoxiang_kaixiang($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //点赞记录
    public function dianzan(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取点赞记录接口
    public function ajaxGetDianzan()
    {

        $where=array();//where条件的数组


        //点赞记录ID
        $id=$_POST['id'];
        if($id){$where['id']=array('eq', $id);}
        //用户名
        $username=$_POST['username'];
        if($username){$where['username']=array('like', "%$username%");}
        //用户ID
        $userid=$_POST['userid'];
        if($userid){$where['userid']=array('eq', $userid);}
        //点赞时间
        $dianzantime1=$_POST['dianzantime1'];
        $dianzantime2=$_POST['dianzantime2'];
        //用到功能强大的strtotime()函数
        if($dianzantime1&&$dianzantime2){$where['dianzantime']=array('between',array(strtotime("$dianzantime1 00:00:00"),strtotime("$dianzantime2 23:59:59")));}
        elseif($dianzantime1){$where['dianzantime']=array('egt',strtotime("$dianzantime1 00:00:00"));}//点赞时间>=$dianzantime1
        elseif($dianzantime2){$where['dianzantime']=array('elt',strtotime("$dianzantime2 23:59:59"));}//点赞时间<=$dianzantime2
        //点赞结果
        $dianzan=$_POST['dianzan'];
        if($dianzan=='全部'){}
        elseif($dianzan=='+10QB'){$where['dianzan']=array('eq', '+10QB');}
        elseif($dianzan=='+20QB'){$where['dianzan']=array('eq', '+20QB');}
        elseif($dianzan=='+30QB'){$where['dianzan']=array('eq', '+30QB');}
        elseif($dianzan=='+40QB'){$where['dianzan']=array('eq', '+40QB');}
        elseif($dianzan=='+50QB'){$where['dianzan']=array('eq', '+50QB');}
        elseif($dianzan=='+60QB'){$where['dianzan']=array('eq', '+60QB');}
        elseif($dianzan=='+70QB'){$where['dianzan']=array('eq', '+70QB');}
        elseif($dianzan=='+80QB'){$where['dianzan']=array('eq', '+80QB');}
        elseif($dianzan=='+90QB'){$where['dianzan']=array('eq', '+90QB');}
        elseif($dianzan=='+100QB'){$where['dianzan']=array('eq', '+100QB');}
        elseif($dianzan=='首赞+100QB'){$where['dianzan']=array('eq', '首赞+100QB');}

        /***********************************/

        $data=D('Dianzan')->admin_get_dianzan($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //站长聊天室
    public function chat(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
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
            if($msg==='0')//考虑一种特殊情况  就输入“0”也要使得聊天消息成功发送
            {

                $result=D('Chat')->add(array('userid' => -1, 'message' => $msg, 'sendtime' => time(), 'is_zhanzhang' => 1));
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

                if(strlen($msg)>3000)
                {
                    echo "聊天消息内容超出限制！";
                }
                else
                {
                    //站长可以发送包含非法词汇的聊天消息

                    /*//非法词汇数组
                    $badwords=array('SB','sb','Sb','sB','傻','日','猪','狗','草','操','你妈','你妹',
                        '艹','二','死','滚','杀','贱','崽','呆','搞','逼' ,'比','窝囊','白痴','弱智','蠢货','骗',
                        '烂','垃圾','差','菊','阴','警察','毒','屎','裸','太监','火葬场','插','基','造人','色情','公安','恋',
                        '吹箫','撸','打飞机','射','硬','自慰','习近平','毛泽东','周恩来','马化腾','刷枪','2货','2B','2b');
                    //遍历数组将聊天消息里的所有可能包含的非法词汇用'**'替换掉
                    foreach($badwords as $k=>$v)
                    {
                        $msg=str_replace($v,'**',$msg);
                    }*/

                    $result=D('Chat')->add(array('userid' => -1, 'message' => $msg, 'sendtime' => time(), 'is_zhanzhang' => 1));
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

    //公告/说明/告示设置
    public function notice(){
        if($_SESSION['yes'])
        {
            $this->display();
        }
        else
        {
            $this->error('你还没有登录!',U('login'));
        }
    }

    //后台ajax获取所有的公告/说明/告示接口
    public function ajaxGetNotice()
    {
        $data=D('Notice')->select();
        //dump($data);die;
        $this->success($data,'',TRUE);//返回json
    }

    //ajax修改公告/说明/告示内容
    public function updateContent(){
        $noticeid=$_GET['noticeid'];
        $content=$_GET['content'];
        $yuanlai_content=D('Notice')->where(array('noticeid'=>$noticeid))->getField('content');
        if($yuanlai_content===$content)
        {
            echo "无效修改！";
        }
        else
        {
            $result=D('Notice')->where(array('noticeid'=>$noticeid))->setField('content',$content);
            if($result)
            {
                echo "修改成功！";
            }
            else
            {
                echo "修改失败！";
            }
        }
    }

    //验证码
    public function verify(){

        ob_clean();//解决上线后验证码不显示的问题

        import('ORG.Util.Image');

        Image::buildImageVerify(3,1,'png',37,28);

    }
    
    
}
