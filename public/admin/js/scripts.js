
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

	fileUpload: function () {

		var url = 'do_upload';
		
		$('#fileupload').fileupload({
			url: url,
			dataType: 'json',
			autoUpload: false,
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 999000,
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator.userAgent),
			previewMaxWidth: 100,
			previewMaxHeight: 100,
			previewCrop: true
		}).on('fileuploadadd', function (e, data) {
			data.context = $('<div/>').appendTo('#files');			
		}).on('fileuploadprocessalways', function (e, data) {
			var index = data.index,
				file = data.files[index],
				node = $(data.context.children()[index]);
			if (file.preview) {
				node
					.prepend('<br>')
					.prepend(file.preview);
			}
			if (file.error) {
				node
					.append('<br>')
					.append($('<span class="text-danger"/>').text(file.error));
			}
			if (index + 1 === data.files.length) {
				data.context.find('button')
					.text('Upload')
					.prop('disabled', !!data.files.error);
			}
		}).on('fileuploadprogressall', function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css(
				'width',
				progress + '%'
			);
		}).on('fileuploaddone', function (e, data) {
			$.each(data.result.files, function (index, file) {
				if (file.url) {
					var link = $('<a>')
						.attr('target', '_blank')
						.prop('href', file.url);
					$(data.context.children()[index])
						.wrap(link);
				} else if (file.error) {
					var error = $('<span class="text-danger"/>').text(file.error);
					$(data.context.children()[index])
						.append('<br>')
						.append(error);
				}
			});
		}).on('fileuploadfail', function (e, data) {
			$.each(data.files, function (index) {
				var error = $('<span class="text-danger"/>').text('File upload failed.');
				$(data.context.children()[index])
					.append('<br>')
					.append(error);
			});
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	},
	
	init: function(){
		this.jsSwitch();
		this.validateUsuarios();
		this.validateGrupos();
		this.validatePerfil();
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