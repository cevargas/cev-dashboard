
APP = {
	
	defaultInit: function(){
		
		$(document).off('mouseenter', '.tooltips').on('mouseenter', '.tooltips', function(){
			$( this ).tooltip({
				container: "body"
			}).tooltip('show');
		});		
	},

	cloneElementsChave: function() {
		
		$('body').on('click', 'button.add-chave',  function(){
			$( ".div-chave" ).first().clone().appendTo( ".div-to-append" ).find('input').val('');
		});	
	},
	
	deleteElementsChave: function() {
		
		$('body').on('click', 'button.del-chave',  function(){
			$( this ).parent().parent('.div-chave').remove();
		});	
	},

	select2Comp: function(){
		
	 	function formatResult(item) {
          if(!item.id) {
            return item.text;
          }
          return '<i class="fa '+ item.text+'"></i> ' + item.text;
        }
		
		function formatSelection(item) {
		  return '<i class="fa '+ item.text+'"></i> ' + item.text;
        }
		
		$('select.select2').select2({
 			allowClear: true,
			formatResult: formatResult,
			formatSelection: formatSelection
		});
		
		$("select.select2").on("change", function (e) {  
			$(this).valid(); 
		});
	},
	
	//Modal confirm
	confirmModal: function(){
		$('#modal-confirm').on('show.bs.modal', function(e) {
			var url = $(e.relatedTarget).data('url');
			var value = $(e.relatedTarget).data('value')
			$(e.currentTarget).find("#paramValue").html( value );
			$(e.currentTarget).find("#linkConfirm").attr('href', url);
		});
		
		$('#modal-confirm').on('hidden.bs.modal', function () {
			$(this).removeData();
		});
	},
	
	//iCheck
	iCheck: function(){
		$('input[type="radio"]').on('ifChecked', function(event){
			$(this).valid();
		});
	},
	
	//switch
	jsSwitch: function(){
		var elem = document.querySelector('.js-switch');
		var switchery = new Switchery(elem, { color: '#1AB394' });
	},
	
	//alterar Senha
	altPass: function() {
			
		$(".altpass").on('click', function(){
			if($(".passw").hasClass('hidden')) {
				$(".passw").removeClass('hidden');
				$("#alterar_senha").val(1);
			}
			else {				
				$(".passw").addClass('hidden');
				$("#alterar_senha").val(0);
			}
		});			
	},
	
	//form validacao form usuarios
	validateUsuarios: function(){
		
		$("#form-usuarios").validate({
			errorElement: 'label',
			errorClass: 'error',
			focusInvalid: false,
			ignore: "",
			rules: {
				grupo: "required",
				nome: "required",
				email: {
					required: true,
					email: true
				},
				senha: {
					required: {
						depends: function() {
							return $("#alterar_senha").val() == 0
					 	}
					}
				},
				conf_senha: {
					required: {
						 depends: function() {
							 return $("#alterar_senha").val() == 0
						 }
					},
					equalTo: {
						param: '#senha',
						depends: function() {
							 return $("#alterar_senha").val() == 0
						}
					}
				},				
				senha_atual: {
					required: {
						depends: function() {
							return $("#alterar_senha").val() == 1
					 	}
					}
				},
				nova_senha: {
					required: {
						depends: function() {
							return $("#alterar_senha").val() == 1
					 	}
					}
				},
				conf_nova_senha: {
					required: {
						 depends: function() {
							 return $("#alterar_senha").val() == 1
						 }
					},
					equalTo: {
						param: '#nova_senha',
						depends: function() {
							 return $("#alterar_senha").val() == 1
						}
					}
				}
			},
			messages: {
				grupo: "Selecione o Grupo do Usuário",
				nome: "Informe o Nome do Usuário",
				email: {
				  required: "Infome o Email do Usuário",
				  email: "Informe um Email válido"
				},
				senha: "Informe a Senha para Login",
				conf_senha: {
					required: "Confirme a Senha",
					equalTo: "Confirmação de Senha inválida"
				},
				senha_atual: "Informe a Senha atual do Usuário",
				nova_senha: "Informe a Nova Senha do Usuário",
				conf_nova_senha: {
					required: "Confirme a Nova Senha",
					equalTo: "Confirmação da Nova Senha inválida"
				}	
			},
			errorPlacement: function (error, element) { 				
				if (element.parent().parent().parent(".i-checks").size() > 0) {
					error.appendTo(element.parent().parent().parent().parent("div:first"));
				}
				else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {	
				form.submit();
			}
		});
	},
	
	//form validacao form grupos
	validateGrupos: function(){
		
		$("#form-grupos").validate({
			errorElement: 'label',
			errorClass: 'error',
			focusInvalid: false,
			ignore: "",
			rules: {
				descricao: "required",
				nome: "required",
				'programas_grupos[]': "required",
				'permissoes_grupos[]': "required"
			},
			messages: {
				descricao: "Informe uma descrição para o Grupo",
				nome: "Informe um Nome para o Grupo",
				'programas_grupos[]': "Selecione os Programas que este Grupo terá Acesso.",
				'permissoes_grupos[]': "Selecione as Permissões que este Grupo terá Acesso."
			},
			errorPlacement: function (error, element) { 				
				if (element.parent().parent().parent(".i-checks").size() > 0) {
					error.appendTo(element.parent().parent().parent().parent("div:first"));
				}
				else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {	
				form.submit();
			}
		});
	},
	
	//form validacao form perfil
	validatePerfil: function(){
		
		$("#form-perfil").validate({
			errorElement: 'label',
			errorClass: 'error',
			focusInvalid: false,
			ignore: "",
			rules: {
				email: {
					required: true,
					email: true
				},
				nome: "required",		
				senha_atual: {
					required: {
						depends: function() {
							return $("#alterar_senha").val() == 1
					 	}
					}
				},
				nova_senha: {
					required: {
						depends: function() {
							return $("#alterar_senha").val() == 1
					 	}
					}
				},
				conf_nova_senha: {
					required: {
						 depends: function() {
							 return $("#alterar_senha").val() == 1
						 }
					},
					equalTo: {
						param: '#nova_senha',
						depends: function() {
							 return $("#alterar_senha").val() == 1
						}
					}
				},		
			},
			messages: {
				nome: "Informe seu Nome",
				email: {
				  required: "Infome seu Email",
				  email: "Informe um Email válido"
				},			
				senha_atual: "Informe sua Senha atual",
				nova_senha: "Informe a Nova Senha",
				conf_nova_senha: {
					required: "Confirme a Nova Senha",
					equalTo: "Confirmação da Nova Senha inválida"
				}	
			},
			errorPlacement: function (error, element) { 				
				if (element.parent().parent().parent(".i-checks").size() > 0) {
					error.appendTo(element.parent().parent().parent().parent("div:first"));
				}
				else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {	
				form.submit();
			}
		});
	},

	//form validacao form galeria
	validateGaleria: function(){
		
		$("#form-galeria").validate({
			errorElement: 'label',
			errorClass: 'error',
			focusInvalid: false,
			ignore: "",
			rules: {
				descricao: "required",
				nome: "required",
				'images[]': "required"
			},
			messages: {
				descricao: "Informe uma descrição para a Galeria",
				nome: "Informe um Nome para a Galeria",
				'images[]': "Selecione ao menos uma imagem."
			},
			errorPlacement: function (error, element) { 				
				if (element.parent().parent().parent(".i-checks").size() > 0) {
					error.appendTo(element.parent().parent().parent().parent("div:first"));
				}
				else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {	
				form.submit();
			}
		});
	},

	fileUpload: function () {

		$("#filer_input").filer({
			limit: 6,
			maxSize: 12,
			fileMaxSize: 2,
			extensions: ["jpg", "png", "gif"],
			changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Arraste e solte as imagens aqui</h3> <span style="display:inline-block; margin: 15px 0">ou</span></div><a class="jFiler-input-choose-btn blue">Selecione </a></div></div>',			
			showThumbs: true,			
			dialogs: {
				alert: function(text) {
					return alert(text);
				},
				confirm: function (text, callback) {
					confirm(text) ? callback() : null;
				}
			},
			theme: "dragdropbox",
			templates: {
				box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
				item: '<li class="jFiler-item">\
							<div class="jFiler-item-container">\
								<div class="jFiler-item-inner">\
									<div class="jFiler-item-thumb">\
										<div class="jFiler-item-status"></div>\
										<div class="jFiler-item-thumb-overlay">\
											<div class="jFiler-item-info">\
												<div style="display:table-cell;vertical-align: middle;">\
													<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
													<span class="jFiler-item-others">{{fi-size2}}</span>\
												</div>\
											</div>\
										</div>\
										{{fi-image}}\
									</div>\
									<div class="jFiler-item-assets jFiler-row">\
										<ul class="list-inline pull-left">\
											<li>{{fi-progressBar}}</li>\
										</ul>\
										<ul class="list-inline pull-right">\
											<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
										</ul>\
									</div>\
								</div>\
							</div>\
						</li>',
				itemAppend: '<li class="jFiler-item">\
								<div class="jFiler-item-container">\
									<div class="jFiler-item-inner">\
										<div class="jFiler-item-thumb">\
											<div class="jFiler-item-status"></div>\
											<div class="jFiler-item-thumb-overlay">\
												<div class="jFiler-item-info">\
													<div style="display:table-cell;vertical-align: middle;">\
														<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
														<span class="jFiler-item-others">{{fi-size2}}</span>\
													</div>\
												</div>\
											</div>\
											{{fi-image}}\
										</div>\
										<div class="jFiler-item-assets jFiler-row">\
											<ul class="list-inline pull-left">\
												<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
											</ul>\
											<ul class="list-inline pull-right">\
												<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
											</ul>\
										</div>\
									</div>\
								</div>\
							</li>',
				progressBar: '<div class="bar"></div>',
				itemAppendToEnd: false,
				canvasImage: true,
				removeConfirmation: true,
				_selectors: {
					list: '.jFiler-items-list',
					item: '.jFiler-item',
					progressBar: '.bar',
					remove: '.jFiler-item-trash-action'
				}
			},
			files: null,
			addMore: false,
			allowDuplicates: true,
			clipBoardPaste: true,
			excludeName: null,
			beforeRender: null,
			afterRender: null,
			beforeShow: null,
			beforeSelect: null,
			onSelect: null,
			afterShow: null,
			dragDrop: {
				dragEnter: null,
				dragLeave: null,
				drop: null,
				dragContainer: null,
			},
			captions: {
				button: "Selecionar",
				feedback: "Selecione imagens para fazer o Upload",
				feedback2: "imagens selecionadas",
				drop: "Drop file here to Upload",
				removeConfirmation: "Deseja mesmo remover esta imagem?",
				errors: {
					filesLimit: "Apenas {{fi-limit}} imagens são permitidas para Upload.",
					filesType: "Apenas imagens são permitidas para Upload.",
					filesSize: "{{fi-name}} é muito grande! Selecione imagens com até {{fi-maxSize}} MB.",
					filesSizeAll: "As imagens que você selecionou são muito grandes! Selecione imagens com até {{fi-maxSize}} MB."
				}
			}
		});	
	},
	
	init: function(){
		this.jsSwitch();
		this.validateUsuarios();
		this.validateGrupos();
		this.validatePerfil();
		this.validateGaleria();
		this.iCheck();
		this.altPass();
		this.confirmModal();
		this.select2Comp();		
		this.cloneElementsChave();
		this.deleteElementsChave();
		this.defaultInit();
		this.fileUpload();
	}
};