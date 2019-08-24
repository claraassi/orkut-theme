$(document).ready(function () {
	
	var html_ativo = 0;

	$('body').delegate('#formulario-foto_post','change',function(){
		
		$( ".editor_html_imagem_preview" ).html('<div class="status_send_image">Enviando imagem...</div>');
		
		$('#formulario-foto_post').ajaxForm({
			
			
			success: function(response) { 
				$('#textBox').append(response);
				$( ".editor_html_imagem_preview" ).html('');
				$("#formulario-foto_post").val("");
			}
			
			//target:'.editor_html_imagem_preview'
		}).submit();

	});

	$('body').delegate('.icon_editor_html_foto_upload','click',function(){
		$("#imagem-foto_post").trigger('click');
	});
	
	$('body').delegate('.icon_editor_html_foto','click',function(){
		
		var pagina = 0;
		
		$( ".editor_html_imagem_box_load" ).toggle();
		
	if ($('.editor_html_imagem_box_load').is(":visible")){

			$.ajax({
				  url: 'ajax/user/lista_imagens_usuario.php',
				  type: 'POST',
				  
				  data : {
				  'pagina':pagina
				  },
				  success: function(data) {
		
					$("#fotos_user_load_list").append(data);
				  },
				  beforeSend: function(){
					 
					 
				  },
				  complete: function(){
					 
					 
				  }
			});
		}
		
	});	
	
	
	$('body').delegate('.get_more_image_from_user','click',function(){
		
		var pagina = $(this).attr("data");
		
		$(this).remove();
		
		$.ajax({
			  url: 'ajax/user/lista_imagens_usuario.php',
			  type: 'POST',
			  
			  data : {
			  'pagina':pagina
			  },
			  success: function(data) {
	
				$("#fotos_user_load_list").append(data);
			  },
			  beforeSend: function(){
				 
				 
			  },
			  complete: function(){
				 
				 
			  }
		});
		
	});	
	
	
	$('body').delegate('.imagem_load_lista','click',function(){
		var imagem = $(this).attr("data");
		$("#textBox").prepend( "<img src='"+imagem+"'>" );
	});		
	
	
	
	
	$('body').delegate('#img_post_x','click',function(){
		$( ".editor_html_imagem_preview" ).html('');
	});	
	
	function mostraAvisoErro(){
		$('#mensagem-de-erro-sistema').fadeIn();
	}
	function fechaAvisoErro(){
		$('#mensagem-de-erro-sistema').fadeOut();
	}

	$('body').delegate('.btn_esquerda_voltar_aniversariantes','click',function(){
		
		var pos = $('.box_aniversariantes_lista_user_c').scrollLeft() - 400;
		$('.box_aniversariantes_lista_user_c').animate({ scrollLeft: pos }, "slow");
		
	});
	$('body').delegate('.btn_direita_voltar_aniversariantes','click',function(){
		
		var pos = $('.box_aniversariantes_lista_user_c').scrollLeft() + 400;
		$('.box_aniversariantes_lista_user_c').animate({ scrollLeft: pos }, "slow");
	});
	
	
	
	$('body').delegate('.btn_esquerda_voltar_sugestao_amizade','click',function(){
		
		var pos = $('.box_sugestoes_amizade_lista_user_c').scrollLeft() - 400;
		$('.box_sugestoes_amizade_lista_user_c').animate({ scrollLeft: pos }, "slow");
		
	});
	$('body').delegate('.btn_direita_voltar_sugestao_amizade','click',function(){
		
		var pos = $('.box_sugestoes_amizade_lista_user_c').scrollLeft() + 400;
		$('.box_sugestoes_amizade_lista_user_c').animate({ scrollLeft: pos }, "slow");
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$( "body" ).delegate( "#status_perfil_user_editar", "click", function() {
		
		$(this).addClass( "editar_status_salvar" );
		$(this).html('salvar');
		$('#status_perfil_user_mostra').attr('contenteditable','true');
		$('#status_perfil_user').css("background-color","#FFFFEA");
		//$( "#status_perfil_user_mostra" ).focus();
		
		$("#status_perfil_user").css({"border-color": "#C4C400","border-width":"1px","border-style":"dashed"});
	});
	
	$( "body" ).delegate( ".editar_status_salvar", "click", function() {
		
		var novo_status = $("#status_perfil_user_mostra").text();
		
		$(this).removeClass( "editar_status_salvar" );
		$(this).html('editar');
		$('#status_perfil_user_mostra').attr('contenteditable','false');
		$('#status_perfil_user').css("background-color","#FFFFFF");
		$("#status_perfil_user").css({"border-color": "#DDDDDD","border-width":"1px","border-style":"solid"});
		salvaNovoStatusUser(novo_status);
	});	
	
	function salvaNovoStatusUser(novo_status){
		
			$.ajax({
			  url: 'ajax/user/definir-status-usuario.php',
			  type: 'POST',
			  data : {
				 'novo_status':novo_status
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {
				//$('.salva-ordem-selos').html(data);
			  },
			  beforeSend: function(){
				//$('.mostra_lista_user_interacao_post_'+id).html("<div id='mostra_lista_user_interacao_post'><span>Carregando...</span></div>");
				
			  },
			  complete: function(){
				  //$('.data_user_show_toltip_box_mostra_'+id).css({display:"block"});
				  //$('.data_user_show_toltip_box_mostra_'+id).focus();
				  
			  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
			});
		
	}
	
//########################################################
//ABA PERFIL USUARIO
//########################################################
$('#user-perfil-info-tab').delegate('.tab','click',function(){

	var id = $(this).attr("id");

	if(id == "user-perfil-info-tab-profissional"){

		$("#user-perfil-info-tab-profissional").removeClass( "user-perfil-info-tab-nao-selecionado" );
		$("#user-perfil-info-tab-profissional").addClass( "user-perfil-info-tab-selecionado" );
		
		$("#user-perfil-info-tab-social").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-social").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$("#user-perfil-info-tab-pessoal").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-pessoal").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$(".tab-profissional").css('display','block');
		$(".tab-social").css('display','none');
		$(".tab-pessoal").css('display','none');
		
	}else if(id == "user-perfil-info-tab-social"){
		
		$("#user-perfil-info-tab-social").removeClass( "user-perfil-info-tab-nao-selecionado" );
		$("#user-perfil-info-tab-social").addClass( "user-perfil-info-tab-selecionado" );
		
		$("#user-perfil-info-tab-profissional").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-profissional").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$("#user-perfil-info-tab-pessoal").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-pessoal").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$(".tab-social").css('display','block');
		$(".tab-profissional").css('display','none');
		$(".tab-pessoal").css('display','none');
		
	}else if(id == "user-perfil-info-tab-pessoal"){
		$("#user-perfil-info-tab-pessoal").removeClass( "user-perfil-info-tab-nao-selecionado" );
		$("#user-perfil-info-tab-pessoal").addClass( "user-perfil-info-tab-selecionado" );
		
		$("#user-perfil-info-tab-social").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-social").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$("#user-perfil-info-tab-profissional").removeClass( "user-perfil-info-tab-selecionado" );
		$("#user-perfil-info-tab-profissional").addClass( "user-perfil-info-tab-nao-selecionado" );
		
		$(".tab-pessoal").css('display','block');
		$(".tab-social").css('display','none');
		$(".tab-profissional").css('display','none');
		
	}
});
//########################################################
//ABA PERFIL USUARIO
//########################################################
	function solicitacaoAmizade(Id,u){
		$.ajax({
			  url: 'ajax/user/verifica-amizade.php'+u,
			  type: 'POST',
			  
			  data : {
			  'Id':Id
			  },
			  success: function(data) {
				$('.botao-relacionamento').fadeOut(0);
				$('.botao-relacionamento').html(data);
				$(".botao-relacionamento").fadeIn(300);
			  },
			  beforeSend: function(){
				 $(".ico_perfil_home").attr("src", "media/img/rolling.gif");
			  },
			  complete: function(){
				 $(".ico_perfil_home").attr("src", "media/img/ico_perfil.png");
			  }
		});	
	}

	$( "body" ).delegate( ".solicitacao-amizade", "click", function() {
		
		var Id = $(".solicitacao-amizade-acao").attr("id");
		var user = $(".user_id").attr("id");
		var u ='';
		if(user>0){
			var u = '?user='+user;
		}
		
		if(Id == 2){
			var decisao = confirm("Tem certeza de que deseja remover este amigo?");
			if(decisao){
				solicitacaoAmizade(Id,u);
				return false;
			}else{
				return false;
			  }
		}else{
			solicitacaoAmizade(Id,u);
		}
	});
	
	
	
	
	$( "body" ).delegate( ".btn_criar_depoimento", "click", function() {
		
		var id = $(this).attr("id");
		var depoimento = $('#text_depoimento').val();
		
		enviarDepoimento(id, depoimento);
	});
	
	function enviarDepoimento(id, depoimento){
		
		$.ajax({
			  url: 'ajax/depoimento/criar-depoimento.php',
			  type: 'POST',
			  
			  data : {
			  'id':id,
			  'depoimento':depoimento
			  },
			  success: function(data) {
					window.location.assign("index.php?user="+id);
			  },
			  beforeSend: function(){
				 $(".btn_criar_depoimento").html("enviando...");
			  },
			  complete: function(){
				
			  }
		});	
		
	}
	
//########################################################
//RECUSAR DEPOIMENTO
//########################################################
	$('body').delegate('.recusar-depoimento','click',function(){
	var id = $(this).attr("id");
		$.ajax({
		  url: 'ajax/depoimento/excluir-depoimento.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#background_interacao-box').html(data);
		  },
		  beforeSend: function(){
			  $('.recusar_depoimento_'+id).html('recusando...');
		  },
		  complete: function(){
				$('#depoimento_'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	});
	
	
	
	
	$('body').delegate('.excluir_depoimento','click',function(){
		
		var id = $(this).attr("id");
		var decisao = confirm("Tem certeza de que deseja remover este depoimento?");
		
			if(decisao){
				
				$.ajax({
				  url: 'ajax/depoimento/excluir-depoimento.php',
				  type: 'POST',
				  data : {
				  'Id':id
				  },
				  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				  success: function(data) {
					$('#background_interacao-box').html(data);
				  },
				  beforeSend: function(){
					  $('.excluir_depoimento_'+id).html('excluindo...');
				  },
				  complete: function(){
						$('#depoimento_'+id).fadeOut(300);
				  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
				});
				
				return false;
			}else{
				return false;
			  }
	});
//########################################################
//RECUSAR DEPOIMENTO
//########################################################
//########################################################
//ACEITAR DEPOIMENTO
//########################################################
	$('body').delegate('.aceitar-depoimento','click',function(){
		
		var id = $(this).attr("id");
	
		$.ajax({
		  url: 'ajax/depoimento/aceitar-depoimento.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#background_interacao-box').html(data);
		  },
		  beforeSend: function(){
			  $('.aceitar_depoimento_'+id).html('aceitando...');
		  },
		  complete: function(){
				$('#depoimento_'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	});
//########################################################
//ACEITAR DEPOIMENTO
//########################################################
//########################################################
//FÃƒ
//########################################################
	$('body').delegate('.tornar_fa','click',function(){
		var id = $(this).attr("id");
        
		$.ajax({
		  url: 'ajax/user/fa.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$('.tornar_fa').html(data);
		  },
		  beforeSend: function(){
			  $(".icon_menu_fas_2, .icon_menu_fas_1").css('background-image', 'none');
			  $(".icon_menu_fas_2, .icon_menu_fas_1").html('<img src="media/img/rolling_128.gif" width="10px">');
		  },
		  complete: function(){
				//$('.box-mostra-solicitacoes-amizade-'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});	
	
	});	

	$('body').delegate('.tornar_fa_lista','click',function(){
		var id = $(this).attr("id");
        
		$.ajax({
		  url: 'ajax/user/fa_lista.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$('.tornar_fa_lista_'+id).html(data);
		  },
		  beforeSend: function(){
			  $(".icon_menu_fas_"+id).css('background-image', 'none');
			  $(".icon_menu_fas_"+id).html('<img src="media/img/rolling_128.gif" width="10px">');
		  },
		  complete: function(){
				//$('.box-mostra-solicitacoes-amizade-'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});	
	
	});		
//########################################################
//FÃƒ
//########################################################
//########################################################
//AMIZADE
//########################################################
	$('body').delegate('.aceitar-amizade','click',function(){
		var id = $(this).attr("id");
		$.ajax({
		  url: 'ajax/user/aceitar-amizade.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#background_interacao-box').html(data);
		  },
		  beforeSend: function(){
			  $('.aceitar-amizade-'+id).html('salvando...');
		  },
		  complete: function(){
				$('#box-mostra-solicitacoes-amizade-'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});	
	
	});
	
	$('body').delegate('.recusar-amizade','click',function(){
		var id = $(this).attr("id");
		$.ajax({
		  url: 'ajax/user/recusar-amizade.php',
		  type: 'POST',
		  data : {
		  'Id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#background_interacao-box').html(data);
		  },
		  beforeSend: function(){
			  $('.recusar-amizade-'+id).html('removendo...');
		  },
		  complete: function(){
				$('#box-mostra-solicitacoes-amizade-'+id).fadeOut(300);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});	
	
	});
//########################################################
//AMIZADE
//########################################################






































	//####################################################
	//Voto Confiavel
	//####################################################

	$('body').delegate('#voto_confiavel','mouseleave',function(){
	   var id = $(this).attr("data");
	   var tipo = $(this).attr("tipo");
	   
	   if(tipo == 1){
		   votoPerfilUserBusca(1, id);
	   }else{
		   votoPerfilUserBuscaLista(1, id);
	   }
	   
	});
	//toltip_voto_confiavel_1_<?php echo $id_user_pagina;?>
	
	$('body').delegate('#voto_confiavel_1','mouseenter',function(){
		
		var id = $(this).attr("data");
	
	  $(".toltip_voto_confiavel_1_"+id).css({display:"block"});
	  $(".ico_confiavel_1_"+id).attr("src", 'media/img/confiavel_on.png');
	  $(".ico_confiavel_2_"+id+",.ico_confiavel_3_"+id+"").attr("src", 'media/img/confiavel_off.png');
	});
	
	
	
	$('body').delegate('#voto_confiavel_1','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_confiavel_1_"+id).css({display:"none"});
	});
	

	
	
	
	
	$('body').delegate('#voto_confiavel_2','mouseenter',function(){
		var id = $(this).attr("data");
		
	 $(".toltip_voto_confiavel_2_"+id).css({display:"block"});
	  $(".ico_confiavel_2_"+id+",.ico_confiavel_1"+id).attr("src", 'media/img/confiavel_on.png');
	  $(".ico_confiavel_3_"+id).attr("src", 'media/img/confiavel_off.png');
	  
	  
	});
	
	
	
	$('body').delegate('#voto_confiavel_2','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_confiavel_2_"+id).css({display:"none"});
	});
	
	
	
	
	$('body').delegate('#voto_confiavel_3','mouseenter',function(){
		
		var id = $(this).attr("data");
		
	 $(".toltip_voto_confiavel_3_"+id).css({display:"block"});
	 
	  $(".ico_confiavel_1_"+id+",.ico_confiavel_2_"+id+",.ico_confiavel_3_"+id+"").attr("src", 'media/img/confiavel_on.png');
	  
	});
	$('body').delegate('#voto_confiavel_3','mouseleave',function(){
		
		var id = $(this).attr("data");
		
	  $(".toltip_voto_confiavel_3_"+id).css({display:"none"});
	});
	//####################################################
	//Voto Confiavel
	//####################################################
	//####################################################
	//Voto Legal
	//####################################################
	$('body').delegate('#voto_legal','mouseleave',function(){
	   var id = $(this).attr("data");
	   var tipo = $(this).attr("tipo");
	   
	   if(tipo == 1){
		   votoPerfilUserBusca(2, id);
	   }else{
		   votoPerfilUserBuscaLista(2, id);
	   }
	});
	//toltip_voto_confiavel_1_<?php echo $id_user_pagina;?>
	
	$('body').delegate('#voto_legal_1','mouseenter',function(){
		
		var id = $(this).attr("data");
	
	  $(".toltip_voto_legal_1_"+id).css({display:"block"});
	  $(".ico_legal_1_"+id).attr("src", 'media/img/legal_on.png');
	  $(".ico_legal_2_"+id+",.ico_legal_3_"+id+"").attr("src", 'media/img/legal_off.png');
	});
	
	
	
	$('body').delegate('#voto_legal_1','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_legal_1_"+id).css({display:"none"});
	});
	

	
	
	
	
	$('body').delegate('#voto_legal_2','mouseenter',function(){
		var id = $(this).attr("data");
		
	 $(".toltip_voto_legal_2_"+id).css({display:"block"});
	  $(".ico_legal_2_"+id+",.ico_legal_1"+id).attr("src", 'media/img/legal_on.png');
	  $(".ico_legal_3_"+id).attr("src", 'media/img/legal_off.png');
	  
	  
	});
	
	
	
	$('body').delegate('#voto_legal_2','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_legal_2_"+id).css({display:"none"});
	});
	
	
	
	
	$('body').delegate('#voto_legal_3','mouseenter',function(){
		
		var id = $(this).attr("data");
		
	 $(".toltip_voto_legal_3_"+id).css({display:"block"});
	 
	  $(".ico_legal_1_"+id+",.ico_legal_2_"+id+",.ico_legal_3_"+id+"").attr("src", 'media/img/legal_on.png');
	  
	});
	$('body').delegate('#voto_legal_3','mouseleave',function(){
		
		var id = $(this).attr("data");
		
	  $(".toltip_voto_legal_3_"+id).css({display:"none"});
	});
	//####################################################
	//Voto Legal
	//####################################################
	
	//####################################################
	//Voto Sexy
	//####################################################
	$('body').delegate('#voto_sexy','mouseleave',function(){
	   var id = $(this).attr("data");
	   var tipo = $(this).attr("tipo");
	   
	   if(tipo == 1){
		   votoPerfilUserBusca(3, id);
	   }else{
		   votoPerfilUserBuscaLista(3, id);
	   }
	});
	//toltip_voto_confiavel_1_<?php echo $id_user_pagina;?>
	
	$('body').delegate('#voto_sexy_1','mouseenter',function(){
		
		var id = $(this).attr("data");
	
	  $(".toltip_voto_sexy_1_"+id).css({display:"block"});
	  $(".ico_sexy_1_"+id).attr("src", 'media/img/sexy_on.png');
	  $(".ico_sexy_2_"+id+",.ico_sexy_3_"+id+"").attr("src", 'media/img/sexy_off.png');
	});
	
	
	
	$('body').delegate('#voto_sexy_1','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_sexy_1_"+id).css({display:"none"});
	});
	

	
	
	
	
	$('body').delegate('#voto_sexy_2','mouseenter',function(){
		var id = $(this).attr("data");
		
	 $(".toltip_voto_sexy_2_"+id).css({display:"block"});
	  $(".ico_sexy_2_"+id+",.ico_sexy_1"+id).attr("src", 'media/img/sexy_on.png');
	  $(".ico_sexy_3_"+id).attr("src", 'media/img/sexy_off.png');
	  
	  
	});
	
	
	
	$('body').delegate('#voto_sexy_2','mouseleave',function(){
		var id = $(this).attr("data");
		
		
	   $(".toltip_voto_sexy_2_"+id).css({display:"none"});
	});
	
	
	
	
	$('body').delegate('#voto_sexy_3','mouseenter',function(){
		
		var id = $(this).attr("data");
		
	 $(".toltip_voto_sexy_3_"+id).css({display:"block"});
	 
	  $(".ico_sexy_1_"+id+",.ico_sexy_2_"+id+",.ico_sexy_3_"+id+"").attr("src", 'media/img/sexy_on.png');
	  
	});
	$('body').delegate('#voto_sexy_3','mouseleave',function(){
		
		var id = $(this).attr("data");
		
	  $(".toltip_voto_sexy_3_"+id).css({display:"none"});
	});
	//####################################################
	//Voto Sexy
	//####################################################
	
	
	
	
	$('body').delegate('#voto_legal_1,#voto_legal_2,#voto_legal_3','click',function(){
		var legal = $(this).attr("legal");
		var id = $(this).attr("data");
		
		$(this).fadeOut(0);
		$(this).fadeIn(1000);
		
		votoPerfilUser(legal,2, id);
	});
	$('body').delegate('#voto_confiavel_1,#voto_confiavel_2,#voto_confiavel_3','click',function(){
		
		var confiavel = $(this).attr("confiavel");
		var id = $(this).attr("data");
		
		votoPerfilUser(confiavel,1, id);
		
		$(this).fadeOut(0);
		$(this).fadeIn(1000);
	});
	
	$('body').delegate('#voto_sexy_1,#voto_sexy_2,#voto_sexy_3','click',function(){
		var sexy = $(this).attr("sexy");
		var id = $(this).attr("data");
		
		
		votoPerfilUser(sexy,3, id);
		
		$(this).fadeOut(0);
		$(this).fadeIn(1000);
	});	
	
	
	
	function votoPerfilUser(voto, tipo, id){
		
		//var user = $('.user_id').attr("id");
		
		$.ajax({
		  url: 'ajax/user/voto-perfil-user.php',
		  type: 'POST',
		  data : {
		  'user':id,
		  'voto':voto,
		  'tipo':tipo
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			
			$('.background_compartilhar-mostra').html(data);
			
			
			
		  },
		  beforeSend: function(){
			
		  },
		  complete: function(){

		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});	
		
		
		
		
	}
	//votoPerfilUserBuscaLista
	function votoPerfilUserBuscaLista(tipo, id){
		
		
		
		$.ajax({
		  url: 'ajax/user/voto-perfil-user-busca-lista.php',
		  type: 'POST',
		  data : {
		  'user':id,
		  'tipo':tipo
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#box-post-comentarios-reacoes-user-curtir-respostas-'+id).fadeOut(0);
			if(tipo == '1'){
				$('.voto_confiavel_'+id).html(data);
			}else if(tipo == '2'){
				$('.voto_legal_'+id).html(data);
			}else if(tipo == '3'){
				$('.voto_sexy_'+id).html(data);
			}
			
			//$('#box-post-comentarios-reacoes-user-curtir-respostas-'+id).fadeIn(500);
		  },
		  beforeSend: function(){
			//$('#load-post-'+id).css({display:"block"});
		  },
		  complete: function(){
			//$('.background_compartilhar').animate({'opacity':'.60'},300,'linear');
			//$('.background_compartilhar').css('display','block');
			//$('.background_compartilhar-mostra').animate({'opacity':'1.0'},300,'linear');
			//$('.background_compartilhar-mostra').css('display','block');
			//$("body").css( { "margin-left" : "-17px"} );
			//$("#top-bar").css( { "margin-left" : "9px"} );
			//$('body').css('overflow','hidden');
			//$('#load-post-'+id).css({display:"none"});
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
	}
	function votoPerfilUserBusca(tipo, id){
		
		
		
		$.ajax({
		  url: 'ajax/user/voto-perfil-user-busca.php',
		  type: 'POST',
		  data : {
		  'user':id,
		  'tipo':tipo
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			//$('#box-post-comentarios-reacoes-user-curtir-respostas-'+id).fadeOut(0);
			if(tipo == '1'){
				$('.voto_confiavel_'+id).html(data);
			}else if(tipo == '2'){
				$('.voto_legal_'+id).html(data);
			}else if(tipo == '3'){
				$('.voto_sexy_'+id).html(data);
			}
			
			//$('#box-post-comentarios-reacoes-user-curtir-respostas-'+id).fadeIn(500);
		  },
		  beforeSend: function(){
			//$('#load-post-'+id).css({display:"block"});
		  },
		  complete: function(){
			//$('.background_compartilhar').animate({'opacity':'.60'},300,'linear');
			//$('.background_compartilhar').css('display','block');
			//$('.background_compartilhar-mostra').animate({'opacity':'1.0'},300,'linear');
			//$('.background_compartilhar-mostra').css('display','block');
			//$("body").css( { "margin-left" : "-17px"} );
			//$("#top-bar").css( { "margin-left" : "9px"} );
			//$('body').css('overflow','hidden');
			//$('#load-post-'+id).css({display:"none"});
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
	}
	
	
	
	
	$( "body" ).delegate( ".bloquear_usuario", "click", function() {
		var id = $(this).attr("id");
		$.ajax({
		  url: 'ajax/user/bloquear-usuario.php',
		  type: 'POST',
		  data : {
			'id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$('.bloqueio_user_callback_'+id).fadeOut(0);
			$('.bloqueio_user_callback_'+id).html(data);
			$('.bloqueio_user_callback_'+id).fadeIn(500);
		  },
		  beforeSend: function(){
			//$(".bloquear_usuario_img").attr("src", "media/img/rolling.gif");
		  },
		  complete: function(){
			//$(".bloquear_usuario_img").attr("src", "media/img/bloquear_user.png");
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$('body').delegate('#remover_foto_com','click',function(){


		var Id = $(this).attr("com");
		
		$.ajax({
		  url: 'ajax/user/remover-foto-confirma.php',
		  type: 'POST',
		  data : {
			'Id':Id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$('.background_interacao_mostra').html(data);
			//$('#comunidade-topico-mostra-'+comentario).fadeOut(500);
			
		  },
		  beforeSend: function(){
			//$('#post-emoticon-select-lista-box').html("<img src='media/img/rolling_128.gif'>");
		  },
		  complete: function(){
			$('.background_interacao').animate({'opacity':'.60'},300,'linear');
			$('.background_interacao').css('display','block');
			$('.background_interacao_mostra').animate({'opacity':'1.0'},300,'linear');
			$('.background_interacao_mostra').css('display','block');
			//atualizaReacoesPost(id);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	});	


	$('body').delegate('.btn_remover_foto','click',function(){


		var Id = $(this).attr("id");
		
		$.ajax({
		  url: 'ajax/user/remover-foto.php',
		  type: 'POST',
		  data : {
			'Id':Id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$('.background_interacao_mostra').html(data);
			//$('#comunidade-topico-mostra-'+comentario).fadeOut(500);
			
		  },
		  beforeSend: function(){
			//$('#post-emoticon-select-lista-box').html("<img src='media/img/rolling_128.gif'>");
		  },
		  complete: function(){
			$('.background_interacao').animate({'opacity':'.60'},300,'linear');
			$('.background_interacao').css('display','block');
			$('.background_interacao_mostra').animate({'opacity':'1.0'},300,'linear');
			$('.background_interacao_mostra').css('display','block');
			//atualizaReacoesPost(id);
		  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	});	
	
	$('body').delegate('.btn_alterar_foto','click',function(){
	
	$.ajax({
	  url: 'ajax/user/alterar-foto.php',
	  type: 'POST',
	  data : {
	  },
	  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	  success: function(data) {
		$('.background_interacao_mostra').html(data);
		//$('#comunidade-topico-mostra-'+comentario).fadeOut(500);
		
	  },
	  beforeSend: function(){
		//$('#post-emoticon-select-lista-box').html("<img src='media/img/rolling_128.gif'>");
	  },
	  complete: function(){
		$('.background_interacao').animate({'opacity':'.60'},300,'linear');
		$('.background_interacao').css('display','block');
		$('.background_interacao_mostra').animate({'opacity':'1.0'},300,'linear');
		$('.background_interacao_mostra').css('display','block');
		//atualizaReacoesPost(id);
	  },error: function (request, status, error) {
				mostraAvisoErro();
				setTimeout(fechaAvisoErro, 10000);
			}
	});
	
});


	
	
	
$('body').delegate('#interacao-box-header-fechar,#btn-cancela-comentario-interacao','click',function(){
	fechaJanelaInteracaoTopico();
});

function fechaJanelaInteracaoTopico(){
	$('.background_interacao, .background_interacao_mostra').animate({'opacity':'0'},150,'linear',function(){
		$("body").css( { "margin-left" : "0px"} );
		$('body').css('overflow','auto');
		$('.background_interacao, .background_interacao_mostra').css('display','none');
		$(".background_interacao-mostra" ).html('');
	});	
}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
$('body').delegate('.btn_atualizar_perfil','click',function(){	
	
	
	
	$( ".resposta_ajax" ).removeClass( "resposta_ajax_erro" );
	$( ".resposta_ajax" ).html("");
	
	var nome = $('.edit_user_perfil_nome').val();
	var sobrenome = "";
	var sobremim = $('.sobremim_input').val();
	var ano = $('#year').find(":selected").val();
	var mes = $('#month').find(":selected").val();
	var dia = $('#day').find(":selected").val();
	
	//BUSCA SEXO SELECIONADO
	var sexo = "";
	var recados_privacidade = "";
	var visitantes_perfil = 1;
	var capa_perfil = 1;
	var feed_perfil = 1;
	var tipo_conta = 1;
	var cont_multimidia_automatico = 1;
	var link_video = "";
	var video_automatico = 0;
	var editor_html = 1;
	var pedidos_de_amizade = 1;
	var idioma_padrao = 1;
	var classificacao_indicativa = 1;
	

	
	
	$('#feminino_input').each(function(i){
		if ($(this).is(':checked')) {
			sexo = $(this).val();
		}
	});
	
	$('#masculino_input').each(function(i){
		if ($(this).is(':checked')) {
			sexo = $(this).val();
		}
	});
	$('#outro_input').each(function(i){
		if ($(this).is(':checked')) {
			sexo = $(this).val();
		}
	});
	
	
	$('#recados_todos_input').each(function(i){
		if ($(this).is(':checked')) {
			recados_privacidade = $(this).val();
		}
	});
	$('#recados_amigos_input').each(function(i){
		if ($(this).is(':checked')) {
			recados_privacidade = $(this).val();
		}
	});
	

	var idioma_padrao = $('.idioma_padrao_check:checked').val();
	
	//BUSCA SEXO SELECIONADO
	var relacionamento = $('.edit_user_relacionamento').val();
	var interesses_no_orkutando = $('.edit_user_interesses_no_orkut').val();
	var fumo = $('.edit_user_fumo').val();
	var programas_de_tv = $('.edit_user_programas_tv').val();
	var pais = $('.edit_user_pais').val();
	var estado = $('.edit_user_estado').val();
	var cidade = $('.edit_user_cidade').val();
	var instituicao_de_ensino = $('.edit_user_instituicao_ensino').val();
	var formacao = $('.edit_user_formacao').val();
	var profissao = $('.edit_user_profissao').val();
	var trabalha_como = $('.edit_user_trabalha_como').val();
	var whatsapp = $('.edit_user_perfil_whatsapp').val();
	var facebook = $('.edit_user_perfil_facebook').val();
	var endereco = $('.edit_user_perfil_endereco').val();
	var religiao = $('.edit_user_perfil_religiao').val();
	var animal_favorito = $('.edit_user_perfil_animal_favorito').val();
	var comida_favorita = $('.edit_user_perfil_commida_favorita').val();
	var time_favorito = $('.edit_user_perfil_time_favorito').val();
	var musica_favorita = $('.edit_user_perfil_musica_favorita').val();
	var filme_favorito = $('.edit_user_perfil_filme_favorito').val();
	var esporte_que_pratica = $('.edit_user_perfil_esporte_que_pratica').val();
	var hobbie = $('.edit_user_perfil_hobbie').val();
	var idiomas_que_falo = $('.edit_user_idioma_que_falo').val();
	var senha = $('.edit_user_password').val();
	var nova_senha = $('#nova_senha_input').val();
	var nova_senha2 = $('#nova_senha2_input').val();
	var link_video = $('#link-video').val();
	
	
	$.ajax({
	  url: 'ajax/user/atualiza-config-user.php',
	  type: 'POST',
	  data : {
		'nome':nome,
		'sobrenome':sobrenome,
		'sobremim':sobremim,
		'ano':ano,
		'mes':mes,
		'dia':dia,
		'sexo':sexo,
		'relacionamento':relacionamento,
		'interesses_no_orkutando':interesses_no_orkutando,
		'fumo':fumo,
		'programas_de_tv':programas_de_tv,
		'pais':pais,
		'estado':estado,
		'cidade':cidade,
		'instituicao_de_ensino':instituicao_de_ensino,
		'formacao':formacao,
		'profissao':profissao,
		'trabalha_como':trabalha_como,
		'whatsapp':whatsapp,
		'facebook':facebook,
		'endereco':endereco,
		'religiao':religiao,
		'animal_favorito':animal_favorito,
		'comida_favorita':comida_favorita,
		'time_favorito':time_favorito,
		'musica_favorita':musica_favorita,
		'filme_favorito':filme_favorito,
		'esporte_que_pratica':esporte_que_pratica,
		'hobbie':hobbie,
		'idiomas_que_falo':idiomas_que_falo,
		'senha':senha,
		'nova_senha':nova_senha,
		'nova_senha2':nova_senha2,
		'recados_privacidade':recados_privacidade,
		'visitantes_perfil':visitantes_perfil,
		'capa_perfil':capa_perfil,
		'feed_perfil':feed_perfil,
		'tipo_conta':tipo_conta,
		'cont_multimidia_automatico':cont_multimidia_automatico,
		'video_automatico':video_automatico,
		'link_video':link_video,
		'editor_html':editor_html,
		'pedidos_de_amizade':pedidos_de_amizade,
		'idioma_padrao':idioma_padrao,
		'classificacao_indicativa':classificacao_indicativa
	  },
	  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	  success: function(data) {

		$('.resposta_ajax').html(data);
		$('.btn_atualizar_perfil').html("atualizar");
	  },
	  beforeSend: function(){
		
		$('.btn_atualizar_perfil').html("atualizando...");
	  },
	  complete: function(){
		$('#salvar_config_user').html("Salvar configuraÃ§Ãµes");
		$("#senha_input").val("");
		$("#nova_senha_input").val("");
		$("#nova_senha2_input").val("");
	  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
	});
});		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$('body').delegate('.btn_atualizar_senha','click',function(){
		
		$( ".resposta_ajax" ).removeClass( "resposta_ajax_erro" );
		$( ".resposta_ajax" ).html("");
	
		var senha = $('.edit_user_password').val();
		var nova_senha = $('.senha_1').val();
		var nova_senha2 = $('.senha_2').val();

	
	$.ajax({
	  url: 'ajax/user/atualiza-senha-user.php',
	  type: 'POST',
	  data : {
		'senha':senha,
		'nova_senha':nova_senha,
		'nova_senha2':nova_senha2
	  },
	  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	  success: function(data) {

		$('.resposta_ajax').html(data);
		$('.btn_atualizar_senha').html("atualizar");
	  },
	  beforeSend: function(){
		
		$('.btn_atualizar_senha').html("atualizando...");
	  },
	  complete: function(){
		$('#salvar_config_user').html("Salvar configuraÃ§Ãµes");
		$("#senha_input").val("");
		$("#nova_senha_input").val("");
		$("#nova_senha2_input").val("");
	  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
	});
});	
	
	
	
$('body').delegate('.btn_remover_conta','click',function(){
		
	$( ".resposta_ajax" ).removeClass( "resposta_ajax_erro" );
	$( ".resposta_ajax" ).html("");
	
	var senha = $('.edit_user_password').val();

	$.ajax({
	  url: 'ajax/user/excluir-conta-confirma.php',
	  type: 'POST',
	  data : {
		's':senha
	  },
	  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	  success: function(data) {

		$('.resposta_ajax').html(data);
		$('.btn_remover_conta').html("excluir minha conta");
	  },
	  beforeSend: function(){
		
		$('.btn_remover_conta').html("excluindo...");
	  },
	  complete: function(){
		$('#salvar_config_user').html("Salvar configuraÃ§Ãµes");
		$("#senha_input").val("");
		$("#nova_senha_input").val("");
		$("#nova_senha2_input").val("");
	  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
	});
});		
	

 $(window).resize(function() {
	 
		$windowWidth = $(window).width();
		//$windowHeight = $(window).height();
		
		if($windowWidth >= 999 ){
				
			$( "#top_menu_links" ).show();
			$(".btn_sair_mobi").css("display", "none");
		}
});	
	
	
	
	$('body').delegate('.btn_adicionar_amigo_sugestao','click',function(){
		var id = $(this).attr("id");
		adicionaAmigoSugerido(id);
	});	
	
	
	function adicionaAmigoSugerido(id){
		
		$.ajax({
		  url: 'ajax/user/adiciona-amigo-sugerido.php',
		  type: 'POST',
		  data : {
			'id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			
			var resultado = data;
			
			if(parseInt(resultado) == 1){
				$( '.btn_adicionar_amigo_sugestao_' + id ).html("adicionado");
			}else if(parseInt(resultado) == 2){
				
				alert('VocÃª nÃ£o pode enviar solicitaÃ§Ãµes de amizade para este usuÃ¡rio!');
				
				$( '.btn_adicionar_amigo_sugestao_' + id ).html("adicionar");
				
			}else if(parseInt(resultado) == 3){
				
				alert('Este usuÃ¡rio optou por nÃ£o receber solicitaÃ§Ãµes de amizade!');
				
				$( '.btn_adicionar_amigo_sugestao_' + id ).html("adicionar");
				
			}else if(parseInt(resultado) == 4){
				
				alert('Aguarde sua solicitaÃ§Ã£o ser aceita!');
				
				$( '.btn_adicionar_amigo_sugestao_' + id ).html("adicionado");
				
			}
			
			//$('.box_sugestoes_de_amizade_lista_user').html(data);
			
			
			
		  },
		  beforeSend: function(){
			$( '.btn_adicionar_amigo_sugestao_' + id ).html("<img src='media/img/rolling_gray.gif' width='20px'>");

		  },
		  complete: function(){
			  



		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
		
	}























	$('body').delegate('.btn_invite_friends','click',function(){
		var email = $(".left_box_envite_friends_input").val();
		
		
		//alert(email);
		enviaConviteUsuario(email);
		
	});	



	function enviaConviteUsuario(email){
		
		$.ajax({
		  url: 'ajax/user/envia-convite.php',
		  type: 'POST',
		  data : {
			'email':email
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			
			$( '.btn_invite_friends').html("<span>convidar</span>"+data);
			
		  },
		  beforeSend: function(){
			$( '.btn_invite_friends').html("<span>enviando..</span>");

		  },
		  complete: function(){
			  
			  $( '.btn_invite_friends').html("<span>convidar</span>");
			  $(".left_box_envite_friends_input").val("");


		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
	}




	$('body').delegate('.home_feed_box_composer_select_privacity_list_item','click',function(){
		
		var data = $(this).attr("data");
		var content = $(this).html();
		
		$(".home_feed_box_composer_select_privacity_selected").html(content);
		$(".home_feed_box_composer_select_privacity_selected").attr("id", data);
		
	
		
		
	});	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	
	
	
	
	$('body').delegate('.home_feed_box_composer_select_privacity','click',function(){
		
		$('.home_feed_box_composer_select_privacity_list').toggle();

	});

	
	
	$('body').delegate('.btn_new_post_feed','click',function(){
		
		
		//$(".resizable").resizable('disable');
		//$(".resizable").resizable('destroy');
		
		if(html_ativo == 0){
			
			//setDocMode(0);
			
		}else{
			
			//setDocMode(1);
			
		}
		
		var post = $("#textBox").html();
		var video = $( '.youtube_video_input' ).val();
		var img = $("#img_post_new").val();
		var users = "";
		var privacidade = $('.home_feed_box_composer_select_privacity_selected').attr('id');;
		var tipo = "feed";
		var box_gradient_post_banner = 0;
		
		
		post = post.trim();
		
		if(post != "" || video != "" || img != ""){
			$("#btn_new_post_feed").removeClass( "btn_new_post_feed" );
			enviaNovoPostFeed(post, video, privacidade, img, tipo, users, box_gradient_post_banner);
			
		}else{
			alert("VocÃª precisa escrever algo antes de enviar!" + img);

		}

		
		
		//.btn_enviar_novo_comentario
		
		
	});	
	
//str.trim()
	function enviaNovoPostFeed(post, video, privacidade, img, tipo, users, box_gradient_post_banner){
		
		$.ajax({
		  url: 'ajax/post/postagem.php',
		  type: 'POST',
		  data : {
		  'comentario':post,
		  'video':video,
		  'privacidade':privacidade,
		  'img':img,
		  'users':users,
		  'box_gradient_post_banner':box_gradient_post_banner
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			$("#home_feed_box_composer_new_post").html("");
			
			$("#home_feed_box_show").prepend( data );
		  },
		  beforeSend: function(){
			$(".btn_enviar_novo_comentario").html("enviando");
		  },
		  complete: function(){
				
			$(".btn_enviar_novo_comentario").html("postar");
			$("#btn_new_post_feed").addClass( "btn_new_post_feed" );
			
			if(html_ativo == 1){
				$("#textBox").html('<pre id="sourceText" contenteditable="true"></pre>');
				//textBox
				//<pre id="sourceText" contenteditable="true"></pre>
			}else{
				$("#textBox").html('');
				
			}
				
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
	}






	
	
	
	
	
	
	
	


	
	
	
	$('body').delegate('.icon_editor_html','click',function(){
		
		//$('#switchBox').prop('checked', true);
		
		if(html_ativo == 0){
		
			$(".icon_editor_html_b").css({ opacity: 0.3 });
			$(".icon_editor_html_i").css({ opacity: 0.3 });
			$(".icon_editor_html_u").css({ opacity: 0.3 });
			$(".icon_editor_html_emoji").css({ opacity: 0.3 });
			$(".icon_editor_html_color").css({ opacity: 0.3 });
			$(".icon_editor_html_video").css({ opacity: 0.3 });
			$(".icon_editor_html_foto").css({ opacity: 0.3 });
			$(".icon_editor_html_localizacao").css({ opacity: 0.3 });
			$(".icon_editor_html_justify_left").css({ opacity: 0.3 });
			$(".icon_editor_html_justify_center").css({ opacity: 0.3 });
			$(".icon_editor_html_justify_right").css({ opacity: 0.3 });
			$(".icon_editor_html_background_color").css({ opacity: 0.3 });
			$(".icon_editor_html_ol").css({ opacity: 0.3 });
			$(".icon_editor_html_ul").css({ opacity: 0.3 });
			$(".intLink").css({ opacity: 0.3 });
			$(".icon_editor_html_font_size").css({ opacity: 0.3 });
			$(".icon_editor_html_font_name").css({ opacity: 0.3 });
			
			
			
			$(".icon_editor_html_b").removeClass( "on_hover" );
			$(".icon_editor_html_i").removeClass( "on_hover" );
			$(".icon_editor_html_u").removeClass( "on_hover" );
			$(".icon_editor_html_emoji").removeClass( "on_hover" );
			$(".icon_editor_html_color").removeClass( "on_hover" );
			$(".icon_editor_html_video").removeClass( "on_hover" );
			$(".icon_editor_html_foto").removeClass( "on_hover" );
			$(".icon_editor_html_localizacao").removeClass( "on_hover" );
			$(".icon_editor_html_justify_left").removeClass( "on_hover" );
			$(".icon_editor_html_justify_center").removeClass( "on_hover" );
			$(".icon_editor_html_justify_right").removeClass( "on_hover" );
			$(".icon_editor_html_background_color").removeClass( "on_hover" );
			$(".icon_editor_html_ol").removeClass( "on_hover" );
			$(".icon_editor_html_ul").removeClass( "on_hover" );
			$(".intLink").removeClass( "on_hover" );
			
			$(".icon_editor_html_font_size").removeClass( "on_hover" );
			$(".icon_editor_html_font_name").removeClass( "on_hover" );
			
			
			
			$('#select_editor_html_1').prop('disabled', 'disabled');
			$('#select_editor_html_2').prop('disabled', 'disabled');

			setDocMode(1);
			
			html_ativo = 1;

		}else{
			
			$(".icon_editor_html_b").css({ opacity: 1.0 });
			$(".icon_editor_html_i").css({ opacity: 1.0 });
			$(".icon_editor_html_u").css({ opacity: 1.0 });
			$(".icon_editor_html_emoji").css({ opacity: 1.0 });
			$(".icon_editor_html_color").css({ opacity: 1.0 });
			$(".icon_editor_html_video").css({ opacity: 1.0 });
			$(".icon_editor_html_foto").css({ opacity: 1.0 });
			$(".icon_editor_html_localizacao").css({ opacity: 0.3 });
			$(".icon_editor_html_justify_left").css({ opacity: 1.0 });
			$(".icon_editor_html_justify_center").css({ opacity: 1.0 });
			$(".icon_editor_html_justify_right").css({ opacity: 1.0 });
			$(".icon_editor_html_background_color").css({ opacity: 1.0 });
			$(".icon_editor_html_ol").css({ opacity: 1.0 });
			$(".icon_editor_html_ul").css({ opacity: 1.0 });
			$(".intLink").css({ opacity: 1.0 });
			$(".icon_editor_html_font_size").css({ opacity: 1.0 });
			$(".icon_editor_html_font_name").css({ opacity: 1.0 });
			
			
			
			$(".icon_editor_html_b").addClass( "on_hover" );
			$(".icon_editor_html_i").addClass( "on_hover" );
			$(".icon_editor_html_u").addClass( "on_hover" );
			$(".icon_editor_html_emoji").addClass( "on_hover" );
			$(".icon_editor_html_color").addClass( "on_hover" );
			$(".icon_editor_html_video").addClass( "on_hover" );
			$(".icon_editor_html_foto").addClass( "on_hover" );
			$(".icon_editor_html_localizacao").addClass( "on_hover" );
			$(".icon_editor_html_justify_left").addClass( "on_hover" );
			$(".icon_editor_html_justify_center").addClass( "on_hover" );
			$(".icon_editor_html_justify_right").addClass( "on_hover" );
			$(".icon_editor_html_background_color").addClass( "on_hover" );
			$(".icon_editor_html_ol").addClass( "on_hover" );
			$(".icon_editor_html_ul").addClass( "on_hover" );
			$(".intLink").addClass( "on_hover" );

			$(".icon_editor_html_font_size").addClass( "on_hover" );
			$(".icon_editor_html_font_name").addClass( "on_hover" );
			
			
			$('#select_editor_html_1').prop('disabled', false);
			$('#select_editor_html_2').prop('disabled', false);
			
			
			setDocMode(0);
			html_ativo = 0;
		}
			
		});
	

	
	
	
	
//editor_html_color_option
	$('body').delegate('.editor_html_font_size_select','click',function(){
		$( ".box_editor_html_font_size" ).toggle();
	});	
	$('body').delegate('.editor_html_font_name_select','click',function(){
		$( ".box_editor_html_font_name" ).toggle();
	});
	
	$('body').delegate('.editor_html_background_color_option','click',function(){
		$( ".box_editor_html_background_color" ).toggle();
	});		
	$('body').delegate('.editor_html_color_option','click',function(){
		$( ".box_editor_html_color" ).toggle();
	});	
	
	$('body').delegate('.editor_html_emoji','click',function(){

		var emoji = "";
		var data = $(this).attr("data");
		
		
		if(data == 1){
			emoji = ":)";
		}else if(data == 3){
			emoji = "<3";
		}else if(data == 4){
			emoji = ":D";
		}else if(data == 5){
			emoji = ":-o";
		}else if(data == 6){
			emoji = ";)";
		}else if(data == 8){
			emoji = ":P";
		}else if(data == 9){
			emoji = "B-)";
		}else if(data == 10){
			emoji = ":'(";
		}else if(data == 11){
			emoji = "x-(";
		}else if(data == 12){
			emoji = ":-/";
		}


		$('#textBox').append(emoji);
		
		$( ".box_editor_html_emoji" ).toggle();

	});	
	
	$('body').delegate('.icon_editor_html_emoji','click',function(){
		
		$( ".box_editor_html_emoji" ).toggle();
		
	});	
	
	$('body').delegate('.icon_editor_html_video','click',function(){
		
		if ( $(".youtube_video_input_box").css('display') == 'none' ){
			
			$(".youtube_video_input_box").css("display", "flex");
			
			setFocusElement("youtube_video_input");
			
		}else{
			
			$(".youtube_video_input_box").css("display", "none");
			
		}
	});

	$('body').delegate('.youtube_video_input_x','click',function(){
		$( '.youtube_video_input' ).val("");
		$( ".editor_html_video_preview" ).html('');
		$(".youtube_video_input_box").css("display", "none");
	});
	
	


   
 	$('body').delegate('.post_opcoes_feed','click',function(){
		var data = $(this).attr("data");
		$( "#"+data ).toggle();
	});
	  
 	$('body').delegate('.arrow_down_icon_like','click',function(){
		
		
		var data = $(this).attr("data");
		
		
		if ( $("#feed_reacoes_box_select_"+data).css('display') == 'none' ){
			
			$(this).addClass( "arrow_down_icon_like_active" );
			$("#feed_reacoes_box_select_"+data).css("display", "block");
			
			
		}else{
			
			
			$("#feed_reacoes_box_select_"+data).css("display", "none");
			$(this).removeClass( "arrow_down_icon_like_active" );
			
			
		}
	
	});   
   
   
 	$('body').delegate('.btn_reacao, .like_feed_post_direct','click',function(){
		
		
			var reacao = $(this).attr("data");
			var id = $(this).attr("id");
			
			
			if( reacao == 1 ){
				
				$(".like_post_" + id).css("background-position", "0px -587px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 2 ){
				
				$(".like_post_" + id).css("background-position", "0px -722px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 3 ){
				
				$(".like_post_" + id).css("background-position", "0px -708px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 4 ){
				
				$(".like_post_" + id).css("background-position", "0px -572px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 5 ){
				
				$(".like_post_" + id).css("background-position", "0px -647px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 6 ){
				
				$(".like_post_" + id).css("background-position", "0px -602px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 7 ){
				
				$(".like_post_" + id).css("background-position", "0px -677px");
				$(".like_feed_post_direct").attr("data", "0");
				$( ".gostou_post_text_" +id ).html("desfazer?");
			}else if( reacao == 0 ){
				
				$(".like_post_" + id).css("background-position", "0px -767px");
				$(".like_feed_post_direct").attr("data", "1");
				$( ".gostou_post_text_" +id ).html("gostou?");
			}
			
			
			
			$("#feed_reacoes_box_select_"+id).css("display", "none");
			$("#arrow_down_icon_like_"+id).removeClass( "arrow_down_icon_like_active" );
			
			$.ajax({
			  url: 'ajax/post/reacao-post.php',
			  type: 'POST',
			  data : {
			  'reacao':reacao,
			  'id':id
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {
				$("#feed_box_reaction_center_" + id).html(data);
			  },
			  beforeSend: function(){
				//$('#load-post').css({display:"block"});
			  },
			  complete: function(){
				//atualizaReacoesPost(id);
			  },error: function (request, status, error) {
							mostraAvisoErro();
							setTimeout(fechaAvisoErro, 10000);
						}
			});
	});
	
	
	
	
	
	
	
 	$('body').delegate('.comment_post','click',function(){
		
		var data = $(this).attr("data");
		
		if ( $("#feed_box_create_comment_post_"+data).css('display') == 'none' ){
			
			$("#feed_box_create_comment_post_"+data).css("display", "flex");
			
			setFocusElement("feed_box_create_comment_post_compose_show_"+data);
			
		}else{
			
			$("#feed_box_create_comment_post_"+data).css("display", "none");
			
		}	
	});
	
	

	
	function getMorListLikes(fim_anterior, id){
		
		$.ajax({
		  url: 'ajax/post/get_lista_reacoes_post.php',
		  type: 'POST',
		  data : {
		  'fim_anterior':fim_anterior,
		  'id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			  $(".show_more_likes_"+id).remove();
			  $("#feed_box_bottom_show_likes_list_center_" + id).append(data);
		  },
		  beforeSend: function(){
			$( " .show_more_likes_ " + id ).html("buscando...");
		  },
		  complete: function(){
			//atualizaReacoesPost(id);
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
		
	}
	
	
	
	
	
	
	
 	$('body').delegate('.show_likes_list_center_interval_more','click',function(){
		
		$(this).removeClass( "show_likes_list_center_interval_more" );
		$(this).addClass( "show_likes_list_center_interval_and" );
		
		$(this).html("buscando...");
		
		var fim_anterior = $(this).attr("data");
		var id = $(this).attr("id");
		
		
		

		$.ajax({
		  url: 'ajax/post/get_lista_reacoes_post.php',
		  type: 'POST',
		  data : {
		  'fim_anterior':fim_anterior,
		  'id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			 
			  $("#feed_box_bottom_show_likes_list_center_" + id).append(data);
		  },
		  beforeSend: function(){
			
		  },
		  complete: function(){
			$(".show_likes_list_center_interval_and").css("display", "none");
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
		
	});	

	
	$("body").delegate( ".btn_enviar_novo_comentario_post", "click", function() {
		
		var id = $(this).attr("data");
		var comentario = $("#feed_box_create_comment_post_compose_show_"+id).html();

		$.ajax({
		  url: 'ajax/post/postagem-comentario.php',
		  type: 'POST',
		  data : {
			'comentario':comentario,
			'comentarioid':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			  $("#feed_box_bottom_comment_show_" + id).append(data);
			  $("#btn_enviar_novo_comentario_post_"+id).html("postar");
			  $("#feed_box_create_comment_post_compose_show_"+id).html("");
		  },
		  beforeSend: function(){
			$("#btn_enviar_novo_comentario_post_"+id).html("enviando");
			//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"block"});
		  },
		  complete: function(){
			//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"none"});
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
	});	
	
	
	$("body").delegate( ".btn_show_more_comments", "click", function() {
		
		var id = $(this).attr("id");
		var pagina = $(this).attr("data");
		

		
		//var comentario = $("#feed_box_create_comment_post_compose_show_"+id).html();

		$.ajax({
		  url: 'ajax/post/postagem-comentario-exibe.php',
		  type: 'POST',
		  data : {
			'pagina':pagina,
			'id':id
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
		$(".btn_show_more_comments_"+id).remove();
		$(".show_comment_total_to_"+id).remove();
			  $("#feed_box_bottom_comment_show_" + id).append(data);
			 // $("#btn_enviar_novo_comentario_post_"+id).html("postar");
			  //$("#feed_box_create_comment_post_compose_show_"+id).html("");
		  },
		  beforeSend: function(){
			$(".btn_show_more_comments_"+id).html("buscando...");
			//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"block"});
		  },
		  complete: function(){
			//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"none"});
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
	});		
	
	
	$("body").delegate( ".excluir-publicacao-feed", "click", function() {
		
		var id = $(this).attr("id");

		
		
		var confirma = confirm("Tem certeza de que deseja remover esta postagem ?");
		
		if(confirma == true){
			
			$.ajax({
			  url: 'ajax/post/excluir-postagem.php',
			  type: 'POST',
			  data : {
				'Id':id
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {
				  $("#post-" + id).remove();
			  },
			  beforeSend: function(){
				//$(".btn_show_more_comments_"+id).html("buscando...");
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"block"});
			  },
			  complete: function(){
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"none"});
			  },error: function (request, status, error) {
							mostraAvisoErro();
							setTimeout(fechaAvisoErro, 10000);
						}
			});
		
		}else{
			
			$("#post_opcoes_feed_menu_center_"+id).toggle();
		}
	});	
	
	$("body").delegate( ".ocultar-publicacao-feed", "click", function() {
		
		var id = $(this).attr("id");

		
		
		var confirma = confirm("Tem certeza de que deseja ocultar permanentemente esta postagem ?");
		
		if(confirma == true){
			
			$.ajax({
			  url: 'ajax/post/oculta-postagem.php',
			  type: 'POST',
			  data : {
				'Id':id
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {
				  $("#post-" + id).remove();
			  },
			  beforeSend: function(){
				//$(".btn_show_more_comments_"+id).html("buscando...");
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"block"});
			  },
			  complete: function(){
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"none"});
			  },error: function (request, status, error) {
							mostraAvisoErro();
							setTimeout(fechaAvisoErro, 10000);
						}
			});
		
		}else{
			
			$("#post_opcoes_feed_menu_center_"+id).toggle();
		}
	});		
	
	
	
	
	
	$("body").delegate( ".ocultar-tudo-usuario-feed", "click", function() {
		
		var id = $(this).attr("id");

		
		
		var confirma = confirm("Tem certeza de que deseja ocultar permanentemente esta postagem ?");
		
		if(confirma == true){
			
			$.ajax({
			  url: 'ajax/post/oculta-postagem.php',
			  type: 'POST',
			  data : {
				'Id':id
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {
				  $("#post-" + id).remove();
			  },
			  beforeSend: function(){
				//$(".btn_show_more_comments_"+id).html("buscando...");
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"block"});
			  },
			  complete: function(){
				//$('#btn-enviar-comentario-load-modal-'+comentarioid).css({display:"none"});
			  },error: function (request, status, error) {
							mostraAvisoErro();
							setTimeout(fechaAvisoErro, 10000);
						}
			});
		
		}else{
			
			$("#post_opcoes_feed_menu_center_"+id).toggle();
		}
	});
	
	
	
	
	$("body").delegate( ".feed_box_bottom_comment_action_delete_comment", "click", function() {
		
		var id = $(this).attr("id");

		var confirma = confirm("Tem certeza de que deseja excluir permanentemente este comentÃ¡rio ?");
		
		if(confirma == true){
			
			$.ajax({
			  url: 'ajax/post/excluir-postagem-comentario.php',
			  type: 'POST',
			  data : {
				'Id':id
			  },
			  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			  success: function(data) {

			  },
			  beforeSend: function(){
				$("#comentario_post_feed_" + id).remove();
			  },
			  complete: function(){
				  
			  },error: function (request, status, error) {
							mostraAvisoErro();
							setTimeout(fechaAvisoErro, 10000);
						}
			});
		
		}
	});	
	

	//ver_mais_post_feed
	
	
	$("body").delegate( ".ver_mais_post_feed", "click", function() {
		getMaisPostagensFeed();
	});
	
	
	function getMaisPostagensFeed(){
		
		var inicio = $(".limitador_post_carregado").last().attr("id");
		var tipo = $("#home_feed_box").attr("tipo");
		var user = $(".user_id").attr("id");
		
		$.ajax({
			  url: 'ajax/post/'+tipo+'.php',
			  type: 'POST',
			  
			  data : {
			  'inicio':inicio,
			  'user':user
			  },
			  success: function(data) {

				$('#home_feed_box_show').append(data);

			  },
			  beforeSend: function(){
				$('.ver_mais_post_feed').html('<center><img src="media/img/rolling_128.gif" width="24px"></center>');
			  },
			  complete: function(){
				 $('.ver_mais_post_feed').html('ver mais postagens');
				 
				// verificaPostagensRepetidas();
			  },error: function (request, status, error) {
					mostraAvisoErro();
					setTimeout(fechaAvisoErro, 10000);
				}
		});
		
	}
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$('body').delegate('.btn_new_post_recados','click',function(){
			

		var user = $(this).attr("data");
		var post = $("#textBox").html();
		var video = $( '.youtube_video_input' ).val();
		var img = $("#img_post_new").val();
		var users = "";
		var privacidade = $('.home_feed_box_composer_select_privacity_selected').attr('id');;
		var tipo = "feed";
		var box_gradient_post_banner = 0;
		
		
		post = post.trim();
		
		if(post != "" || video != "" || img != ""){
			
			$("#btn_new_post_feed").removeClass( "btn_new_post_feed" );
			
			enviaNovoRecado(post, video, privacidade, img, tipo, users, box_gradient_post_banner, user);
			
		}else{
			alert("VocÃª precisa escrever algo antes de enviar!");

		}	
	});	
	
//str.trim()
	function enviaNovoRecado(post, video, privacidade, img, tipo, users, box_gradient_post_banner, user){
		
		$.ajax({
		  url: 'ajax/recados/postagem.php?user='+user,
		  type: 'POST',
		  data : {
		  'comentario':post,
		  'video':video,
		  'privacidade':privacidade,
		  'img':img,
		  'users':users,
		  'box_gradient_post_banner':box_gradient_post_banner
		  },
		  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		  success: function(data) {
			location.reload();
		  },
		  beforeSend: function(){
			$(".btn_enviar_novo_comentario").html("enviando");
		  },
		  complete: function(){
				
		  },error: function (request, status, error) {
						mostraAvisoErro();
						setTimeout(fechaAvisoErro, 10000);
					}
		});
	}

	
	
	
	
	
	
	
	function setFocusElement(elemento) {
		document.getElementById(elemento).focus();
	}
   
   
});	
