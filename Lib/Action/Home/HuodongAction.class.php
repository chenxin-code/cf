<?php

class HuodongAction extends Action {


    //当前qb是否充足接口（多用）
    public function is_enough(){

        //$pay_qb=$_GET['pay_qb'];
        $pay_qb=I('get.pay_qb');
        //echo $pay_qb;exit;
        if($pay_qb){
            $cur_qb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            if($cur_qb>=$pay_qb)
            {
                echo "OK";
            }
            else
            {
                echo "抱歉！你的QB不足！";
            }
        }
    }

    //ajax获取游戏仓库数据接口（多用）
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

















    /**********************************************************************************************************/


    //占卜活动
    public function zhanbu(){

        //dump(__APP__);
        if($_SESSION['ok'])
        {
            $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');

            $zhanbuqiu=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhanbuqiu');
            $zhongjiang_count=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhongjiang_count');
            $fanpai_count=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('fanpai_count');
            $cost=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cost');

            $count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('count');
            $v_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('v_count');
            $k_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('k_count');
            $juese_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('juese_count');

            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');

            $huodongshuoming=D('Notice')->where(array('noticeid'=>2))->getField('content');


            $this->assign('myqb',$myqb);
            $this->assign('mycfdian',$mycfdian);
            
            $this->assign('zhanbuqiu',$zhanbuqiu);
            $this->assign('zhongjiang_count',$zhongjiang_count);
            $this->assign('fanpai_count',$fanpai_count);
            $this->assign('cost',$cost);
            $this->assign('count',$count);
            $this->assign('v_count',$v_count);
            $this->assign('k_count',$k_count);
            $this->assign('juese_count',$juese_count);

            $this->assign('head',$head);

            $this->assign('huodongshuoming',$huodongshuoming);



            $this->display();
        }
        else
        {
            //redirect('Login/login',3,'你还没有登录！');
            $this->error('你还没有登录！',U('Login/login'));
        }

    }

    //ajax刷新统计区域数据（剩余占卜球）
    public function ajax_get_tongji_data_zhanbuqiu(){
        $zhanbuqiu=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhanbuqiu');
        echo $zhanbuqiu;
    }

    //ajax刷新统计区域数据（中奖次数）
    public function ajax_get_tongji_data_zhongjiang_count(){
        $zhongjiang_count=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhongjiang_count');
        echo $zhongjiang_count;
    }

    //ajax刷新统计区域数据（翻牌次数）
    public function ajax_get_tongji_data_fanpai_count(){
        $fanpai_count=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('fanpai_count');
        echo $fanpai_count;
    }

    //ajax刷新统计区域数据（消费QB）
    public function ajax_get_tongji_data_cost(){
        $cost=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cost');
        echo $cost;
    }

    //占卜购买接口
    public function zhanbu_cost(){
        //补上事务！！！！！！优化！！！！！！
        //$cost_qb=$_GET['cost_qb'];
        $cost_qb=I('get.cost_qb');
        $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$cost_qb")));
        $result2=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cost'=>array('exp',"cost+$cost_qb")));
        if($cost_qb==10){
            $result3=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('zhanbuqiu'=>array('exp',"zhanbuqiu+1")));
            $result4=D('ZhanbuGoumai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'goumai' => '消费10QB购买1个占卜球',
                'goumaitime' => time()
            ));
        }
        if($cost_qb==100){
            $result3=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('zhanbuqiu'=>array('exp',"zhanbuqiu+11")));
            $result4=D('ZhanbuGoumai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'goumai' => '消费100QB购买11个占卜球',
                'goumaitime' => time()
            ));
        }
        if(!($result1&&$result2&&$result3&&$result4)){echo "数据出错！";}
    }

    //占卜翻牌接口①
    public function zhanbu_fanpai_1(){
        $result=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhanbuqiu');
        if($result<=0)
        {
            echo "占卜球数量不足!";
        }
        else
        {
            echo "OK";
        }
    }

    //占卜翻牌接口②
    public function zhanbu_fanpai_2(){
        $result1=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('fanpai_count'=>array('exp',"fanpai_count+1")));
        $result2=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('zhanbuqiu'=>array('exp',"zhanbuqiu-1")));
        if(!($result1&&$result2)){echo "数据出错！";}
    }

    //占卜翻牌接口③
    public function zhanbu_fanpai_3(){
        $result=D('Zhanbu')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('zhongjiang_count'=>array('exp',"zhongjiang_count+1")));
        if(!$result){echo "数据出错！";}
    }

    //占卜翻牌接口④
    public function zhanbu_fanpai_4(){
        
        //$v=$_GET['v'];
        $v=I('get.v');
        //$cfdian=$_GET['cfdian'];
        $cfdian=I('get.cfdian');
        //$obj=$_GET['obj'];
        $obj=I('get.obj');
        //$mubiao=$_GET['mubiao'];
        $mubiao=I('get.mubiao');

        if($v=='huoqilin'){$vv='火麒麟（永久）';}
        elseif($v=='heiwushi'){$vv='黑武士（永久）';}
        elseif($v=='leishen'){$vv='雷神（永久）';}
        elseif($v=='heilong'){$vv='黑龙（永久）';}
        elseif($v=='heiqishi'){$vv='黑骑士（永久）';}
        elseif($v=='huimie'){$vv='毁灭（永久）';}
        elseif($v=='jiguang'){$vv='极光（永久）';}

        if($mubiao=='huoqilin'){$mubiao='火麒麟';}
        elseif($mubiao=='heiwushi'){$mubiao='黑武士';}
        elseif($mubiao=='leishen'){$mubiao='雷神';}
        elseif($mubiao=='heilong'){$mubiao='黑龙';}
        elseif($mubiao=='heiqishi'){$mubiao='黑骑士';}
        elseif($mubiao=='huimie'){$mubiao='毁灭';}
        elseif($mubiao=='jiguang'){$mubiao='极光';}
        
        if($v){
            $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            $result2=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            $result4=D('ZhanbuFanpai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'fanpai' => $vv,
                'fanpaitime' => time(),
                'fanpaiobj' => '卡牌'.$obj,
                'fanpaimubiao' => $mubiao,
                'is_gonggao' => 1
            ));

            if(!($result1&&$result2&&$result3&&$result4)){echo "数据出错！";}
        }
        if($cfdian){
            $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian+$cfdian")));

            $result2=D('ZhanbuFanpai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'fanpai' => $cfdian.'CF点',
                'fanpaitime' => time(),
                'fanpaiobj' => '卡牌'.$obj,
                'fanpaimubiao' => $mubiao
            ));

            if(!($result1&&$result2)){echo "数据出错！";}
        }
        
    }

    //ajax获取占卜购买记录接口
    public function ajaxGetZhanbuGoumai()
    {
        $where=array();//where条件的数组
        
        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的购买记录
        if($userid) {$where['userid'] = array('eq', $userid);}
        
        $data = D('ZhanbuGoumai')->get_zhanbu_goumai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json
        
    }

    //ajax获取占卜翻牌记录接口
    public function ajaxGetZhanbuFanpai()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的翻牌记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('ZhanbuFanpai')->get_zhanbu_fanpai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取占卜公告数据接口
    public function ajaxGetZhanbuGonggao()
    {
        $data = D('ZhanbuFanpai')->get_zhanbu_gonggao();//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json
    }


    
    
    

















    /**********************************************************************************************************/

    //刮刮乐活动
    public function guaguale(){

        if($_SESSION['ok'])
        {

            $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');
            
            
            $jifen=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('jifen');
            $guaguaka=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('guaguaka');
            $guaka_count=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('guaka_count');
            $pay=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('pay');

            $count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('count');
            $v_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('v_count');
            $k_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('k_count');
            $juese_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('juese_count');

            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');

            $huodongshuoming=D('Notice')->where(array('noticeid'=>3))->getField('content');


            $this->assign('myqb',$myqb);
            $this->assign('mycfdian',$mycfdian);
            
            
            
            $this->assign('jifen',$jifen);
            $this->assign('guaguaka',$guaguaka);
            $this->assign('guaka_count',$guaka_count);
            $this->assign('pay',$pay);
            $this->assign('count',$count);
            $this->assign('v_count',$v_count);
            $this->assign('k_count',$k_count);
            $this->assign('juese_count',$juese_count);

            $this->assign('head',$head);

            $this->assign('huodongshuoming',$huodongshuoming);
            
            //dump($_SESSION['ok']);
            $this->display();
        }
        else
        {
            //redirect('Login/login',3,'你还没有登录！');
            $this->error('你还没有登录！',U('Login/login'));
        }
    }

    //ajax刷新统计区域数据（剩余积分）
    public function ajax_get_tongji_data_jifen(){
        $jifen=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('jifen');
        echo $jifen;
    }

    //ajax刷新统计区域数据（剩余刮刮卡）
    public function ajax_get_tongji_data_guaguaka(){
        $guaguaka=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('guaguaka');
        echo $guaguaka;
    }

    //ajax刷新统计区域数据（刮卡次数）
    public function ajax_get_tongji_data_guaka_count(){
        $guaka_count=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('guaka_count');
        echo $guaka_count;
    }

    //ajax刷新统计区域数据（花费QB）
    public function ajax_get_tongji_data_pay(){
        $pay=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('pay');
        echo $pay;
    }

    //刮刮乐购买接口
    public function guaguale_pay(){
        //补上事务！！！！！！优化！！！！！！
        //$pay_qb=$_GET['pay_qb'];
        $pay_qb=I('get.pay_qb');
        $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$pay_qb")));
        $result2=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('pay'=>array('exp',"pay+$pay_qb")));
        if($pay_qb==10){
            $result3=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('guaguaka'=>array('exp',"guaguaka+1")));
            $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian+1000")));
            $result5=D('GuagualeChongzhi')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'chongzhi1' => '花费10QB充值1000CF点',
                'chongzhi2' => '1张',
                'chongzhitime' => time()
            ));
        }
        if($pay_qb==100){
            $result3=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('guaguaka'=>array('exp',"guaguaka+11")));
            $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian+10000")));
            $result5=D('GuagualeChongzhi')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'chongzhi1' => '花费100QB充值10000CF点',
                'chongzhi2' => '11张',
                'chongzhitime' => time()
            ));
        }
        if(!($result1&&$result2&&$result3&&$result4&&$result5)){echo "数据出错！";}
    }

    //刮刮乐刮卡接口①
    public function guaguale_guaka_1(){
        $result=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('guaguaka');
        if($result<=0)
        {
            echo "刮刮卡数量不足!";
        }
        else
        {
            echo "OK";
        }
    }

    //刮刮乐刮卡接口②
    public function guaguale_guaka_2(){
        $result1=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('guaka_count'=>array('exp',"guaka_count+1")));
        $result2=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('guaguaka'=>array('exp',"guaguaka-1")));
        if(!($result1&&$result2)){echo "数据出错！";}
    }

    //刮刮乐刮卡接口③
    public function guaguale_guaka_3(){
        
        //$jifen=$_GET['jifen'];
        $jifen=I('get.jifen');
        //$v=$_GET['v'];
        $v=I('get.v');
        //$k=$_GET['k'];
        $k=I('get.k');
        //$obj=$_GET['obj'];
        $obj=I('get.obj');
        
        if($obj=='sishen'){$obj='死神';}
        elseif($obj=='wuying'){$obj='无影';}
        elseif($obj=='tianlong'){$obj='天龙';}
        elseif($obj=='tulong'){$obj='屠龙';}
        elseif($obj=='xiuluo'){$obj='修罗';}
        elseif($obj=='wangzhezhixin'){$obj='王者之心';}

        if($jifen==0&&$v=='0'&&$k=='0'){
            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '无',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==1&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==2&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==3&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==5&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==10&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }
        elseif($jifen==100&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==200&&$v=='0'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => $jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==10&&$v=='sishen'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '死神（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='sishen'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '死神（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='sishen'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '死神（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='sishen'&&$k=='0'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '死神（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==10&&$v=='wuying'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '无影（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='wuying'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '无影（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='wuying'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '无影（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='wuying'&&$k=='0'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '无影（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==5&&$v=='tianlong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '天龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='tianlong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '天龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='tianlong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '天龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='tianlong'&&$k=='0'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '天龙（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==3&&$v=='tulong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '屠龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='tulong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '屠龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='tulong'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '屠龙（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='tulong'&&$k=='0'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '屠龙（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==5&&$v=='xiuluo'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '修罗（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='xiuluo'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '修罗（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='xiuluo'&&$k=='0'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '修罗（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='xiuluo'&&$k=='0'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '修罗（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }

        elseif($jifen==10&&$v=='0'&&$k=='wangzhezhixin'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$k"=>array('exp',"$k+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('k_count'=>array('exp',"k_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '王者之心（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==2&&$v=='0'&&$k=='wangzhezhixin'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$k"=>array('exp',"$k+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('k_count'=>array('exp',"k_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '王者之心（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==1&&$v=='0'&&$k=='wangzhezhixin'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$k"=>array('exp',"$k+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('k_count'=>array('exp',"k_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '王者之心（永久）+'.$jifen.'积分',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==0&&$v=='0'&&$k=='wangzhezhixin'){
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$k"=>array('exp',"$k+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('k_count'=>array('exp',"k_count+1")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '王者之心（永久）',
                'guakatime' => time(),
                'guakaobj' => $obj,
                'is_gonggao' => 1
            ));
        }
        elseif($jifen==10&&$v=='0'&&$k=='cajianerguo'){
            D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen+$jifen")));

            D('GuagualeGuaka')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'guaka' => '补偿'.$jifen.'积分（与王者擦肩而过）',
                'guakatime' => time(),
                'guakaobj' => $obj
            ));
        }


    }

    //刮刮乐兑换接口①（判断当前剩余积分是否充足）
    public function guaguale_duihuan_1(){
        //$pay_jifen=$_GET['pay_jifen'];
        $pay_jifen=I('get.pay_jifen');
        //echo $pay_jifen;exit;
        if($pay_jifen){
            $cur_jifen=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('jifen');
            if($cur_jifen>=$pay_jifen)
            {
                echo "OK";
            }
            else
            {
                echo "你的剩余积分不足哦";
            }
        }
    }

    //刮刮乐兑换接口②
    public function guaguale_duihuan_2(){
        //$jifen=$_GET['jifen'];
        $jifen=I('get.jifen');
        $result=D('Guaguale')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('jifen'=>array('exp',"jifen-$jifen")));
        if($result){echo "扣除积分成功！";}else{echo "数据出错！";}
    }

    //刮刮乐兑换接口③
    public function guaguale_duihuan_3(){
        //$v=$_GET['v'];
        $v=I('get.v');
        if($v){
            $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$v"=>array('exp',"$v+1")));
            $result2=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
            $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));

            if($v=='sishen'){
                $result4=D('GuagualeDuihuan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'duihuan' => '使用98积分兑换了死神（永久）',
                    'duihuantime' => time()
                ));
            }
            elseif($v=='wuying'){
                $result4=D('GuagualeDuihuan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'duihuan' => '使用98积分兑换了无影（永久）',
                    'duihuantime' => time()
                ));
            }
            elseif($v=='tianlong'){
                $result4=D('GuagualeDuihuan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'duihuan' => '使用80积分兑换了天龙（永久）',
                    'duihuantime' => time()
                ));
            }
            elseif($v=='tulong'){
                $result4=D('GuagualeDuihuan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'duihuan' => '使用60积分兑换了屠龙（永久）',
                    'duihuantime' => time()
                ));
            }
            elseif($v=='xiuluo'){
                $result4=D('GuagualeDuihuan')->add(array(
                    'userid' => $_SESSION['ok']['userid'],
                    'username' => $_SESSION['ok']['username'],
                    'duihuan' => '使用50积分兑换了修罗（永久）',
                    'duihuantime' => time()
                ));
            }

            if($result1&&$result2&&$result3&&$result4){echo "数据成功发送！";}else{echo "数据出错！";}
        }
    }

    //ajax获取刮刮乐充值记录接口
    public function ajaxGetGuagualeChongzhi()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的充值记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('GuagualeChongzhi')->get_guaguale_chongzhi($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取刮刮乐刮卡记录接口
    public function ajaxGetGuagualeGuaka()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的刮卡记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('GuagualeGuaka')->get_guaguale_guaka($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取刮刮乐兑换记录接口
    public function ajaxGetGuagualeDuihuan()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的兑换记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('GuagualeDuihuan')->get_guaguale_duihuan($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取刮刮乐公告数据接口
    public function ajaxGetGuagualeGonggao()
    {
        $data = D('GuagualeGuaka')->get_guaguale_gonggao();//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json
    }


    /**********************************************************************************************************/

    
    //生财宝箱活动
    public function shengcaibaoxiang(){

        if($_SESSION['ok'])
        {

            //dump($_SESSION['ok']);die;
            $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');


            $yaoshi=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('yaoshi');
            $zhongjiang_count=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhongjiang_count');
            $kaixiang_count=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('kaixiang_count');
            $spend=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('spend');
            $leijihuode_cfdian=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('leijihuode_cfdian');

            $count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('count');
            $v_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('v_count');
            $k_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('k_count');
            $juese_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('juese_count');

            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');

            $huodongshuoming=D('Notice')->where(array('noticeid'=>4))->getField('content');


            $this->assign('myqb',$myqb);
            $this->assign('mycfdian',$mycfdian);



            $this->assign('yaoshi',$yaoshi);
            $this->assign('zhongjiang_count',$zhongjiang_count);
            $this->assign('kaixiang_count',$kaixiang_count);
            $this->assign('spend',$spend);
            $this->assign('leijihuode_cfdian',$leijihuode_cfdian);


            $this->assign('count',$count);
            $this->assign('v_count',$v_count);
            $this->assign('k_count',$k_count);
            $this->assign('juese_count',$juese_count);

            $this->assign('head',$head);

            $this->assign('huodongshuoming',$huodongshuoming);

            //dump($_SESSION['ok']);
            $this->display();
        }
        else
        {
            //redirect('Login/login',3,'你还没有登录！');
            $this->error('你还没有登录！',U('Login/login'));
        }
    }

    //ajax刷新统计区域数据（剩余钥匙）
    public function ajax_get_tongji_data_yaoshi(){
        $yaoshi=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('yaoshi');
        echo $yaoshi;
    }

    //ajax刷新统计区域数据（中奖次数）
    public function ajax_get_tongji_data_zhongjiangcount(){
        $zhongjiang_count=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('zhongjiang_count');
        echo $zhongjiang_count;
    }

    //ajax刷新统计区域数据（开箱次数）
    public function ajax_get_tongji_data_kaixiang_count(){
        $kaixiang_count=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('kaixiang_count');
        echo $kaixiang_count;
    }

    //ajax刷新统计区域数据（消费QB）
    public function ajax_get_tongji_data_spend(){
        $spend=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('spend');
        echo $spend;
    }

    //ajax刷新统计区域数据（累计获得CF点）
    public function ajax_get_tongji_data_leijihuode_cfdian(){
        $leijihuode_cfdian=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('leijihuode_cfdian');
        echo $leijihuode_cfdian;
    }

    //生财宝箱购买接口
    public function shengcaibaoxiang_spend(){
        //补上事务！！！！！！优化！！！！！！
        //$spend_qb=$_GET['spend_qb'];
        $spend_qb=I('get.spend_qb');
        $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$spend_qb")));
        $result2=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('spend'=>array('exp',"spend+$spend_qb")));
        if($spend_qb==10){
            $result3=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('yaoshi'=>array('exp',"yaoshi+1")));
            $result4=D('ShengcaibaoxiangGoumai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'goumai' => '消费10QB购买1把钥匙',
                'goumaitime' => time()
            ));
        }
        if($spend_qb==100){
            $result3=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('yaoshi'=>array('exp',"yaoshi+11")));
            $result4=D('ShengcaibaoxiangGoumai')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'goumai' => '消费100QB购买11把钥匙',
                'goumaitime' => time()
            ));
        }
        if(!($result1&&$result2&&$result3&&$result4)){echo "数据出错！";}
    }

    //开启生财宝箱接口①（判断当前钥匙数量是否充足）
    public function kaiqishengcaibaoxiang_1(){

        $cur_yaoshi=D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('yaoshi');
        //echo $cur_yaoshi;die;
        if($cur_yaoshi>=1)
        {
            echo "OK";
        }
        else
        {
            echo "钥匙数量不足！";
        }

    }

    //开启生财宝箱接口②
    public function kaiqishengcaibaoxiang_2(){
        
        //开箱次数+1  钥匙数量-1
        D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('kaixiang_count'=>array('exp',"kaixiang_count+1")));
        D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('yaoshi'=>array('exp',"yaoshi-1")));
        
    }

    //开启生财宝箱接口③
    public function kaiqishengcaibaoxiang_3(){

        //中奖次数+1
        D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('zhongjiang_count'=>array('exp',"zhongjiang_count+1")));
    }

    //开启生财宝箱接口④
    public function kaiqishengcaibaoxiang_4(){

        //$cfdian=$_GET['cfdian'];
        $cfdian=I('get.cfdian');
        //更新累计获得的CF点
        D('Shengcaibaoxiang')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('leijihuode_cfdian'=>array('exp',"leijihuode_cfdian+$cfdian")));
        //获得CF点要使得CF点余额更新
        D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian+$cfdian")));
        //开箱结果要记录下来
        if($cfdian==88800||$cfdian==66600)
        {
            D('ShengcaibaoxiangKaixiang')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'kaixiang' => $cfdian.'CF点',
                'kaixiangtime' => time(),
                'is_gonggao' => 1
            ));
        }
        else
        {
            D('ShengcaibaoxiangKaixiang')->add(array(
                'userid' => $_SESSION['ok']['userid'],
                'username' => $_SESSION['ok']['username'],
                'kaixiang' => $cfdian.'CF点',
                'kaixiangtime' => time()
            ));
        }
    }

    //ajax获取生财宝箱购买记录接口
    public function ajaxGetShengcaibaoxiangGoumai()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的购买记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('ShengcaibaoxiangGoumai')->get_shengcaibaoxiang_goumai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取生财宝箱开箱记录接口
    public function ajaxGetShengcaibaoxiangKaixiang()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的开箱记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('ShengcaibaoxiangKaixiang')->get_shengcaibaoxiang_kaixiang($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //ajax获取生财宝箱公告数据接口
    public function ajaxGetShengcaibaoxiangGonggao()
    {
        $data = D('ShengcaibaoxiangKaixiang')->get_shengcaibaoxiang_gonggao();//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json
    }

    

}
    