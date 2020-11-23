<?php
namespace Todo_Project;
use Todo_Project\Database;

class Query {

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function get_all_todos(){
        $sql = "SELECT * FROM `to-dos` ORDER BY `id`";
        $query = $this->db->pdo->prepare($sql);
        $query->execute();
        $result=$query->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    public function insert($name, $status = 'active'){

        $sql = "INSERT INTO `to-dos` ( name, status)
              VALUES (:name, :status)";
        $query = $this->db->pdo->prepare($sql);
        $query->bindValue(':name',$name);
        $query->bindValue(':status',$status);
        $result = $query->execute();
        return $this->db->pdo->lastInsertId();
        
    }

    public function update($id, $name, $status = 'active'){
        $sql = "UPDATE `to-dos` SET `name` = :name, `status` = :status WHERE `id` = :id;";
        $query = $this->db->pdo->prepare($sql);
        $query->bindValue(':id',$id);
        $query->bindValue(':name',$name);
        $query->bindValue(':status',$status);
        $result = $query->execute();
        return $result;
    }

    public function delete($id){
        $sql = "DELETE FROM `to-dos` WHERE id = :id";
        $query = $this->db->pdo->prepare($sql);
        $query->bindValue(':id',$id);
        $result = $query->execute();
        return $result;
    }

    public function deleteCompleted(){
        $sql = "DELETE FROM `to-dos` WHERE status = :status";
        $query = $this->db->pdo->prepare($sql);
        $query->bindValue(':status', 'completed');
        $result = $query->execute();
        return $result;
    }

}

?>