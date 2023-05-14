<?php

class ManagerModel extends Model {

    protected $connection = 'DB_CONFIG4';
    protected $tableName = 'manager';

    public function check($managername,$password)
    {
        
        $data = $this->where(array('managername' => $managername, 'password' => $password))->find();//find()方法加limit 1 限制

        return $data;

    }




}

