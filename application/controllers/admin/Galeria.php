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
		$data['orderby'] = ($this->input->get('orderby')) ? $this->input->get('orderby') : 'nome';	
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

	public function salvar(){

		$this->form_validation->set_rules('nome', 'Nome', 'trim|required');
		$this->form_validation->set_rules('descricao', 'Descrição', 'trim|required');

		if ($this->form_validation->run() === TRUE) {

			$data = array(
				'nome' => $this->input->post('nome', TRUE),
				'descricao' => $this->input->post('descricao', TRUE)
			);

			$lastId = $this->Galeria_model->insert($data);		

			if (!empty($_FILES['images']['name']) && $lastId) {	

				$path = array();
				$path['original_path'] = FCPATH .'public/uploads/galeria/original';
				$path['resized_path'] = FCPATH .'public/uploads/galeria/resized';
				$path['thumbs_path'] = FCPATH .'public/uploads/galeria/thumbs';

				$files = $_FILES;

				$count = count($_FILES['images']['name']);

				$error = false;
				$errosList = array();

				for($i=0; $i<$count; $i++) {

					$_FILES['images']['name'] 		= $files['images']['name'][$i];
					$_FILES['images']['type'] 		= $files['images']['type'][$i];
					$_FILES['images']['tmp_name'] 	= $files['images']['tmp_name'][$i];
					$_FILES['images']['error'] 		= $files['images']['error'][$i];
					$_FILES['images']['size'] 		= $files['images']['size'][$i];    

					$upload = $this->Uploadimages_model->do_upload($path);
					if($upload[0] == TRUE) {

						$datai = array(
							'id_galeria' => $lastId,
							'nome' => $upload[1]
						);

						$this->Galeria_model->insertImages($datai);	
					}
					else {	
						$error = true;
						$errosList[$i] = $upload[1];
					}
				}

				if($error) {
					$this->set_error("Galeria incluída com erros ..." . implode(",", $errosList));
					unset($errosList);
					$error = false;
					return;			
				}
				else {
					$this->set_success("Galeria incluída com Sucesso.");
					return;
				}
			}
		}
		else {
			$this->novo();
			return;
		}
	}

	public function set_success($mensagem = NULL) {
		
		if(!$mensagem)
			$mensagem = 'Dados salvos com sucesso';
		
		$this->session->set_flashdata('success_msg', $mensagem);
		redirect('admin/galeria', 'location', 303);
		exit;
	}
	
	public function set_error($mensagem = NULL) {
		
		if(!$mensagem)
			$mensagem = 'Dados inválidos!';
		
		$this->session->set_flashdata('error_msg', $mensagem);
		redirect('admin/galeria', 'location', 303);	
		exit;	
	}
}
