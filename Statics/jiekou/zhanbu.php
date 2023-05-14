<?php

/*

ajax请求服务器端php文件返回中奖信息

由php文件决定是否中奖 控制中奖的概率 神器在第几张卡牌下

作者百度ID:你是shou啊

*/

$hql='';
$ls='';
$jg='';
$hl='';
$hm='';
$hws='';
$hqs='';

//var_dump($_GET);die;

if(isset($_GET['hql'])){$hql=$_GET['hql'];}
if(isset($_GET['ls'])){$ls=$_GET['ls'];}
if(isset($_GET['jg'])){$jg=$_GET['jg'];}
if(isset($_GET['hl'])){$hl=$_GET['hl'];}
if(isset($_GET['hm'])){$hm=$_GET['hm'];}
if(isset($_GET['hws'])){$hws=$_GET['hws'];}
if(isset($_GET['hqs'])){$hqs=$_GET['hqs'];}

/*******   控制中奖的概率   *********/

$s=rand(10,150);
//echo $s;die;
$ss=rand(1,2);
//echo $ss;die;

/*********************************/

if($hql)
{
	if($hql==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 火麒麟(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 火麒麟(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 火麒麟(永久)在卡牌3";
			}
			
		}
			
	}
	elseif($hql==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 火麒麟(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 火麒麟(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 火麒麟(永久)在卡牌3";
			}
			
		}
	}
	elseif($hql==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 火麒麟(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 火麒麟(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 火麒麟(永久)在卡牌2";
			}
			
		}
	}

}

elseif($ls)
{
	if($ls==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 雷神(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 雷神(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 雷神(永久)在卡牌3";
			}
			
		}
			
	}
	elseif($ls==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 雷神(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 雷神(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 雷神(永久)在卡牌3";
			}
			
		}
	}
	elseif($ls==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 雷神(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 雷神(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 雷神(永久)在卡牌2";
			}
			
		}
	}

}

elseif($jg)
{
	if($jg==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 极光(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 极光(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 极光(永久)在卡牌3";
			}
			
		}
			
	}
	elseif($jg==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 极光(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 极光(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 极光(永久)在卡牌3";
			}
			
		}
	}
	elseif($jg==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 极光(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 极光(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 极光(永久)在卡牌2";
			}
			
		}
	}

}

elseif($hl)
{
	if($hl==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑龙(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑龙(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 黑龙(永久)在卡牌3";
			}
			
		}
			
	}
	elseif($hl==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑龙(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑龙(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑龙(永久)在卡牌3";
			}
			
		}
	}
	elseif($hl==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑龙(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑龙(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑龙(永久)在卡牌2";
			}
			
		}
	}

}

elseif($hm)
{
	if($hm==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 毁灭(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 毁灭(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 毁灭(永久)在卡牌3";
			}
			
		}
			
	}
	elseif($hm==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 毁灭(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 毁灭(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 毁灭(永久)在卡牌3";
			}
			
		}
	}
	elseif($hm==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 毁灭(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 毁灭(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 毁灭(永久)在卡牌2";
			}
			
		}
	}

}

elseif($hws)
{
	if($hws==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑武士(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑武士(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 黑武士(永久)在卡牌3";
			}

		}

	}
	elseif($hws==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑武士(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑武士(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑武士(永久)在卡牌3";
			}

		}
	}
	elseif($hws==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑武士(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑武士(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑武士(永久)在卡牌2";
			}

		}
	}

}

elseif($hqs)
{
	if($hqs==1)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑骑士(永久)在卡牌1";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑骑士(永久)在卡牌2";
			}
			else
			{
				echo "很遗憾 黑骑士(永久)在卡牌3";
			}

		}

	}
	elseif($hqs==2)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑骑士(永久)在卡牌2";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑骑士(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑骑士(永久)在卡牌3";
			}

		}
	}
	elseif($hqs==3)
	{
		if($s==66)
		{
			echo "恭喜中奖 黑骑士(永久)在卡牌3";
		}
		else
		{
			if($ss==1)
			{
				echo "很遗憾 黑骑士(永久)在卡牌1";
			}
			else
			{
				echo "很遗憾 黑骑士(永久)在卡牌2";
			}

		}
	}

}


