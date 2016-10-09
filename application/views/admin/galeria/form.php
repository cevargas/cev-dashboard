<div class="ibox-content">
   	<?php 
	   echo form_open_multipart( base_url( 'admin/galeria/salvar' ), 
	   		array( 'id' => 'form-galeria', 'method' => 'post', 
	   				'class' => 'form-horizontal', 'role' =>'form' ) ); 
	   ?>

	<?php 
		if(strlen(validation_errors()) > 0):
		?>
        	<div class="alert alert-danger">	
				<?php echo validation_errors(); ?>
            </div>
		<?php
		endif;	
	?>
        <div class="form-group">
            <label class="col-sm-2 control-label">Nome</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="nome" name="nome"
                	placeholder="Nome da Galeria" value="<?php echo (isset($galeria)) ? $galeria->nome : set_value('nome');?>">
            </div>
        </div>    
        
        <div class="form-group">
        	<label class="col-sm-2 control-label">Descrição</label>
            <div class="col-sm-6">
            	<input type="text" class="form-control" id="descricao" name="descricao"
                	placeholder="Descrição" value="<?php echo (isset($galeria)) ? $galeria->descricao : set_value('descricao');?>">
            </div>
        </div>

        <div class="form-group">
        	<label class="col-sm-2 control-label">Imagens</label>
            <div class="col-sm-10">	
				<input type="file" class="form-control" name="images[]" id="filer_input" multiple/>			
            </div>		
        </div>	
        
        <div class="hr-line-dashed"></div>
        
        <div class="form-group">        	
            <div class="col-sm-offset-2 col-sm-8">    
            	 <input type="hidden" name="id" value="<?php echo (isset($galeria)) ? $galeria->id : NULL;?>" />
                 <a href="<?php echo base_url()?>admin/galeria" class="btn btn-white ">Voltar</a>    
            	 <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </div>    
    <?php echo form_close();?>
</div>