
(function($, window, document) {
	
	$(function() {
			   
		verificarP1();
		$(window).resize(function () {
	        $('#tablaAuditor').bootstrapTable('resetView');
	    });
		$tabla = $('#tablaAuditor');
		
		$tabla.bootstrapTable({
				method: 'POST',
				url: 'CargarProductosAuditor',
				height: 400,
				pagination: true,
				smartDisplay: true,
				pageSize: 10,
				pageList: [10, 25, 50, 100, 200],
				undefinedText: '',
				search: true,
			columns: [
		{
		    field: 'noToma',
		    title: 'Toma'
		}, 
			{
            field: 'codigoProducto',
            title: 'C\u00F3digo'
        }, 
        {
            field: 'descripcion',
            title: 'Descripci\u00F3n',
            width: '500px'
        },
        {
            field: 'unidad',
            title: 'Unidad'
        },
        {
            field: 'conteo1',
            title: 'Conteo 1'
        },
        {
            field: 'conteo2',
            title: 'Conteo 2'
        },
        {
        	field: 'bodega',
        	title: 'Bodega',
            width: '200px'
        },
        {
            field: 'estanteria',
            title: 'Estanter\u00EDa',
            width: '200px'
        },
        {
            field: 'seccion',
            title: 'Secci\u00F3n',
            width: '200px',
        },
        {
        	field: 'usuarioID',
        	title: 'UsuarioID',
        	visible: false
        },
        {
        	field: 'username',
        	title: 'Usuario',
        	visible: false
        },
        {
        	field: 'nombre',
        	title: 'Nombre'
        },
        {
            field: 'bodegaID',
            title: 'Bodega',
            visible: false
        },
        {
            field: 'estanteriaID',
            title: 'Estanter\u00EDa',
            visible: false
        },
        {
            field: 'seccionID',
            title: 'Secci\u00F3n',
            visible: false
        }
        ]
			});
	});
	function verificarP1(){
		   $.ajax({
			   type : 'POST',
			   url: 'Permisos',
			   dataType: 'json',
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   console.log(JSON.stringify(data));
				   notificacionError(obj.responseText);
				   
			   },
			   success: function(data) {
				   var conteo1, conteo2, inventario, auditoria, diferencia;
				   var ceros = 0;
				   console.log(JSON.stringify(data));
				   for(var i = 0; i < data.length; i++) {
					    var obj = data[i];
					    switch(i){
					    case 0:
					    	if(obj.permiso==1){
								   $('#conteo1').show();
								   conteo1 = 1;
						    }else{
						    	ceros++;
								   $('#conteo1').hide();
								   conteo1 = 0;
						    }
					    	break;
					    case 1:
					    	if(obj.permiso==1){
								   $('#conteo2').show();
								   conteo2 = 1;
						    }else{
						    	ceros++;
								   $('#conteo2').hide();
								   conteo2 = 0;
						    }
					    	break;
					    case 2: 
					    	if(obj.permiso==1){
								   $('#inventario').show();
								   inventario = 1;
						    }else{
						    	ceros++;
								   $('#inventario').hide();
								   inventario = 0;
						    }
					    	break;
					    case 3:
					    	if(obj.permiso==1){
								   $('#auditoria').show();
								   auditoria = 1;
						    }else{
						    	ceros++;
								   $('#auditoria').hide();
								   auditoria = 0;
						    }
					    	break;
					    case 4:
					    	if(obj.permiso==1){
								   $('#diferencia').show();
								   diferencia = 1;
						    }else{
						    	ceros++;
								   $('#diferencia').hide();
								   diferencia = 0;
						    }
					    	break;
					    }
					    
					}
				   console.log('conteo1: ' +conteo1);
				   console.log('conteo2: ' +conteo2);
				   console.log('inv: ' +inventario);
				   console.log('audit: ' +auditoria);
				   console.log('dif: ' +diferencia);
				   if(ceros == 5){
					   alert('No tiene ninguna opcion asignada, comuniquese con el administrador');
					   window.location = "Logout";
				   }
				   if(auditoria==0&&diferencia==1){
					   window.location = "diferencia.jsp";
				   }
				   if(conteo1==1||conteo2==1||inventario==1){
					   $.ajax({
						   type : 'POST',
						   url: 'BuscarEstado',
						   dataType: 'html',
						   error: function(data) {
							   var obj = JSON.parse(JSON.stringify(data));
							   notificacionError(obj.responseText);
						   },
						   success: function(data) {
							   
							   if(auditoria==0){
								   if(data=='2'){
									   if(conteo1 == 1 && conteo2 == 1){
										   window.location = "agregar.jsp";
									   }
								   }else if(data=='3'){
									   if(conteo1 == 1 && conteo2 == 1){
										   window.location = "agregar2.jsp";
									   }
								   }
							   }
							   
						   }
						});   
				   }
			   }
			});
	   }
	   function verificarP2(){
		   $.ajax({
			   type : 'POST',
			   url: 'Permisos',
			   dataType: 'html',
			   data: {
				   op: 'conteo2'
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   $('#notificacionError').hide();
				   $('#notificacionError').text(obj.responseText);
				   $('#notificacionError').show();
				   $('#notificacionError').fadeOut(4000);
			   },
			   success: function(data) {
				   if(data=='1'){
					   $('#conteo2').show();
				   }else{
					   $('#conteo2').hide();
				   }
			   }
			});
	   }
	   function verificarP3(){
		   $.ajax({
			   type : 'POST',
			   url: 'Permisos',
			   dataType: 'html',
			   data: {
				   op: 'inventario'
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   $('#notificacionError').hide();
				   $('#notificacionError').text(obj.responseText);
				   $('#notificacionError').show();
				   $('#notificacionError').fadeOut(4000);
			   },
			   success: function(data) {
				   if(data=='1'){
					   $('#inventario').show();
				   }else{
					   $('#inventario').hide();
				   }
			   }
			});
	   }
	   function verificarP4(){
		   $.ajax({
			   type : 'POST',
			   url: 'Permisos',
			   dataType: 'html',
			   data: {
				   op: 'auditoria'
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   $('#notificacionError').hide();
				   $('#notificacionError').text(obj.responseText);
				   $('#notificacionError').show();
				   $('#notificacionError').fadeOut(4000);
			   },
			   success: function(data) {
				   if(data=='1'){
					   $('#auditoria').show();
				   }else{
					   $('#auditoria').hide();
				   }
			   }
			});
	   }
	   function verificarP5(){
		   $.ajax({
			   method : 'POST',
			   url: 'Permisos',
			   dataType: 'html',
			   data: {
				   op: 'diferencia'
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   $('#notificacionError').hide();
				   $('#notificacionError').text(obj.responseText);
				   $('#notificacionError').show();
				   $('#notificacionError').fadeOut(4000);
			   },
			   success: function(data) {
				   if(data=='1'){
					   $('#diferencia').show();
				   }else{
					   $('#diferencia').hide();
				   }
			   }
			});
	   }
}(window.jQuery, window, document));