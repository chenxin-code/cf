/*

JS

*/


//加载该页面时就要去调用如下函数
window.onload = function(){
    getGoods();
    getGoumai(1);
    getDepot();
}

function getGoods(){


    $.ajax({
        //type:"get",
        url:"ajaxGetGoods",
        //dataType:"json",
        success:function(data)
        {

            console.log(data.info);

            /*************** 把数据放到页面 *******************/

            var html='';

            //遍历
            $(data.info).each(function(k,v){

                //核心语句
                if(v.number<=0)
                {
                    if(v.zhekou==10){
                        html += '<div class="class1"><div class="class2"><image src="'+v.logo+'" title="'+v.desc+'" /></div><div class="class3">'
                            +'<div class="class4"><b>'+v.goodsname+'</b></div><div class="class5"><b>售价：<font color="#ff4500">'+v.qb+'</font>QB/'
                            +'<font color="#1e90ff">'+v.cfdian+'</font>CF点</b></div><div class="class6"><b>库存：<font color="#9370db">'
                            +v.number+'</font>件</b></div><div class="class7"><input type="image" onclick="yixiajia()" src="/Statics/image/shop_image/yixiajia.png" title="已下架" /></div></div></div>';
                    }
                    else if(v.zhekou==9||v.zhekou==8){
                        html += '<div class="class1"><div class="class2"><image src="'+v.logo+'" title="'+v.desc+'" /></div><div class="class3">'
                            +'<div class="class4"><b>'+v.goodsname+'</b></div><div class="class5"><b>售价：<font color="#ff4500">'
                            +Math.round(v.qb*v.zhekou/10)+'</font>QB/<font color="#1e90ff">'+Math.round((v.cfdian/100)*v.zhekou/10)*100
                            +'</font>CF点</b><image src="/Statics/image/shop_image/'+v.zhekou+'zhe.png" title="'+v.zhekou+'折" /></div><div class="class6"><b>'
                            +'库存：<font color="#9370db">'+v.number+'</font>件</b></div><div class="class7"><input type="image" onclick="yixiajia()" src="/Statics/image/shop_image/yixiajia.png" title="已下架" /></div></div></div>';
                    }
                }
                else
                {
                    if(v.zhekou==10){
                        html += '<div class="class1"><div class="class2"><image src="'+v.logo+'" title="'+v.desc+'" /></div><div class="class3">'
                            +'<div class="class4"><b>'+v.goodsname+'</b></div><div class="class5"><b>售价：<font color="#ff4500">'+v.qb+'</font>QB/'
                            +'<font color="#1e90ff">'+v.cfdian+'</font>CF点</b></div><div class="class6"><b>库存：<font color="#9370db">'
                            +v.number+'</font>件</b></div><div class="class7"><input type="image" class="gm" onclick="qb_goumai('+v.qb+','+v.goodsid+','+v.zhekou+')" src="/Statics/image/shop_image/qb_goumai.png" title="'
                            +v.qb+'QB购买" /></div><div class="class8"><input type="image" class="gm" onclick="cfdian_goumai('+v.cfdian+','+v.goodsid+','+v.zhekou+')" src="/Statics/image/shop_image/cfdian_goumai.png" title="'
                            +v.cfdian+'CF点购买" /></div></div></div>';
                    }
                    else if(v.zhekou==9||v.zhekou==8){
                        html += '<div class="class1"><div class="class2"><image src="'+v.logo+'" title="'+v.desc+'" /></div><div class="class3">'
                            +'<div class="class4"><b>'+v.goodsname+'</b></div><div class="class5"><b>售价：<font color="#ff4500">'
                            +Math.round(v.qb*v.zhekou/10)+'</font>QB/<font color="#1e90ff">'
                            +Math.round((v.cfdian/100)*v.zhekou/10)*100+'</font>CF点</b><image src="/Statics/image/shop_image/'
                            +v.zhekou+'zhe.png" title="'+v.zhekou+'折" /></div><div class="class6"><b>库存：<font color="#9370db">'
                            +v.number+'</font>件</b></div><div class="class7"><input type="image" class="gm" onclick="qb_goumai('+Math.round(v.qb*v.zhekou/10)+','+v.goodsid+','+v.zhekou+')" src="/Statics/image/shop_image/qb_goumai.png" title="'
                            +Math.round(v.qb*v.zhekou/10)+'QB购买" /></div><div class="class8"><input type="image" class="gm" onclick="cfdian_goumai('+Math.round((v.cfdian/100)*v.zhekou/10)*100+','+v.goodsid+','+v.zhekou+')" src="/Statics/image/shop_image/cfdian_goumai.png" title="'
                            +Math.round((v.cfdian/100)*v.zhekou/10)*100+'CF点购买" /></div></div></div>';
                    }
                }
            });

            $('#allgoods').html(html);

        }
    });
}

function yixiajia(){
    alert('已下架！');
}

function qb_goumai(k1,k2,k3){
    //alert(k1);alert(k2);alert(k3);

    //先把按钮禁用
    $('.gm').attr('disabled',"true");
    $.ajax({
        url:'qb_is_enough',
        data:{pay_qb:k1},
        //dataType:'json',
        type:'get',
        success:function(data)
        {
            if(data=='OK')
            {
                $.ajax({
                    url:'showGoodsname',
                    data:{goodsid:k2},
                    //dataType:'json',
                    type:'get',
                    success:function(data)
                    {
                        var r=confirm('确定要花费'+k1+'QB购买'+data+'吗?');
                        if (r==true)
                        {
                            $.ajax({
                                url:'goumai',
                                data:{pay_qb:k1,goodsid:k2,zhekou:k3},//k2代表要购买的商品id     k3代表购买时的折扣
                                //dataType:'json',
                                type:'get',
                                success:function(data)
                                {
                                    alert(data);

                                    getGoumai(1);
                                    getDepot();
                                    ajax_get_myqb_mycfdian();

                                    //恢复按钮禁用
                                    $('.gm').removeAttr("disabled");
                                }
                            });

                            //document.write("You pressed OK!");
                        }
                        else
                        {
                            //恢复按钮禁用
                            $('.gm').removeAttr("disabled");
                            //document.write("You pressed Cancel!");
                        }
                    }
                });
            }
            else if(data=='抱歉！你的QB不足！')
            {
                alert(data);
                //恢复按钮禁用
                $('.gm').removeAttr("disabled");
            }
        }
    });
}

function cfdian_goumai(k1,k2,k3){
    //alert(k1);alert(k2);alert(k3);

    //先把按钮禁用
    $('.gm').attr('disabled',"true");
    $.ajax({
        url:'cfdian_is_enough',
        data:{pay_cfdian:k1},
        //dataType:'json',
        type:'get',
        success:function(data)
        {
            if(data=='OK')
            {
                $.ajax({
                    url:'showGoodsname',
                    data:{goodsid:k2},
                    //dataType:'json',
                    type:'get',
                    success:function(data)
                    {
                        var r=confirm('确定要花费'+k1+'CF点购买'+data+'吗?');
                        if (r==true)
                        {
                            $.ajax({
                                url:'goumai',
                                data:{pay_cfdian:k1,goodsid:k2,zhekou:k3},//k2代表要购买的商品id     k3代表购买时的折扣
                                //dataType:'json',
                                type:'get',
                                success:function(data)
                                {
                                    alert(data);

                                    getGoumai(1);
                                    getDepot();
                                    ajax_get_myqb_mycfdian();

                                    //恢复按钮禁用
                                    $('.gm').removeAttr("disabled");
                                }
                            });

                            //document.write("You pressed OK!");
                        }
                        else
                        {
                            //恢复按钮禁用
                            $('.gm').removeAttr("disabled");
                            //document.write("You pressed Cancel!");
                        }
                    }
                });
            }
            else if(data=='抱歉！你的CF点不足！')
            {
                alert(data);
                //恢复按钮禁用
                $('.gm').removeAttr("disabled");
            }
        }
    });
}

//ajax刷新我的QB我的CF点
function ajax_get_myqb_mycfdian(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState==4){
            document.getElementById('myqb').innerHTML=xhr1.responseText;
        }
        else{
            document.getElementById('myqb').innerHTML='<image src="/Statics/image/shop_image/wait1.jpg" />';
        }
    }
    xhr1.open('get','/index.php/Home/Login/ajax_get_myqb');//地址待改进（跨控制器）
    xhr1.send(null);

    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function(){
        if(xhr2.readyState==4){
            document.getElementById('mycfdian').innerHTML=xhr2.responseText;
        }
        else{
            document.getElementById('mycfdian').innerHTML='<image src="/Statics/image/shop_image/wait1.jpg" />';
        }
    }
    xhr2.open('get','/index.php/Home/Login/ajax_get_mycfdian');//地址待改进（跨控制器）
    xhr2.send(null);

}

//弹出层
function TGDialogS(e){
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'gray',//弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:50//弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}

/**
 获取某一页的购买记录并且覆盖上一页的
 **/
function getGoumai(p){

    //var p=p;
    //console.log(p);

    $.ajax({
        //type:"get",
        url:"ajaxGetGoumai/p/"+p,//调用ajax获取购买记录接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据放到页面 *******************/

            var html='<table border="1px" cellspacing="0px" width="100%" style="border: solid 1px;" cellpadding="0" cellspacing="0">' +
                '<tr style="width:30px;"><th>用户名</th><th>购买信息</th><th>购买时间</th><th>折扣</th>';

            //var p=p;
            //console.log(p);

            //遍历
            $(data.info.data).each(function(k,v){

                //JS时间戳转换
                v.buytime=getLocalTime(v.buytime);

                //console.log(p);

                //核心语句   不能有</table>标签闭合 遍历完后才能加上闭合标签
                html +='<tr class="tron"><th>'+v.username+'</th><th>'+v.buy+'</th><th>'+v.buytime+'</th><th>'+v.zhekou+'</th></tr>';
            });

            html=html+'</table>';//最后才加上闭合标签</table>

            $("#goumaijilu").replaceWith("<div id='goumaijilu'>"+html+"</div>");

            //console.log(parseInt(p)-1);
            //console.log(parseInt(p)+1);
            var prev=parseInt(p)-1<=0?1:parseInt(p)-1;
            var next=parseInt(p)+1>data.info.pageNumber?data.info.pageNumber:parseInt(p)+1;
            document.getElementById('goumaijilu_page').innerHTML='<br /><font size="1">当前页/总页数</font>&nbsp;<font color="red" size="4">'+
                p+'</font>/<font color="red" size="4">'+data.info.pageNumber+'</font><br /><br /><input type="button" value="<<" onclick="getGoumai(1)" />' +
                '<input type="button" value="<" onclick="getGoumai('+prev+')" /><input type="button" value=">" onclick="getGoumai('+
                next+')" /><input type="button" value=">>" onclick="getGoumai('+data.info.pageNumber+')" />';

            //alert(data.info.pageNumber);

        }
    });
}

/**
 获取用户的游戏仓库数据并生成图片
 **/
function getDepot(){

    $.ajax({
        //type:"get",
        url:"ajaxGetDepot",//调用ajax获取游戏仓库数据接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据换成图片放到页面 *******************/

            var html='';

            //var color=getRandomColor();

            //遍历
            $(data.info.data).each(function(k,v){

                var color1=getRandomColor();for(var i=1;i<=v.shenpanzhe;i++){html +='<image src="/Statics/youxicangku/shenpanzhe.png" title="角色特点：①应急攻击②暗影利刃③灵魂武者④挑战模式移动增加⑤经验增加200%⑥同房间玩家经验值增加30%⑦同房间玩家GP增加20%" onmouseover="this.style.border=&quot;3px solid '+color1+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color2=getRandomColor();for(var i=1;i<=v.ling;i++){html +='<image src="/Statics/youxicangku/ling.png" title="情报部队培养的特殊要员，拥有几乎无敌的战斗能力，传奇故事在全世界佣兵之间广为流传" onmouseover="this.style.border=&quot;3px solid '+color2+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color3=getRandomColor();for(var i=1;i<=v.fuchouzhe;i++){html +='<image src="/Statics/youxicangku/fuchouzhe.png" title="复仇者是一支专门和生化武器作战的女性佣兵团，她们标志性的双斧在战斗中无往不利，在残酷的战场上，她们拼死战斗的英姿，赢得了无数佣兵的尊重" onmouseover="this.style.border=&quot;3px solid '+color3+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color4=getRandomColor();for(var i=1;i<=v.huoqilin;i++){html +='<image src="/Statics/youxicangku/huoqilin.png" title="整个枪身与火麒麟完美相融，是勇士不可或缺的神器，极具收藏价值" onmouseover="this.style.border=&quot;3px solid '+color4+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color5=getRandomColor();for(var i=1;i<=v.qilin;i++){html +='<image src="/Statics/youxicangku/qilin.png" title="整个枪身装备了麒麟的装甲，同时前端加装了锋利的麒麟刺，是一把外观与性能并重的武器" onmouseover="this.style.border=&quot;3px solid '+color5+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color6=getRandomColor();for(var i=1;i<=v.wuying;i++){html +='<image src="/Statics/youxicangku/wuying.png" title="银色的枪身闪耀着点点寒光，如受风神加护的利刃，静待着猎物的到来" onmouseover="this.style.border=&quot;3px solid '+color6+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color7=getRandomColor();for(var i=1;i<=v.heiwushi;i++){html +='<image src="/Statics/youxicangku/heiwushi.png" title="增加了野兽样式，霸气威武" onmouseover="this.style.border=&quot;3px solid '+color7+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color8=getRandomColor();for(var i=1;i<=v.wangzhezhixin;i++){html +='<image src="/Statics/youxicangku/wangzhezhixin.png" title="献给王者的礼物，只有最强的人才能拥有它" onmouseover="this.style.border=&quot;3px solid '+color8+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color9=getRandomColor();for(var i=1;i<=v.leishen;i++){html +='<image src="/Statics/youxicangku/leishen.png" title="整个枪身有蓝色的闪电环绕，犹如雷神下凡一般，摧毁一切与之对抗的敌人" onmouseover="this.style.border=&quot;3px solid '+color9+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color10=getRandomColor();for(var i=1;i<=v.heilong;i++){html +='<image src="/Statics/youxicangku/heilong.png" title="整个枪身与一条黑龙完美相融，具有极高的战斗属性" onmouseover="this.style.border=&quot;3px solid '+color10+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color11=getRandomColor();for(var i=1;i<=v.heiqishi;i++){html +='<image src="/Statics/youxicangku/heiqishi.png" title="冷酷的黑色盔甲，若隐若现的红色微光，如黑夜中的骑士一般静静的等待出征" onmouseover="this.style.border=&quot;3px solid '+color11+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color12=getRandomColor();for(var i=1;i<=v.sishen;i++){html +='<image src="/Statics/youxicangku/sishen.png" title="此枪一出，犹如冥界死神降临，横扫一切战场敌人" onmouseover="this.style.border=&quot;3px solid '+color12+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color13=getRandomColor();for(var i=1;i<=v.qianbian;i++){html +='<image src="/Statics/youxicangku/qianbian.png" title="基本结构相同，但使用了特殊材质，可切换皮肤" onmouseover="this.style.border=&quot;3px solid '+color13+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color14=getRandomColor();for(var i=1;i<=v.meiguijingling;i++){html +='<image src="/Statics/youxicangku/meiguijingling.png" title="枪身上跃动的玫瑰精灵会为战士们带来胜利的祝福" onmouseover="this.style.border=&quot;3px solid '+color14+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color15=getRandomColor();for(var i=1;i<=v.wangzhezhipo;i++){html +='<image src="/Statics/youxicangku/wangzhezhipo.png" title="纯金王者猛兽伏于枪身之一，象征了它主人的勇猛无人可及" onmouseover="this.style.border=&quot;3px solid '+color15+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color16=getRandomColor();for(var i=1;i<=v.jinniuzuo;i++){html +='<image src="/Statics/youxicangku/jinniuzuo.png" title="受到了金牛座的守护神阿佛洛狄忒的庇佑，拥有强大的威力和华丽闪耀的外观特效" onmouseover="this.style.border=&quot;3px solid '+color16+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color17=getRandomColor();for(var i=1;i<=v.tianxiezuo;i++){html +='<image src="/Statics/youxicangku/tianxiezuo.png" title="世界上最小的步枪受到天蝎座的哈迪斯的祝福，外形以华丽美观为特点" onmouseover="this.style.border=&quot;3px solid '+color17+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color18=getRandomColor();for(var i=1;i<=v.anjin94;i++){html +='<image src="/Statics/youxicangku/anjin94.png" title="暗金风暴版的俄罗斯突击步枪AN94，以华丽金色外观为特点" onmouseover="this.style.border=&quot;3px solid '+color18+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color19=getRandomColor();for(var i=1;i<=v.anjing11;i++){html +='<image src="/Statics/youxicangku/anjin_g11.png" title="射速奇快，使用特殊材质制作了暗金外观，具有很高的收藏价值" onmouseover="this.style.border=&quot;3px solid '+color19+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color20=getRandomColor();for(var i=1;i<=v.huangjinsl;i++){html +='<image src="/Statics/youxicangku/huangjin_sl.png" title="在黄金中渗入少量稀有金属铸造而成，具备卓越的性能" onmouseover="this.style.border=&quot;3px solid '+color20+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color21=getRandomColor();for(var i=1;i<=v.tianlong;i++){html +='<image src="/Statics/youxicangku/tianlong.png" title="整个枪身被一条飞翔的银龙缠绕，同时龙的头部成为了狙击的瞄准镜，整个武器与银龙图案完美相融，极具收藏价值" onmouseover="this.style.border=&quot;3px solid '+color21+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color22=getRandomColor();for(var i=1;i<=v.huimie;i++){html +='<image src="/Statics/youxicangku/huimie.png" title="暗黑与深红相间的枪身预示着毁灭一切的力量" onmouseover="this.style.border=&quot;3px solid '+color22+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color23=getRandomColor();for(var i=1;i<=v.jiguang;i++){html +='<image src="/Statics/youxicangku/jiguang.png" title="基本构造相同，但外型改造成了鲨鱼流线感觉" onmouseover="this.style.border=&quot;3px solid '+color23+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color24=getRandomColor();for(var i=1;i<=v.wangzhezhili;i++){html +='<image src="/Statics/youxicangku/wangzhezhili.png" title="象征王者力量的武器王者之力，它只属于在战场一最有实力的战士" onmouseover="this.style.border=&quot;3px solid '+color24+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color25=getRandomColor();for(var i=1;i<=v.wangzhezhinu;i++){html +='<image src="/Statics/youxicangku/wangzhezhinu.png" title="王者之怒虽然基本构造相同，但外观用特别材质制作，有金黄色猛兽的感觉" onmouseover="this.style.border=&quot;3px solid '+color25+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color26=getRandomColor();for(var i=1;i<=v.lielong;i++){html +='<image src="/Statics/youxicangku/lielong.png" title="枪身被一只飞翔的银龙缠绕，超大的携弹量，霸气的外观，绝对是收藏的不二选择" onmouseover="this.style.border=&quot;3px solid '+color26+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color27=getRandomColor();for(var i=1;i<=v.zhengfuzhe;i++){html +='<image src="/Statics/youxicangku/zhengfuzhe.png" title="改良过后的征服者在挑战模式中可以使用强力的爆破弹" onmouseover="this.style.border=&quot;3px solid '+color27+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color28=getRandomColor();for(var i=1;i<=v.panlong;i++){html +='<image src="/Statics/youxicangku/panlong.png" title="枪身盘绕着一条闪耀的银龙，是一把性能与外观并重的武器" onmouseover="this.style.border=&quot;3px solid '+color28+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color29=getRandomColor();for(var i=1;i<=v.canglei;i++){html +='<image src="/Statics/youxicangku/canglei.png" title="第一把专为挑战模式设计的武器" onmouseover="this.style.border=&quot;3px solid '+color29+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color30=getRandomColor();for(var i=1;i<=v.xiuluo;i++){html +='<image src="/Statics/youxicangku/xiuluo.png" title="如墨般沉郁的枪身中跃动着血色的修罗魂，它每一次出现都将用它的子弹和利刃惩罚敌人" onmouseover="this.style.border=&quot;3px solid '+color30+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color31=getRandomColor();for(var i=1;i<=v.wangzhezhihun;i++){html +='<image src="/Statics/youxicangku/wangzhezhihun.png" title="枪身雕刻了象征王者的猛兽形象，是一把在全球都屈指可数的限量版武器" onmouseover="this.style.border=&quot;3px solid '+color31+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color32=getRandomColor();for(var i=1;i<=v.tianchengzuo;i++){html +='<image src="/Statics/youxicangku/tianchengzuo.png" title="性能优异，拥有两种攻击模式的毛瑟手枪得到了天秤座守护神美的女神的庇佑，拥有了更华丽的外观和更大的弹匣" onmouseover="this.style.border=&quot;3px solid '+color32+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color33=getRandomColor();for(var i=1;i<=v.tulong;i++){html +='<image src="/Statics/youxicangku/tulong.png" title="暗金色的龙骨刀身，鲜红的龙爪握把，这是屠龙勇者的神兵" onmouseover="this.style.border=&quot;3px solid '+color33+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color34=getRandomColor();for(var i=1;i<=v.longxiao;i++){html +='<image src="/Statics/youxicangku/longxiao.png" title="传说中盘古创造世界所使用的神器，拥有开天辟地的神力" onmouseover="this.style.border=&quot;3px solid '+color34+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color35=getRandomColor();for(var i=1;i<=v.qingtian;i++){html +='<image src="/Statics/youxicangku/qingtian.png" title="一共结合十余种致命武器于一身，传说是威力惊人胜过任何武器十倍的杀人利器" onmouseover="this.style.border=&quot;3px solid '+color35+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color36=getRandomColor();for(var i=1;i<=v.qilinci;i++){html +='<image src="/Statics/youxicangku/qilinci.png" title="名匠们将光芒四射的材质雕刻成龙的形状，再镶嵌的一无价的宝石，做成双龙守护宝藏的造型，给人平静但凶猛的感觉，是众多收藏家们羡慕的收藏品" onmouseover="this.style.border=&quot;3px solid '+color36+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color37=getRandomColor();for(var i=1;i<=v.longlin;i++){html +='<image src="/Statics/youxicangku/longlin.png" title="纯金打造的尼泊尔军刀，黄金的外观彰显尊贵和霸气" onmouseover="this.style.border=&quot;3px solid '+color37+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color38=getRandomColor();for(var i=1;i<=v.anjinyingzhua;i++){html +='<image src="/Statics/youxicangku/anjinyingzhua.png" title="作为战场一道金色的闪光，黄金的鹰爪将撕裂每一个敌人" onmouseover="this.style.border=&quot;3px solid '+color38+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color39=getRandomColor();for(var i=1;i<=v.jinzhuan;i++){html +='<image src="/Statics/youxicangku/jinzhuan.png" title="沉甸甸的金砖，用它当武器还真是有点奢侈" onmouseover="this.style.border=&quot;3px solid '+color39+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color40=getRandomColor();for(var i=1;i<=v.huangjinjinggun;i++){html +='<image src="/Statics/youxicangku/huangjinjinggun.png" title="只有久经战场的军人才能获得的黄金警棍" onmouseover="this.style.border=&quot;3px solid '+color40+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color41=getRandomColor();for(var i=1;i<=v.ganjiangmoye;i++){html +='<image src="/Statics/youxicangku/ganjiangmoye.png" title="一古流传下的宝剑，分为雌雄双剑，雄剑干将，雌剑莫邪，双剑合璧，削铁如泥" onmouseover="this.style.border=&quot;3px solid '+color41+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color42=getRandomColor();for(var i=1;i<=v.wuweizhimao;i++){html +='<image src="/Statics/youxicangku/wuweizhimao.png" title="将电极被氧化的避雷针改成的近战武器无畏之矛，锋利的尾部及长长的利器使攻击很有威力" onmouseover="this.style.border=&quot;3px solid '+color42+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color43=getRandomColor();for(var i=1;i<=v.shenhaijuqian;i++){html +='<image src="/Statics/youxicangku/shenhaijuqian.png" title="以镰刀蟹的钳子为原型设计的近战武器，它的主人是经历过曙光战舰战役的精英战士" onmouseover="this.style.border=&quot;3px solid '+color43+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color44=getRandomColor();for(var i=1;i<=v.qinggang;i++){html +='<image src="/Statics/youxicangku/qinggang.png" title="黄金打造的短刀，是授予奋战在最前线的佣兵们的奖励" onmouseover="this.style.border=&quot;3px solid '+color44+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color45=getRandomColor();for(var i=1;i<=v.shenglizhiguang;i++){html +='<image src="/Statics/youxicangku/shenglizhiguang.png" title="利用高音和闪光使敌人暂时失去战斗能力的闪光弹，外观更是使用金黄色，非常绚丽" onmouseover="this.style.border=&quot;3px solid '+color45+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}



            });

            $("#youxicangku").replaceWith("<div id='youxicangku'>"+html+"</div>");


        }
    });
}

//JS生成随机颜色（图片随机边框颜色）
function getRandomColor(){
    var c = '#';
    var cArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    for(var i = 0; i < 6;i++)
    {
        var cIndex = Math.round(Math.random()*15);
        c += cArray[cIndex];
    }
    return c;
}

//JS时间戳转换函数
function getLocalTime(unixtime){
    var timestr = new Date(parseInt(unixtime) * 1000);
    var datetime = timestr.toLocaleString().replace(/年|月/g,"-").replace(/日/g," ");
    return datetime;
}