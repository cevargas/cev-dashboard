<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Galeria_model extends CI_Model {

	public function countAll(){		
		return $this->db->count_all('galeria');	
	}
	
	public function getList($limit=0, $offset=20, $order_by=NULL, $order=NULL, $termo=NULL) {
		
		if( isset($order_by) && ! empty($order_by) && isset($order) && ! empty($order) ) { 
			$this->db->order_by($order_by, $order);
		}		
		else {
			$this->db->order_by('titulo', 'ASC');	
		}
		
		if(isset($termo)) {
			$this->db->like('nome', quotes_to_entities($termo));
			$this->db->or_like('descricao', quotes_to_entities($termo));
		}	
		$this->db->select('*');
		$this->db->from('galeria');
		$this->db->limit($limit, $offset);
		$query = $this->db->get();
		$result = $query->result();		
		
		return $result;
	}

	public function insert($data) {		
		
		try {
			
			$this->db->set('data_criado', 'NOW()', FALSE);				
			$result = $this->db->insert('galeria', $data);	

			return $this->db->insert_id();
				 
		} catch (Exception $e) {			
		  log_message('error', $e->getMessage());
		  return;		  
		}		
	} 

	public function insertImages($data) {		
		
		try {
					
			$result = $this->db->insert('galeria_imagens', $data);	
			return $result;
				 
		} catch (Exception $e) {			
		  log_message('error', $e->getMessage());
		  return;		  
		}		
	} 	
}