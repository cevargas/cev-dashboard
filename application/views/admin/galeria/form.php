<div class="ibox-content">
   	<?php 
	   echo form_open_multipart( base_url( 'admin/galeria/salvar' ), 
	   		array( 'id' => 'form-upload', 'method' => 'post', 
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
            <label class="col-sm-2 control-label">Título</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="titulo" name="titulo"
                	placeholder="Título da Galeria" value="<?php echo (isset($galeria)) ? $galeria->titulo : set_value('titulo');?>">
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
	
				<span class="btn btn-success fileinput-button">
					<i class="glyphicon glyphicon-plus"></i>
					<span>Add files...</span>
					<input id="fileupload" type="file" name="files[]" multiple>
				</span>
				<button type="submit" class="btn btn-primary start">
					<i class="glyphicon glyphicon-upload"></i>
					<span>Iniciar upload</span>
				</button>
				<button type="reset" class="btn btn-warning cancel">
					<i class="glyphicon glyphicon-ban-circle"></i>
					<span>Cancelar upload</span>
				</button>
				<button type="button" class="btn btn-danger delete">
					<i class="glyphicon glyphicon-trash"></i>
					<span>Deletar</span>
				</button>					
            </div>		
        </div>

		<div class="form-group">
			<!-- The global progress bar -->
			<div id="progress" class="progress">
				<div class="progress-bar progress-bar-success"></div>
			</div>
			<!-- The container for the uploaded files -->
			<div id="files" class="files"></div>
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