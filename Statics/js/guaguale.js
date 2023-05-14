/*

js

作者百度ID:你是shou啊

*/



/*
//统计页面访问次数
window.onload = function()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            //alert(xhr.responseText);
            document.getElementById('see').innerHTML=xhr.responseText;
        }
    }
    xhr.open('get','/Statics/jiekou/tongji.php?ajax');
    xhr.send(null);

    /!*$.ajax({
        url:"http://localhost1/guaguale/tongji.php",
        success:function(data){
            alert(data);
        }
    });*!/
}

//吐槽作者
function tucao()
{
    var fm = document.getElementsByTagName('form')[0];//[0]代表第1个form元素
    var fd = new FormData(fm);//收集数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4){
            alert(xhr.responseText);
            if(xhr.responseText=='吐槽成功!')
            {
                //吐槽成功后禁用
                document.getElementById('tucao').innerHTML='<form><input name="data" type="text" placeholder="已吐槽过了" size="60" disabled="disabled" />' +
                    '<input type="button" value="已吐槽" disabled="disabled" />' +
                    '<input type="button" value="看看大家怎么吐槽" onclick="look()" /></form>';
            }
        }
    }
    xhr.open('post','./tucao.php');
    xhr.send(fd);
}

//吐槽输入框样式美化
function borderColor(){
    if(self['oText'].style.borderColor=='lawngreen'){
        self['oText'].style.borderColor = 'white';
    }else{
        self['oText'].style.borderColor = 'lawngreen';
    }
    oTime = setTimeout('borderColor()',300);
}

//看看大家怎么吐槽
function look(){

    window.open('tucao.html', 'newwindow', 'height=430, width=500, top=250, left=707, toolbar=no, menubar=no, scrollbars=yes, fullscreen=yes, resizable=no, location=no, status=no');

}
*/

//充值1000CF点获得刮刮卡1张
function qb_10(){
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4)
        {
            if(xhr.responseText=="数据出错！")
            {
                alert(xhr.responseText);
            }
            ajax_get_myqb_mycfdian();
            ajax_get_tongji_data();
            getChongzhi(1);
        }
    }
    xhr.open('get','guaguale_pay?pay_qb=10');
    xhr.send(null);
    
}

//充值10000CF点获得刮刮卡11张
function qb_100(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4)
        {
            if(xhr.responseText=="数据出错！")
            {
                alert(xhr.responseText);
            }
            ajax_get_myqb_mycfdian();
            ajax_get_tongji_data();
            getChongzhi(1);
        }
    }
    xhr.open('get','guaguale_pay?pay_qb=100');
    xhr.send(null);

}

//10QB充值确认框
function disp_confirm_10(){

    $('#qb_10').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="抱歉！你的QB不足！")
            {
                alert(xhr.responseText);
                $('#qb_10').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要花费10QB充值1000CF点吗?');
                if (r==true)
                {
                    qb_10();//调用10QB购买1个占卜球函数

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#qb_10').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','is_enough?pay_qb=10');
    xhr.send(null);
    
}

//100QB充值确认框
function disp_confirm_100(){

    $('#qb_100').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="抱歉！你的QB不足！")
            {
                alert(xhr.responseText);
                $('#qb_100').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要花费100QB充值10000CF点吗?');
                if (r==true)
                {
                    qb_100();//调用100QB购买11个占卜球函数

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#qb_100').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','is_enough?pay_qb=100');
    xhr.send(null);
    
}

//ajax刷新统计区域数据
function ajax_get_tongji_data(){
    
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState==4){
            document.getElementById('result5').innerHTML=xhr1.responseText;
        }
        else{
            document.getElementById('result5').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
        }
    }
    xhr1.open('get','ajax_get_tongji_data_jifen');
    xhr1.send(null);

    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function(){
        if(xhr2.readyState==4){
            document.getElementById('result3').innerHTML=xhr2.responseText;
        }
        else{
            document.getElementById('result3').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
        }
    }
    xhr2.open('get','ajax_get_tongji_data_guaguaka');
    xhr2.send(null);

    var xhr3 = new XMLHttpRequest();
    xhr3.onreadystatechange = function(){
        if(xhr3.readyState==4){
            document.getElementById('result1').innerHTML=xhr3.responseText;
        }
        else{
            document.getElementById('result1').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
        }
    }
    xhr3.open('get','ajax_get_tongji_data_guaka_count');
    xhr3.send(null);

    var xhr4 = new XMLHttpRequest();
    xhr4.onreadystatechange = function(){
        if(xhr4.readyState==4){
            document.getElementById('result4').innerHTML=xhr4.responseText;
        }
        else{
            document.getElementById('result4').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
        }
    }
    xhr4.open('get','ajax_get_tongji_data_pay');
    xhr4.send(null);
    
}

//ajax刷新我的QB我的CF点
function ajax_get_myqb_mycfdian(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){
        if(xhr1.readyState==4){
            document.getElementById('myqb').innerHTML=xhr1.responseText;
        }
        else{
            document.getElementById('myqb').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
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
            document.getElementById('mycfdian').innerHTML='<image src="/Statics/image/guaguale_image/wait1.jpg" />';
        }
    }
    xhr2.open('get','/index.php/Home/Login/ajax_get_mycfdian');//地址待改进（跨控制器）
    xhr2.send(null);

}

function hide_tishi(){
    document.getElementById('tishi').innerHTML="";
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
 获取某一页的充值记录并且覆盖上一页的
 **/
function getChongzhi(p){

    //var p=p;
    //console.log(p);

    $.ajax({
        //type:"get",
        url:"ajaxGetGuagualeChongzhi/p/"+p,//调用ajax获取刮刮乐充值记录接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据放到页面 *******************/

            var html='<table border="1px" cellspacing="0px" width="100%" style="border: solid 1px;" cellpadding="0" cellspacing="0">' +
                '<tr style="width:30px;"><th>用户名</th><th>充值方式</th><th>赠送刮刮卡</th><th>充值时间</th>';

            //var p=p;
            //console.log(p);

            //遍历
            $(data.info.data).each(function(k,v){

                //JS时间戳转换
                v.chongzhitime=getLocalTime(v.chongzhitime);

                //console.log(p);

                //核心语句   不能有</table>标签闭合 遍历完后才能加上闭合标签
                html +='<tr class="tron"><th>'+v.username+'</th><th>' +v.chongzhi1+'</th><th>' +v.chongzhi2+'</th><th>' +v.chongzhitime+'</th></tr>';
            });

            html=html+'</table>';//最后才加上闭合标签</table>

            $("#chongzhijilu").replaceWith("<div id='chongzhijilu'>"+html+"</div>");

            //console.log(parseInt(p)-1);
            //console.log(parseInt(p)+1);
            var prev=parseInt(p)-1<=0?1:parseInt(p)-1;
            var next=parseInt(p)+1>data.info.pageNumber?data.info.pageNumber:parseInt(p)+1;
            document.getElementById('chongzhijilu_page').innerHTML='<br /><font size="1">当前页/总页数</font>&nbsp;<font color="red" size="4">'+
                p+'</font>/<font color="red" size="4">'+data.info.pageNumber+'</font><br /><br /><input type="button" value="<<" onclick="getChongzhi(1)" />' +
                '<input type="button" value="<" onclick="getChongzhi('+prev+')" /><input type="button" value=">" onclick="getChongzhi('+
                next+')" /><input type="button" value=">>" onclick="getChongzhi('+data.info.pageNumber+')" />';

            //alert(data.info.pageNumber);

        }
    });
}

/**
 获取某一页的刮卡记录并且覆盖上一页的
 **/
function getGuaka(p){

    //var p=p;
    //console.log(p);

    $.ajax({
        //type:"get",
        url:"ajaxGetGuagualeGuaka/p/"+p,//调用ajax获取刮刮乐刮卡记录接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据放到页面 *******************/

            var html='<table border="1px" cellspacing="0px" width="100%" style="border: solid 1px;" cellpadding="0" cellspacing="0">' +
                '<tr style="width:30px;"><th>用户名</th><th>刮卡结果</th><th>刮卡时间</th><th>刮卡对象</th>';

            //var p=p;
            //console.log(p);

            //遍历
            $(data.info.data).each(function(k,v){

                //JS时间戳转换
                v.guakatime=getLocalTime(v.guakatime);

                //console.log(p);

                //核心语句   不能有</table>标签闭合 遍历完后才能加上闭合标签
                html +='<tr class="tron"><th>'+v.username+'</th><th>' +v.guaka+'</th><th>' +v.guakatime+'</th><th>' +v.guakaobj+'</th></tr>';
            });

            html=html+'</table>';//最后才加上闭合标签</table>

            $("#guakajilu").replaceWith("<div id='guakajilu'>"+html+"</div>");

            //console.log(parseInt(p)-1);
            //console.log(parseInt(p)+1);
            var prev=parseInt(p)-1<=0?1:parseInt(p)-1;
            var next=parseInt(p)+1>data.info.pageNumber?data.info.pageNumber:parseInt(p)+1;
            document.getElementById('guakajilu_page').innerHTML='<br /><font size="1">当前页/总页数</font>&nbsp;<font color="red" size="4">'+
                p+'</font>/<font color="red" size="4">'+data.info.pageNumber+'</font><br /><br /><input type="button" value="<<" onclick="getGuaka(1)" />' +
                '<input type="button" value="<" onclick="getGuaka('+prev+')" /><input type="button" value=">" onclick="getGuaka('+
                next+')" /><input type="button" value=">>" onclick="getGuaka('+data.info.pageNumber+')" />';

            //alert(data.info.pageNumber);

        }
    });
}

/**
 获取某一页的兑换记录并且覆盖上一页的
 **/
function getDuihuan(p){

    //var p=p;
    //console.log(p);

    $.ajax({
        //type:"get",
        url:"ajaxGetGuagualeDuihuan/p/"+p,//调用ajax获取刮刮乐兑换记录接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据放到页面 *******************/

            var html='<table border="1px" cellspacing="0px" width="100%" style="border: solid 1px;" cellpadding="0" cellspacing="0">' +
                '<tr style="width:30px;"><th>用户名</th><th>兑换信息</th><th>兑换时间</th>';

            //var p=p;
            //console.log(p);

            //遍历
            $(data.info.data).each(function(k,v){

                //JS时间戳转换
                v.duihuantime=getLocalTime(v.duihuantime);

                //console.log(p);

                //核心语句   不能有</table>标签闭合 遍历完后才能加上闭合标签
                html +='<tr class="tron"><th>'+v.username+'</th><th>' +v.duihuan+'</th><th>' +v.duihuantime+'</th></tr>';
            });

            html=html+'</table>';//最后才加上闭合标签</table>

            $("#duihuanjilu").replaceWith("<div id='duihuanjilu'>"+html+"</div>");

            //console.log(parseInt(p)-1);
            //console.log(parseInt(p)+1);
            var prev=parseInt(p)-1<=0?1:parseInt(p)-1;
            var next=parseInt(p)+1>data.info.pageNumber?data.info.pageNumber:parseInt(p)+1;
            document.getElementById('duihuanjilu_page').innerHTML='<br /><font size="1">当前页/总页数</font>&nbsp;<font color="red" size="4">'+
                p+'</font>/<font color="red" size="4">'+data.info.pageNumber+'</font><br /><br /><input type="button" value="<<" onclick="getDuihuan(1)" />' +
                '<input type="button" value="<" onclick="getDuihuan('+prev+')" /><input type="button" value=">" onclick="getDuihuan('+
                next+')" /><input type="button" value=">>" onclick="getDuihuan('+data.info.pageNumber+')" />';

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

//获取公告信息
function getGonggao(){

    $.ajax({
        //type:"get",
        url:"ajaxGetGuagualeGonggao",//调用ajax获取刮刮乐公告数据接口
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            var html='<li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li>';

            //遍历
            $(data.info.data).each(function(k,v){

                //JS时间戳转换
                v.guakatime=getLocalTime(v.guakatime);

                //中文括号不好看------>换成英文括号，（永久）------>(永久)
                //。。。。。。。。。。。。。。。。。。。。。。

                html +='<li><a>恭喜用户<font color="blue" size="3">'+v.username+'</font>刮出了<font color="red" size="3">'+v.guaka+'</font>【'+v.guakatime+'】</a></li>';

            });

            html +='<li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li><li><a>&nbsp;</a></li>';

            $("#ul").replaceWith("<ul id='ul'>"+html+"</ul>");


        }
    });
}

//加载该页面时就要去调用如下函数
window.onload = function(){
    getChongzhi(1);
    getGuaka(1);
    getDuihuan(1);
    getDepot();
    getGonggao();
}

/******************************************************/

function sishen(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得死神(永久)+10积分 其中死神(永久)已发往游戏仓库")
                        {
                            
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=sishen&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得死神(永久)+2积分 其中死神(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=sishen&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得死神(永久)+1积分 其中死神(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=sishen&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得死神(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=sishen&k=0&obj=sishen');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=sishen');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=sishen');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);

                    }
                }
                xhr2.open('get','/Statics/jiekou/sishen.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

function wuying(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得无影(永久)+10积分 其中无影(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=wuying&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得无影(永久)+2积分 其中无影(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=wuying&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得无影(永久)+1积分 其中无影(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=wuying&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得无影(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=wuying&k=0&obj=wuying');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=wuying');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=wuying');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);
                    }
                }
                xhr2.open('get','/Statics/jiekou/wuying.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

function tianlong(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得天龙(永久)+5积分 其中天龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=tianlong&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得天龙(永久)+2积分 其中天龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=tianlong&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得天龙(永久)+1积分 其中天龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=tianlong&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得天龙(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=tianlong&k=0&obj=tianlong');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=tianlong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=tianlong');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);
                    }
                }
                xhr2.open('get','/Statics/jiekou/tianlong.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

function tulong(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得屠龙(永久)+3积分 其中屠龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=tulong&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得屠龙(永久)+2积分 其中屠龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=tulong&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得屠龙(永久)+1积分 其中屠龙(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=tulong&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得屠龙(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=tulong&k=0&obj=tulong');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=tulong');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=tulong');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);
                    }
                }
                xhr2.open('get','/Statics/jiekou/tulong.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

function xiuluo(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得修罗(永久)+5积分 其中修罗(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=xiuluo&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得修罗(永久)+2积分 其中修罗(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=xiuluo&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得修罗(永久)+1积分 其中修罗(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=xiuluo&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得修罗(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=xiuluo&k=0&obj=xiuluo');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=xiuluo');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);
                    }
                }
                xhr2.open('get','/Statics/jiekou/xiuluo.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

function wangzhezhixin(){


    //刮一刮时就要禁用  防止连续刮卡时出现数据bug   ajax请求未完成时再刮卡触发该函数会出现统计数据bug
    document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';
    document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia_1.png" disabled="disabled" title="服务器响应延迟 禁止刮卡" />';

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="刮刮卡数量不足!")
            {
                alert(xhr1.responseText);
                //恢复禁用
                document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';
            }
            if(xhr1.responseText=="OK")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {

                        alert(xhr2.responseText);

                        //恢复禁用
                        document.getElementById('gua_1').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="sishen()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_2').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wuying()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_3').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tianlong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_4').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="tulong()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_5').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="xiuluo()" title="消耗1张刮刮卡" />';
                        document.getElementById('gua_6').innerHTML = '<input type="image" src="/Statics/image/guaguale_image/guayixia.png" onclick="wangzhezhixin()" title="消耗1张刮刮卡" />';


                        if(xhr2.responseText=="恭喜你获得200积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=200&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+200";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得100积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=100&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+100";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得王者之心(永久)+10积分 其中王者之心(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=wangzhezhixin&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得王者之心(永久)+2积分 其中王者之心(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=wangzhezhixin&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得王者之心(永久)+1积分 其中王者之心(永久)已发往游戏仓库")
                        {

                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=wangzhezhixin&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得王者之心(永久) 已发往游戏仓库")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                    getGonggao();
                                    getDepot();
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=wangzhezhixin&obj=wangzhezhixin');
                            xhr4.send(null);
                        }
                        if(xhr2.responseText=="很遗憾 你与王者之心(永久)擦肩而过 补偿你10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=cajianerguo&obj=wangzhezhixin');//k=擦肩而过
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得10积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=10&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+10";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得5积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=5&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+5";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得3积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=3&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+3";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得2积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=2&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+2";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="恭喜你获得1积分")
                        {
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=1&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);

                            document.getElementById('tishi').innerHTML="+1";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                        if(xhr2.responseText=="很遗憾 什么也没有")
                        {
                            /*无代码*/
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onreadystatechange = function(){

                                if(xhr4.readyState==4)
                                {
                                    if(xhr4.responseText=="数据出错！")
                                    {
                                        alert(xhr4.responseText);
                                    }
                                }
                            }
                            xhr4.open('get','guaguale_guaka_3?jifen=0&v=0&k=0&obj=wangzhezhixin');
                            xhr4.send(null);
                        }


                        var xhr3 = new XMLHttpRequest();
                        xhr3.onreadystatechange = function(){

                            if(xhr3.readyState==4)
                            {
                                if(xhr3.responseText=="数据出错！")
                                {
                                    alert(xhr3.responseText);
                                }
                            }
                        }
                        xhr3.open('get','guaguale_guaka_2');
                        xhr3.send(null);

                        ajax_get_tongji_data();
                        getGuaka(1);
                    }
                }
                xhr2.open('get','/Statics/jiekou/wangzhezhixin.php');
                xhr2.send(null);
            }
        }
    }
    xhr1.open('get','guaguale_guaka_1');
    xhr1.send(null);


}

/******************************************************/

function duihuan_sishen(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="数据出错！")
            {
                alert(xhr1.responseText);
            }
            if(xhr1.responseText=="扣除积分成功！")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {
                        if(xhr2.responseText=="数据出错！")
                        {
                            alert(xhr2.responseText);
                        }
                        if(xhr2.responseText=="数据成功发送！")
                        {
                            alert('恭喜你获得了死神(永久) 已发往游戏仓库');
                            getDepot();
                            document.getElementById('tishi').innerHTML="-98";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                    }
                }
                xhr2.open('get','guaguale_duihuan_3?v=sishen');
                xhr2.send(null);
            }

            ajax_get_tongji_data();
            getDuihuan(1);
        }
    }
    xhr1.open('get','guaguale_duihuan_2?jifen=98');
    xhr1.send(null);
    
}

function duihuan_wuying(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="数据出错！")
            {
                alert(xhr1.responseText);
            }
            if(xhr1.responseText=="扣除积分成功！")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {
                        if(xhr2.responseText=="数据出错！")
                        {
                            alert(xhr2.responseText);
                        }
                        if(xhr2.responseText=="数据成功发送！")
                        {
                            alert('恭喜你获得了无影(永久) 已发往游戏仓库');
                            getDepot();
                            document.getElementById('tishi').innerHTML="-98";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                    }
                }
                xhr2.open('get','guaguale_duihuan_3?v=wuying');
                xhr2.send(null);
            }

            ajax_get_tongji_data();
            getDuihuan(1);
        }
    }
    xhr1.open('get','guaguale_duihuan_2?jifen=98');
    xhr1.send(null);

}

function duihuan_tianlong(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="数据出错！")
            {
                alert(xhr1.responseText);
            }
            if(xhr1.responseText=="扣除积分成功！")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {
                        if(xhr2.responseText=="数据出错！")
                        {
                            alert(xhr2.responseText);
                        }
                        if(xhr2.responseText=="数据成功发送！")
                        {
                            alert('恭喜你获得了天龙(永久) 已发往游戏仓库');
                            getDepot();
                            document.getElementById('tishi').innerHTML="-80";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                    }
                }
                xhr2.open('get','guaguale_duihuan_3?v=tianlong');
                xhr2.send(null);
            }

            ajax_get_tongji_data();
            getDuihuan(1);
        }
    }
    xhr1.open('get','guaguale_duihuan_2?jifen=80');
    xhr1.send(null);

}

function duihuan_tulong(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="数据出错！")
            {
                alert(xhr1.responseText);
            }
            if(xhr1.responseText=="扣除积分成功！")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {
                        if(xhr2.responseText=="数据出错！")
                        {
                            alert(xhr2.responseText);
                        }
                        if(xhr2.responseText=="数据成功发送！")
                        {
                            alert('恭喜你获得了屠龙(永久) 已发往游戏仓库');
                            getDepot();
                            document.getElementById('tishi').innerHTML="-60";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                    }
                }
                xhr2.open('get','guaguale_duihuan_3?v=tulong');
                xhr2.send(null);
            }

            ajax_get_tongji_data();
            getDuihuan(1);
        }
    }
    xhr1.open('get','guaguale_duihuan_2?jifen=60');
    xhr1.send(null);

}

function duihuan_xiuluo(){

    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function(){

        if(xhr1.readyState==4)
        {
            if(xhr1.responseText=="数据出错！")
            {
                alert(xhr1.responseText);
            }
            if(xhr1.responseText=="扣除积分成功！")
            {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function(){

                    if(xhr2.readyState==4)
                    {
                        if(xhr2.responseText=="数据出错！")
                        {
                            alert(xhr2.responseText);
                        }
                        if(xhr2.responseText=="数据成功发送！")
                        {
                            alert('恭喜你获得了修罗(永久) 已发往游戏仓库');
                            getDepot();
                            document.getElementById('tishi').innerHTML="-50";
                            setTimeout("hide_tishi()",3000);//延时器
                        }
                    }
                }
                xhr2.open('get','guaguale_duihuan_3?v=xiuluo');
                xhr2.send(null);
            }

            ajax_get_tongji_data();
            getDuihuan(1);
        }
    }
    xhr1.open('get','guaguale_duihuan_2?jifen=50');
    xhr1.send(null);

}

/******************************************************/

function duihuan_sishen_before(){

    $('#0001').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="你的剩余积分不足哦")
            {
                alert(xhr.responseText);
                $('#0001').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要用98积分兑换死神(永久)吗?');
                if (r==true)
                {
                    duihuan_sishen();

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#0001').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','guaguale_duihuan_1?pay_jifen=98');
    xhr.send(null);

}

function duihuan_wuying_before(){

    $('#0002').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="你的剩余积分不足哦")
            {
                alert(xhr.responseText);
                $('#0002').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要用98积分兑换无影(永久)吗?');
                if (r==true)
                {
                    duihuan_wuying();

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#0002').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','guaguale_duihuan_1?pay_jifen=98');
    xhr.send(null);

}

function duihuan_tianlong_before(){

    $('#0003').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="你的剩余积分不足哦")
            {
                alert(xhr.responseText);
                $('#0003').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要用80积分兑换天龙(永久)吗?');
                if (r==true)
                {
                    duihuan_tianlong();

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#0003').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','guaguale_duihuan_1?pay_jifen=80');
    xhr.send(null);

}

function duihuan_tulong_before(){

    $('#0004').attr('disabled',"true");//添加disabled属性
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="你的剩余积分不足哦")
            {
                alert(xhr.responseText);
                $('#0004').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要用60积分兑换屠龙(永久)吗?');
                if (r==true)
                {
                    duihuan_tulong();

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#0004').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','guaguale_duihuan_1?pay_jifen=60');
    xhr.send(null);

}

function duihuan_xiuluo_before(){

    $('#0005').attr('disabled',"true");//添加disabled属性

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if(xhr.readyState==4)
        {
            if(xhr.responseText=="你的剩余积分不足哦")
            {
                alert(xhr.responseText);
                $('#0005').removeAttr("disabled");//移除disabled属性
            }
            if(xhr.responseText=="OK")
            {
                var r=confirm('确定要用50积分兑换修罗(永久)吗?');
                if (r==true)
                {
                    duihuan_xiuluo();

                    //document.write("You pressed OK!");
                }
                else
                {
                    //document.write("You pressed Cancel!");
                }
                $('#0005').removeAttr("disabled");//移除disabled属性
            }
        }
    }
    xhr.open('get','guaguale_duihuan_1?pay_jifen=50');
    xhr.send(null);

}



