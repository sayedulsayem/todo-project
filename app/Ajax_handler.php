<?php
require '../vendor/autoload.php';

use Todo_Project\Query;

$query = new Query();

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {

    $response = [];

    $action = isset($_POST['action'])? $_POST['action']: '';
    $data = isset($_POST['data'])? $_POST['data']: [];
     
    switch($action){

        case 'insert':
            $name = (isset($data['name'])? $data['name']: '');
            $response = [
                'id' => $query->insert($name),
                'name' => $name,
                'status' => 'active',
            ];
            break;
        case 'update':
            $name = (isset($data['name'])? $data['name']: '');
            $id = (isset($data['id'])? $data['id']: '');
            $status = (isset($data['status'])? $data['status']: 'active');
            $query->update($id, $name, $status);
            $response = [
                'id' => $id,
                'name' => $name,
                'status' => $status,
            ];
            break;
        case 'delete':
            $id = (isset($data['id'])? $data['id']: '');
            $response = [
                'id' => $query->delete($id),
                'name' => $name,
                'status' => 'delete',
            ];
        case 'deleteCompleted':
            $query->deleteCompleted();
            $response = [
                'status' => 'deleteCompleted',
            ];
        default:

    }

    echo json_encode($response);

}

if( $_SERVER['REQUEST_METHOD'] === 'GET' ){
    $response = $query->get_all_todos();
    echo json_encode($response);
}


?>