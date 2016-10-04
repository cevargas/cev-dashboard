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
			$this->db->like('titulo', quotes_to_entities($termo));
			$this->db->or_like('descricao', quotes_to_entities($termo));
		}	
		$this->db->select('*');
		$this->db->from('galeria');
		$this->db->limit($limit, $offset);
		$query = $this->db->get();
		$result = $query->result();		
		
		return $result;
	}
	
	
	
}