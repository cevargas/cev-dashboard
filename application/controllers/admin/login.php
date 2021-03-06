<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------
| CONTROLADOR DE LOGIN DA AREA ADMINISTRATIVA
| -------------------------------------------------------------------
| Especifica o controlador de login da area administrativa
| 
| controller/admin/login
| 
*/

class Login extends CI_Controller {
	
	public function __construct() {
		
		parent::__construct();
				
		$this->load->helper('form');
		$this->load->library('form_validation');
		
		$this->load->model('Usuarios_model');
		
		//se tiver usuario logado, redireciona para dashboard
		if($this->session->has_userdata('logged_in') === TRUE) {
			redirect('admin/dashboard', 'location', 301);
		}
	}
	
	public function index()
	{
		//seta validacoes
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|callback_verificacao_login');
		$this->form_validation->set_rules('senha', 'Senha', 'trim|required|min_length[5]');
		
		//se NAO validar o login, retorna para o Formulario de login
  		if ($this->form_validation->run() == FALSE) {
			
			$data = array();
        	$data['view'] = 'admin/login/frm_login';
			$this->load->view('admin/login/index', $data);
			
		}
		else {
			//se validar o login, redireciona para dashboard
			redirect('admin/dashboard', 'location', 301);		
		}		
	}
	
	//validacao do login
	public function verificacao_login($email) {

		try {

			//consulta no banco de dados se o usuario existe e se esta ativo	
			$usuario = $this->Usuarios_model->checkLogin($email, $this->input->post('senha', TRUE));
				   
		} catch(Exception $e){
			log_message('error', $e->getMessage());
        }
		
		//se encontrar o usuario
		if(isset($usuario) and $usuario !== FALSE) {

			//seta paramentros de sessao
			$data_session_set = array('logged_in' => TRUE, 
									  'usuario_id' => $usuario->usuarioId,
									  'usuario_nome' => $usuario->usuarioNome,
									  'usuario_foto' => $usuario->fotoPerfil,
									  'grupo_id' => $usuario->grupoId,
									  'grupo_nome' => $usuario->grupoNome);
									  				  
			$this->session->set_userdata($data_session_set);
			
			//carrega lista de permissoes do grupo / usuario
			$permissoes = new Acl; //libraries/acl
			$permissoes->getPermissions();
			
			$menu = new Menu; //libraries/menu
			$menu->getMenu();
			
			return TRUE;
			
		}
		else {
			$this->form_validation->set_message('verificacao_login', 'Usuário ou Senha inválidos!');
			return FALSE;
		}
    }
}