<?php

/*

(王者之心)

ajax请求服务器端php文件获得刮刮卡结果

由php文件控制刮奖结果和概率

作者百度ID:你是shou啊

*/



/*******   控制中奖的概率   *********/

$s=rand(111,2399);
//echo $s;die;
$ss=rand(11,126);
//echo $ss;die;
$sss=rand(1,4);
//echo $sss;die;
$ssss=rand(1,4);//控制王者之心的概率
//echo $ssss;die;

/*********************************/

if($s==222)
{
	echo "恭喜你获得200积分";
}
elseif($s==333||$s==444)
{
	echo "恭喜你获得100积分";
}
elseif($s==555||$s==666)
{
	if($ssss==1)//到这里了还有1/4的概率才让你中王者之心  价值相当于400积分
	{
		if($sss==1)
		{
			echo "恭喜你获得王者之心(永久)+10积分 其中王者之心(永久)已发往游戏仓库";
		}
		elseif($sss==2)
		{
			echo "恭喜你获得王者之心(永久)+2积分 其中王者之心(永久)已发往游戏仓库";
		}
		elseif($sss==3)
		{
			echo "恭喜你获得王者之心(永久)+1积分 其中王者之心(永久)已发往游戏仓库";
		}
		elseif($sss==4)
		{
			echo "恭喜你获得王者之心(永久) 已发往游戏仓库";
		}
	}
	else
	{
		//到这里了还有3/4的概率不让你中王者之心  价值相当于400积分
		echo "很遗憾 你与王者之心(永久)擦肩而过 补偿你10积分";
	}

}
else
{
	if($ss==22)
	{
		echo "恭喜你获得10积分";
	}
	elseif($ss==33||$ss==44)
	{
		echo "恭喜你获得5积分";
	}
	elseif($ss==92||$ss==23||$ss==29)
	{
		echo "恭喜你获得3积分";
	}
	elseif($ss==85||$ss==25||$ss==36||$ss==98||$ss==52)
	{
		echo "恭喜你获得2积分";
	}
	elseif($ss==12||$ss==66||$ss==72||$ss==20||$ss==28||$ss==77||$ss==40||$ss==88||$ss==99||$ss==50)
	{
		echo "恭喜你获得1积分";
	}
	else
	{
		echo "很遗憾 什么也没有";
	}
}


