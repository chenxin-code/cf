/*

前台聊天室JS
后台站长聊天室JS
（共用）

*/


//通过ajax无刷新方式获得最新的聊天内容
var maxID = 0;
function showmessage(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            //alert(xhr.responseText);
            /*if(xhr.responseText)
             {
             playSound();
             }*/
            //string--->实体内容
            eval("var jn_info="+xhr.responseText);
            //var jn_info=xhr.responseText;
            //console.log(jn_info);
            //遍历jn_info的数组，把内容的信息与页面内容做结合
            var s = "";
            for(var i=0; i<jn_info.length; i++){
                /*s += "<p style='color:"+jn_info[i].color+"'>";
                 s += jn_info[i].sender+"&nbsp;对&nbsp;"+jn_info[i].receiver+"&nbsp;";
                 s += jn_info[i].biaoqing+"&nbsp;说："+jn_info[i].msg+"("+jn_info[i].add_time;
                 s += ")</p>";*/

                jn_info[i].sendtime=getLocalTime(jn_info[i].sendtime);

                //说明为站长发送的聊天消息
                if(jn_info[i].userid==-1&&jn_info[i].is_zhanzhang==1)
                {
                    s += "<input type='image' width='25' height='25' title='该用户为站长' src='/Statics/head/zhanzhang.jpg' onclick='alert(\"该用户为站长！\")' />"+
                        "<b><font size='1' color='red'>[站长]</font></b>&nbsp;<image width='15' height='15' src='/Statics/image/laba.jpg' />&nbsp;<b><font size='5'>"+jn_info[i].message+
                        "</font></b>&nbsp;["+jn_info[i].sendtime+"]<br />";
                }
                else//说明为普通用户发送的聊天消息
                {
                    var color=getRandomColor();

                    s += "<input type='image' width='25' height='25' title='点击头像查看"+jn_info[i].username+"的游戏仓库' src='"+jn_info[i].head+
                        "' onclick='TGDialogS(youxicangku_box,"+jn_info[i].userid+")' /><font size='1'>"+jn_info[i].username+
                        "</font>&nbsp;<image width='15' height='15' src='/Statics/image/laba.jpg' />&nbsp;<font size='2' color='"+color+"'>"+jn_info[i].message+
                        "</font>&nbsp;["+jn_info[i].sendtime+"]<br />";
                }

                //把已经获得记录的最大id值赋予给maxID
                maxID = jn_info[i].id;
            }
            var showmsg = document.getElementById('show_msg');
            showmsg.innerHTML += s;

            //设置滚动条卷起高度
            //showmsg.scrollTop = 200;
            //卷起高度等于 div本身高度，就可以使得滚动条始终在最下边显示
            showmsg.scrollTop = showmsg.scrollHeight;

        }
    }
    xhr.open('get','showshow?maxID='+maxID);
    xhr.send(null);
}

window.onload = function(){
    //showmessage(); //获得最新聊天内容
    setInterval("showmessage()",2000);//制作轮询(推技术)
}

function sendmsg(){
    var fm = document.getElementsByTagName('form')[0];
    var fd = new FormData(fm);//收集数据

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            //alert(xhr.responseText);
            document.getElementById('sendresult').innerHTML = xhr.responseText;

            document.getElementById('msg').value="";//消息
            //3s后使得发送聊天消息的标志信息消失
            setTimeout("hideresult()",3000);
        }
    }
    xhr.open('post','send');
    xhr.send(fd);
}

//使得发送聊天消息的标志信息消失
function hideresult(){
    document.getElementById('sendresult').innerHTML = "";
}

//JS时间戳转换函数
function getLocalTime(nS){
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//随机返回一个颜色（普通用户聊天消息字体的颜色，都为深色）
function getRandomColor(){
    var yongjiu_goods1 = ['red','blue','#AE00AE','#FF8000','#00A600','#408080','#AD5A5A','#AE8F00','#FF0080'];
    function sendNum1(arr1)
    {
        return arr1[Math.floor(Math.random()*arr1.length)];
    }
    var thisgood1 = sendNum1(yongjiu_goods1);//调用函数返回一个随机生成的数组里的元素

    return thisgood1;
}

//弹出层
function TGDialogS(e,userid){
    need("biz.dialog",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'gray',//弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity:50//弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
    //alert(userid);
    getThisDepot(userid);
}

//获取指定用户的游戏仓库数据并生成图片
function getThisDepot(userid){

    $.ajax({
        type:"get",
        url:"ajaxGetThisDepot",//调用ajax获取指定用户的游戏仓库数据接口
        data:{userid:userid},
        //dataType:"json",
        success:function(data)
        {

            //console.log(data.info.data);

            /*************** 把数据换成图片放到页面 *******************/

            var html='';

            //var color=getRandomColor_1();

            //遍历
            $(data.info.data).each(function(k,v){

                var color1=getRandomColor_1();for(var i=1;i<=v.shenpanzhe;i++){html +='<image src="/Statics/youxicangku/shenpanzhe.png" title="角色特点：①应急攻击②暗影利刃③灵魂武者④挑战模式移动增加⑤经验增加200%⑥同房间玩家经验值增加30%⑦同房间玩家GP增加20%" onmouseover="this.style.border=&quot;3px solid '+color1+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color2=getRandomColor_1();for(var i=1;i<=v.ling;i++){html +='<image src="/Statics/youxicangku/ling.png" title="情报部队培养的特殊要员，拥有几乎无敌的战斗能力，传奇故事在全世界佣兵之间广为流传" onmouseover="this.style.border=&quot;3px solid '+color2+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color3=getRandomColor_1();for(var i=1;i<=v.fuchouzhe;i++){html +='<image src="/Statics/youxicangku/fuchouzhe.png" title="复仇者是一支专门和生化武器作战的女性佣兵团，她们标志性的双斧在战斗中无往不利，在残酷的战场上，她们拼死战斗的英姿，赢得了无数佣兵的尊重" onmouseover="this.style.border=&quot;3px solid '+color3+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color4=getRandomColor_1();for(var i=1;i<=v.huoqilin;i++){html +='<image src="/Statics/youxicangku/huoqilin.png" title="整个枪身与火麒麟完美相融，是勇士不可或缺的神器，极具收藏价值" onmouseover="this.style.border=&quot;3px solid '+color4+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color5=getRandomColor_1();for(var i=1;i<=v.qilin;i++){html +='<image src="/Statics/youxicangku/qilin.png" title="整个枪身装备了麒麟的装甲，同时前端加装了锋利的麒麟刺，是一把外观与性能并重的武器" onmouseover="this.style.border=&quot;3px solid '+color5+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color6=getRandomColor_1();for(var i=1;i<=v.wuying;i++){html +='<image src="/Statics/youxicangku/wuying.png" title="银色的枪身闪耀着点点寒光，如受风神加护的利刃，静待着猎物的到来" onmouseover="this.style.border=&quot;3px solid '+color6+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color7=getRandomColor_1();for(var i=1;i<=v.heiwushi;i++){html +='<image src="/Statics/youxicangku/heiwushi.png" title="增加了野兽样式，霸气威武" onmouseover="this.style.border=&quot;3px solid '+color7+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color8=getRandomColor_1();for(var i=1;i<=v.wangzhezhixin;i++){html +='<image src="/Statics/youxicangku/wangzhezhixin.png" title="献给王者的礼物，只有最强的人才能拥有它" onmouseover="this.style.border=&quot;3px solid '+color8+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color9=getRandomColor_1();for(var i=1;i<=v.leishen;i++){html +='<image src="/Statics/youxicangku/leishen.png" title="整个枪身有蓝色的闪电环绕，犹如雷神下凡一般，摧毁一切与之对抗的敌人" onmouseover="this.style.border=&quot;3px solid '+color9+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color10=getRandomColor_1();for(var i=1;i<=v.heilong;i++){html +='<image src="/Statics/youxicangku/heilong.png" title="整个枪身与一条黑龙完美相融，具有极高的战斗属性" onmouseover="this.style.border=&quot;3px solid '+color10+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color11=getRandomColor_1();for(var i=1;i<=v.heiqishi;i++){html +='<image src="/Statics/youxicangku/heiqishi.png" title="冷酷的黑色盔甲，若隐若现的红色微光，如黑夜中的骑士一般静静的等待出征" onmouseover="this.style.border=&quot;3px solid '+color11+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color12=getRandomColor_1();for(var i=1;i<=v.sishen;i++){html +='<image src="/Statics/youxicangku/sishen.png" title="此枪一出，犹如冥界死神降临，横扫一切战场敌人" onmouseover="this.style.border=&quot;3px solid '+color12+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color13=getRandomColor_1();for(var i=1;i<=v.qianbian;i++){html +='<image src="/Statics/youxicangku/qianbian.png" title="基本结构相同，但使用了特殊材质，可切换皮肤" onmouseover="this.style.border=&quot;3px solid '+color13+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color14=getRandomColor_1();for(var i=1;i<=v.meiguijingling;i++){html +='<image src="/Statics/youxicangku/meiguijingling.png" title="枪身上跃动的玫瑰精灵会为战士们带来胜利的祝福" onmouseover="this.style.border=&quot;3px solid '+color14+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color15=getRandomColor_1();for(var i=1;i<=v.wangzhezhipo;i++){html +='<image src="/Statics/youxicangku/wangzhezhipo.png" title="纯金王者猛兽伏于枪身之一，象征了它主人的勇猛无人可及" onmouseover="this.style.border=&quot;3px solid '+color15+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color16=getRandomColor_1();for(var i=1;i<=v.jinniuzuo;i++){html +='<image src="/Statics/youxicangku/jinniuzuo.png" title="受到了金牛座的守护神阿佛洛狄忒的庇佑，拥有强大的威力和华丽闪耀的外观特效" onmouseover="this.style.border=&quot;3px solid '+color16+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color17=getRandomColor_1();for(var i=1;i<=v.tianxiezuo;i++){html +='<image src="/Statics/youxicangku/tianxiezuo.png" title="世界上最小的步枪受到天蝎座的哈迪斯的祝福，外形以华丽美观为特点" onmouseover="this.style.border=&quot;3px solid '+color17+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color18=getRandomColor_1();for(var i=1;i<=v.anjin94;i++){html +='<image src="/Statics/youxicangku/anjin94.png" title="暗金风暴版的俄罗斯突击步枪AN94，以华丽金色外观为特点" onmouseover="this.style.border=&quot;3px solid '+color18+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color19=getRandomColor_1();for(var i=1;i<=v.anjing11;i++){html +='<image src="/Statics/youxicangku/anjin_g11.png" title="射速奇快，使用特殊材质制作了暗金外观，具有很高的收藏价值" onmouseover="this.style.border=&quot;3px solid '+color19+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color20=getRandomColor_1();for(var i=1;i<=v.huangjinsl;i++){html +='<image src="/Statics/youxicangku/huangjin_sl.png" title="在黄金中渗入少量稀有金属铸造而成，具备卓越的性能" onmouseover="this.style.border=&quot;3px solid '+color20+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color21=getRandomColor_1();for(var i=1;i<=v.tianlong;i++){html +='<image src="/Statics/youxicangku/tianlong.png" title="整个枪身被一条飞翔的银龙缠绕，同时龙的头部成为了狙击的瞄准镜，整个武器与银龙图案完美相融，极具收藏价值" onmouseover="this.style.border=&quot;3px solid '+color21+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color22=getRandomColor_1();for(var i=1;i<=v.huimie;i++){html +='<image src="/Statics/youxicangku/huimie.png" title="暗黑与深红相间的枪身预示着毁灭一切的力量" onmouseover="this.style.border=&quot;3px solid '+color22+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color23=getRandomColor_1();for(var i=1;i<=v.jiguang;i++){html +='<image src="/Statics/youxicangku/jiguang.png" title="基本构造相同，但外型改造成了鲨鱼流线感觉" onmouseover="this.style.border=&quot;3px solid '+color23+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color24=getRandomColor_1();for(var i=1;i<=v.wangzhezhili;i++){html +='<image src="/Statics/youxicangku/wangzhezhili.png" title="象征王者力量的武器王者之力，它只属于在战场一最有实力的战士" onmouseover="this.style.border=&quot;3px solid '+color24+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color25=getRandomColor_1();for(var i=1;i<=v.wangzhezhinu;i++){html +='<image src="/Statics/youxicangku/wangzhezhinu.png" title="王者之怒虽然基本构造相同，但外观用特别材质制作，有金黄色猛兽的感觉" onmouseover="this.style.border=&quot;3px solid '+color25+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color26=getRandomColor_1();for(var i=1;i<=v.lielong;i++){html +='<image src="/Statics/youxicangku/lielong.png" title="枪身被一只飞翔的银龙缠绕，超大的携弹量，霸气的外观，绝对是收藏的不二选择" onmouseover="this.style.border=&quot;3px solid '+color26+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color27=getRandomColor_1();for(var i=1;i<=v.zhengfuzhe;i++){html +='<image src="/Statics/youxicangku/zhengfuzhe.png" title="改良过后的征服者在挑战模式中可以使用强力的爆破弹" onmouseover="this.style.border=&quot;3px solid '+color27+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color28=getRandomColor_1();for(var i=1;i<=v.panlong;i++){html +='<image src="/Statics/youxicangku/panlong.png" title="枪身盘绕着一条闪耀的银龙，是一把性能与外观并重的武器" onmouseover="this.style.border=&quot;3px solid '+color28+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color29=getRandomColor_1();for(var i=1;i<=v.canglei;i++){html +='<image src="/Statics/youxicangku/canglei.png" title="第一把专为挑战模式设计的武器" onmouseover="this.style.border=&quot;3px solid '+color29+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color30=getRandomColor_1();for(var i=1;i<=v.xiuluo;i++){html +='<image src="/Statics/youxicangku/xiuluo.png" title="如墨般沉郁的枪身中跃动着血色的修罗魂，它每一次出现都将用它的子弹和利刃惩罚敌人" onmouseover="this.style.border=&quot;3px solid '+color30+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color31=getRandomColor_1();for(var i=1;i<=v.wangzhezhihun;i++){html +='<image src="/Statics/youxicangku/wangzhezhihun.png" title="枪身雕刻了象征王者的猛兽形象，是一把在全球都屈指可数的限量版武器" onmouseover="this.style.border=&quot;3px solid '+color31+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color32=getRandomColor_1();for(var i=1;i<=v.tianchengzuo;i++){html +='<image src="/Statics/youxicangku/tianchengzuo.png" title="性能优异，拥有两种攻击模式的毛瑟手枪得到了天秤座守护神美的女神的庇佑，拥有了更华丽的外观和更大的弹匣" onmouseover="this.style.border=&quot;3px solid '+color32+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color33=getRandomColor_1();for(var i=1;i<=v.tulong;i++){html +='<image src="/Statics/youxicangku/tulong.png" title="暗金色的龙骨刀身，鲜红的龙爪握把，这是屠龙勇者的神兵" onmouseover="this.style.border=&quot;3px solid '+color33+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color34=getRandomColor_1();for(var i=1;i<=v.longxiao;i++){html +='<image src="/Statics/youxicangku/longxiao.png" title="传说中盘古创造世界所使用的神器，拥有开天辟地的神力" onmouseover="this.style.border=&quot;3px solid '+color34+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color35=getRandomColor_1();for(var i=1;i<=v.qingtian;i++){html +='<image src="/Statics/youxicangku/qingtian.png" title="一共结合十余种致命武器于一身，传说是威力惊人胜过任何武器十倍的杀人利器" onmouseover="this.style.border=&quot;3px solid '+color35+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color36=getRandomColor_1();for(var i=1;i<=v.qilinci;i++){html +='<image src="/Statics/youxicangku/qilinci.png" title="名匠们将光芒四射的材质雕刻成龙的形状，再镶嵌的一无价的宝石，做成双龙守护宝藏的造型，给人平静但凶猛的感觉，是众多收藏家们羡慕的收藏品" onmouseover="this.style.border=&quot;3px solid '+color36+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color37=getRandomColor_1();for(var i=1;i<=v.longlin;i++){html +='<image src="/Statics/youxicangku/longlin.png" title="纯金打造的尼泊尔军刀，黄金的外观彰显尊贵和霸气" onmouseover="this.style.border=&quot;3px solid '+color37+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color38=getRandomColor_1();for(var i=1;i<=v.anjinyingzhua;i++){html +='<image src="/Statics/youxicangku/anjinyingzhua.png" title="作为战场一道金色的闪光，黄金的鹰爪将撕裂每一个敌人" onmouseover="this.style.border=&quot;3px solid '+color38+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color39=getRandomColor_1();for(var i=1;i<=v.jinzhuan;i++){html +='<image src="/Statics/youxicangku/jinzhuan.png" title="沉甸甸的金砖，用它当武器还真是有点奢侈" onmouseover="this.style.border=&quot;3px solid '+color39+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color40=getRandomColor_1();for(var i=1;i<=v.huangjinjinggun;i++){html +='<image src="/Statics/youxicangku/huangjinjinggun.png" title="只有久经战场的军人才能获得的黄金警棍" onmouseover="this.style.border=&quot;3px solid '+color40+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color41=getRandomColor_1();for(var i=1;i<=v.ganjiangmoye;i++){html +='<image src="/Statics/youxicangku/ganjiangmoye.png" title="一古流传下的宝剑，分为雌雄双剑，雄剑干将，雌剑莫邪，双剑合璧，削铁如泥" onmouseover="this.style.border=&quot;3px solid '+color41+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color42=getRandomColor_1();for(var i=1;i<=v.wuweizhimao;i++){html +='<image src="/Statics/youxicangku/wuweizhimao.png" title="将电极被氧化的避雷针改成的近战武器无畏之矛，锋利的尾部及长长的利器使攻击很有威力" onmouseover="this.style.border=&quot;3px solid '+color42+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color43=getRandomColor_1();for(var i=1;i<=v.shenhaijuqian;i++){html +='<image src="/Statics/youxicangku/shenhaijuqian.png" title="以镰刀蟹的钳子为原型设计的近战武器，它的主人是经历过曙光战舰战役的精英战士" onmouseover="this.style.border=&quot;3px solid '+color43+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color44=getRandomColor_1();for(var i=1;i<=v.qinggang;i++){html +='<image src="/Statics/youxicangku/qinggang.png" title="黄金打造的短刀，是授予奋战在最前线的佣兵们的奖励" onmouseover="this.style.border=&quot;3px solid '+color44+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}
                var color45=getRandomColor_1();for(var i=1;i<=v.shenglizhiguang;i++){html +='<image src="/Statics/youxicangku/shenglizhiguang.png" title="利用高音和闪光使敌人暂时失去战斗能力的闪光弹，外观更是使用金黄色，非常绚丽" onmouseover="this.style.border=&quot;3px solid '+color45+'&quot;" onmouseout="this.style.border=&quot;none&quot;" />';}



            });

            $("#youxicangku").replaceWith("<div id='youxicangku'>"+html+"</div>");


        }
    });
}

//JS生成随机颜色（用户游戏仓库图片随机边框颜色）
function getRandomColor_1(){
    var c = '#';
    var cArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    for(var i = 0; i < 6;i++)
    {
        var cIndex = Math.round(Math.random()*15);
        c += cArray[cIndex];
    }
    return c;
}
