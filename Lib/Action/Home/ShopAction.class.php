<?php

class ShopAction extends Action {
    

	//游戏商城首页
    public function shopindex(){


        if($_SESSION['ok'])
        {

            $myqb=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('qb');
            $mycfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');

            $count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('count');
            $v_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('v_count');
            $k_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('k_count');
            $juese_count=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('juese_count');

            $head=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('head');

            $shangchenggaoshi=D('Notice')->where(array('noticeid'=>5))->getField('content');


            $this->assign('myqb',$myqb);
            $this->assign('mycfdian',$mycfdian);

            $this->assign('count',$count);
            $this->assign('v_count',$v_count);
            $this->assign('k_count',$k_count);
            $this->assign('juese_count',$juese_count);

            $this->assign('head',$head);

            $this->assign('shangchenggaoshi',$shangchenggaoshi);
            
            
            
            $this->display();
        }
        else
        {
            $this->error('你还没有登录！',U('Login/login'));
        }


    }

    //ajax获取所有商品
    public function ajaxGetGoods()
    {
        $data = D('Goods')->select();
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json
    }

    /*//QB购买
    public function qb_goumai(){}

    //CF点购买
    public function cfdian_goumai(){}*/

    //当前QB是否充足接口
    public function qb_is_enough(){

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

    //当前CF点是否充足接口
    public function cfdian_is_enough(){

        //$pay_cfdian=$_GET['pay_cfdian'];
        $pay_cfdian=I('get.pay_cfdian');
        //echo $pay_cfdian;exit;
        if($pay_cfdian){
            $cur_cfdian=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->getField('cfdian');
            if($cur_cfdian>=$pay_cfdian)
            {
                echo "OK";
            }
            else
            {
                echo "抱歉！你的CF点不足！";
            }
        }
    }

    //购买接口
    public function goumai(){

        //$pay_qb=$_GET['pay_qb'];
        $pay_qb=I('get.pay_qb');
        //echo $pay_qb;exit;
        //$pay_cfdian=$_GET['pay_cfdian'];
        $pay_cfdian=I('get.pay_cfdian');
        //echo $pay_cfdian;exit;
        //$goodsid=$_GET['goodsid'];
        $goodsid=I('get.goodsid');
        //echo $goodsid;exit;
        //$zhekou=$_GET['zhekou'];
        $zhekou=I('get.zhekou');
        if($zhekou==10){$zhekou='-';}
        elseif($zhekou==9){$zhekou='9折';}
        elseif($zhekou==8){$zhekou='8折';}
        //echo $zhekou;exit;



        $number=D('Goods')->where(array('goodsid'=>$goodsid))->getField('number');
        $goodsname=D('Goods')->where(array('goodsid'=>$goodsid))->getField('goodsname');
        $depot_name=D('Goods')->where(array('goodsid'=>$goodsid))->getField('depot_name');



        if($goodsid==1||$goodsid==2)//审判者   零  （相比大多数情况下------>武器总数不能+1  角色总数要+1）
        {
            //判断库存量
            if($number<=0)
            {
                echo "很抱歉！".$goodsname."已下架";
            }
            else
            {
                if($pay_qb)
                {
                    $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$pay_qb")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('juese_count'=>array('exp',"juese_count+1")));
                    $result5=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));
                    $result6=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_qb.'QB购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5&&$result6))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }
                elseif($pay_cfdian)
                {
                    $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian-$pay_cfdian")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('juese_count'=>array('exp',"juese_count+1")));
                    $result5=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));
                    $result6=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_cfdian.'CF点购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5&&$result6))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }

            }
        }
        elseif($goodsid==17)//苍雷  （相比大多数情况下------>V总数不能+1）
        {
            //判断库存量
            if($number<=0)
            {
                echo "很抱歉！".$goodsname."已下架";
            }
            else
            {
                if($pay_qb)
                {
                    $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$pay_qb")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
                    $result5=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_qb.'QB购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }
                elseif($pay_cfdian)
                {
                    $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian-$pay_cfdian")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
                    $result5=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_cfdian.'CF点购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }

            }
        }
        else//大多数情况下买的英雄武器对应的正常操作
        {
            //判断库存量
            if($number<=0)
            {
                echo "很抱歉！".$goodsname."已下架";
            }
            else
            {
                if($pay_qb)
                {
                    $result1=D('User')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('qb'=>array('exp',"qb-$pay_qb")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
                    $result5=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));
                    $result6=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_qb.'QB购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5&&$result6))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }
                elseif($pay_cfdian)
                {
                    $result1=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('cfdian'=>array('exp',"cfdian-$pay_cfdian")));
                    $result2=D('Goods')->where(array('goodsid'=>$goodsid))->save(array('number'=>array('exp',"number-1")));
                    $result3=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array("$depot_name"=>array('exp',"$depot_name+1")));
                    $result4=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('count'=>array('exp',"count+1")));
                    $result5=D('Depot')->where(array('userid'=>$_SESSION['ok']['userid']))->save(array('v_count'=>array('exp',"v_count+1")));
                    $result6=D('GoodsBuy')->add(array(
                        'userid' => $_SESSION['ok']['userid'],
                        'username' => $_SESSION['ok']['username'],
                        'buy' => '花费'.$pay_cfdian.'CF点购买'.$goodsname,
                        'buytime' => time(),
                        'zhekou' => $zhekou
                    ));

                    if(!($result1&&$result2&&$result3&&$result4&&$result5&&$result6))
                    {
                        echo "数据出错！";
                    }
                    else
                    {
                        echo "购买成功！".$goodsname."已发往游戏仓库";
                    }
                }

            }
        }

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

    //ajax获取购买记录接口
    public function ajaxGetGoumai()
    {
        $where=array();//where条件的数组

        //用户id
        //$userid = I('get.userid');
        //$userid = $_GET['userid'];
        $userid = $_SESSION['ok']['userid'];//这种写法暂时只能查询到自己的购买记录
        if($userid) {$where['userid'] = array('eq', $userid);}

        $data = D('GoodsBuy')->get_goumai($where);//调用模型里的方法
        //dump($data);die;
        $this->success($data, '', TRUE);  // 返回json

    }

    //根据接收到的商品ID去查询对应的商品名称并将其返回
    public function showGoodsname(){

        //$goodsid=$_GET['goodsid'];
        $goodsid=I('get.goodsid');
        //echo $goodsid;exit;
        $goodsname=D('Goods')->where(array('goodsid'=>$goodsid))->getField('goodsname');
        echo $goodsname;

    }
    


}