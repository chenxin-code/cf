<?php

class ZhanbuFanpaiModel extends Model {

    protected $connection = 'DB_CONFIG4';
    protected $tableName = 'zhanbu_fanpai';

    /**
     * 获取指定用户所有的占卜翻牌记录
     *
     */

    public function get_zhanbu_fanpai($where)
    {

        /************* 取数据 **************/
        /********** 翻页 ***********/
        $perpage = 10; // 每页条数
        $count = D('ZhanbuFanpai')->where($where)->count();  // 取总记录数
        //导入Page类
        import('ORG.Util.Page');
        $page=new Page($count,$perpage);//实例化分页类 传入总记录数和每页显示的记录数

        //$show=$page->show();//分页显示输出

        $data = D('ZhanbuFanpai')->where($where)->order('fanpaitime desc')//翻牌时间降序排列
        ->limit($page->firstRow.','.$page->listRows)
            ->select();

        /************ 返回数据 *************/
        return array(
            'data' => $data,
            //'show' => $show,
            'pageNumber' => ceil($count/$perpage) // 总页数
        );
    }


    /**
     * 获取占卜活动的公告数据
     *
     */

    public function get_zhanbu_gonggao()
    {
        /************* 取数据 **************/

        $data = D('ZhanbuFanpai')->where('is_gonggao=1')->order('fanpaitime desc')->select();//翻牌时间降序排列

        /************ 返回数据 *************/
        return array(
            'data' => $data
        );
    }

    /**
     * 后台获取指定搜索条件下所有的占卜翻牌记录
     *
     */

    public function admin_get_zhanbu_fanpai($where)
    {

        /************* 取数据 **************/
        /********** 翻页 ***********/
        $perpage = 10; // 每页条数
        $where_count = D('ZhanbuFanpai')->where($where)->count();  // 取满足搜索条件的总记录数
        $all_count = D('ZhanbuFanpai')->count();  // 取全部的总记录数
        //导入Page类
        import('ORG.Util.Page');
        $page=new Page($where_count,$perpage);//实例化分页类 传入总记录数和每页显示的记录数

        //$show=$page->show();//分页显示输出

        $data = D('ZhanbuFanpai')->where($where)->order('fanpaitime desc,userid asc')//翻牌时间降序排列  然后用户ID升序排列
        ->limit($page->firstRow.','.$page->listRows)
            ->select();

        /************ 返回数据 *************/
        return array(
            'data' => $data,
            //'show' => $show,
            'where_count' => $where_count,
            'percent' => round(($where_count/$all_count)*100,2),//满足指定搜索条件的总记录数占数据表总记录数的百分比（四舍五入取小数点后2位）
            'pageNumber' => ceil($where_count/$perpage)//总页数
        );
    }


}

