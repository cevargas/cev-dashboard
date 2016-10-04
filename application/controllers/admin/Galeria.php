<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------
| CONTROLADOR DE GALERIAS
| -------------------------------------------------------------------
| Especifica o controlador de administracao de galerias da
| area de administracao
|
| controller/admin/galeria
| 
*/

class Galeria extends CI_Controller {
	
	public function __construct() {
		
		parent::__construct();

		//se nao tiver usuario logado redireciona para o login
		if($this->session->has_userdata('logged_in') === FALSE) {
			redirect('admin', 'location', 301);
		}
		//verifica se o grupo do usuario tem permissao para acessar o controlador, carrega no controller login
		if($this->acl->has_perm() === FALSE) {
			
			$ctr = strtoupper($this->uri->segment(2, 0));
			$mtd = ($this->uri->segment(3, 0)) ? ' / ' . strtoupper($this->uri->segment(3, 0)) : '';
			
			$this->session->set_flashdata('error_msg', 'Você não possui permissão para acessar '. $ctr . $mtd);
			redirect('admin/dashboard', 'refresh');
		}
	
		$this->load->model('Galeria_model');
		$this->load->model('Uploadimages_model');
	}

	public function index() {		
		$this->listar();	
	}
	
	public function listar() {
		
		$data = array();
		
		$data['per_page'] = ($this->input->get('per_page')) ? $this->input->get('per_page') : 1;	
		$data['orderby'] = ($this->input->get('orderby')) ? $this->input->get('orderby') : 'titulo';	
		$data['order'] = ($this->input->get('order')) ? $this->input->get('order') : 'ASC';	
		$data['termo'] = ($this->input->post('termo', TRUE)) ? $this->input->post('termo', TRUE) : $this->input->get('termo');

		if($this->input->post('termo')) {
			$config['total_rows'] = $this->Galeria_model->getPesquisaNumRows($data['termo']);
			$config['base_url'] = site_url("admin/galeria/index?termo={$data['termo']}");
		}
		else {
			$config['total_rows'] = $this->Galeria_model->countAll();		
			$config['base_url'] = site_url("admin/galeria/index/");
		}
		
		$offset = ($data['per_page'] == 1) ? 0 : ($data['per_page'] * $this->config->item('per_page')) - $this->config->item('per_page');
		
		$this->pagination->initialize($config);		
		$data['paginacao'] = $this->pagination->create_links();

		if($data['order'] == 'ASC')
			$data['ord'] = 'DESC';
		else
			$data['ord'] = 'ASC';		

		$galerias = $this->Galeria_model->getList($this->config->item('per_page'), $offset, $data['orderby'], $data['order'], $data['termo']);

		$data['programa'] = 'Galeria';
		$data['acao'] = 'Galeria de Imagens';
        $data['view'] = 'admin/galeria/listar'; 
		$data['listar_galerias'] = $galerias;

		$this->load->view('admin/index', $data);
	}

	public function novo(){		
		$data = array();

		$data['programa'] = 'Galeria';
		$data['acao'] = 'Adicionar Nova Galeria';
		$data['view'] = 'admin/galeria/form'; 
		
		$this->load->view('admin/index', $data);	
	}

	public function editar($id){

	}

	public function excluir($id) {
		
	}

	public function do_upload(){

		$path = array();
		$path['original_path'] = FCPATH .'public/uploads/galeria/original';
   		$path['resized_path'] = FCPATH .'public/uploads/galeria/resized';
    	$path['thumbs_path'] = FCPATH .'public/uploads/galeria/thumbs';

		$files = $_FILES;
    	$cpt = count($_FILES['files']['name']);


		var_dump($cpt);
		exit;

		for($i=0; $i<$cpt; $i++) {           
			$_FILES['files']['name']= $files['files']['name'][$i];
			$_FILES['files']['type']= $files['files']['type'][$i];
			$_FILES['files']['tmp_name']= $files['files']['tmp_name'][$i];
			$_FILES['files']['error']= $files['files']['error'][$i];
			$_FILES['files']['size']= $files['files']['size'][$i];    

			$this->Uploadimages_model->do_upload($path);
		}
		

	}
}
