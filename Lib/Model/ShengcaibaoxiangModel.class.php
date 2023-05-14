<?php

class ShengcaibaoxiangModel extends Model {

    protected $connection = 'DB_CONFIG4';
    protected $tableName = 'shengcaibaoxiang';


    /**
     * 后台获取生财宝箱的分页信息
     *
     */

    public function admin_get_shengcaibaoxiang($where)
    {

        /************* 取数据 **************/
        /********** 翻页 ***********/
        $perpage = 10; // 每页条数
        $count = D('Shengcaibaoxiang')->where($where)->count();  // 取总记录数
        //导入Page类
        import('ORG.Util.Page');
        $page=new Page($count,$perpage);//实例化分页类 传入总记录数和每页显示的记录数

        //$show=$page->show();//分页显示输出

        $data = D('Shengcaibaoxiang')->where($where)->order('userid asc')//用户ID升序排列
        ->limit($page->firstRow.','.$page->listRows)
            ->select();

        /************ 返回数据 *************/
        return array(
            'data' => $data,
            //'show' => $show,
            'count' => $count,
            'pageNumber' => ceil($count/$perpage)//总页数
        );
    }
}

