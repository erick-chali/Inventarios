(function($, window, document) {

   
   $(function() {

	   verificarP1();
	   $('#notificacionExito').hide();
	   $('#notificacionInfo').hide();
	   $('#notificacionError').hide();
	   $(window).resize(function () {
	        $('#tablaDatosDiferencia').bootstrapTable('resetView');
	   });
	   cargarDiferencias();
	   
	   
   });/**Fin de document.ready()*/
   
   /**FUNCIONES UTLIZADAS*/
 //funcion que verifica los permisos del usuario
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
			   if(ceros == 5){
				   alert('No tiene ninguna opcion asignada, comuniquese con el administrador');
				   window.location = "Logout";
			   }
			   if(diferencia==0&&auditoria==1){
				   window.location = "admin.jsp";
			   }
			   if((conteo1==1||conteo2==1||inventario==1)&&diferencia==0){
				   $.ajax({
					   type : 'POST',
					   url: 'BuscarEstado',
					   dataType: 'html',
					   error: function(data) {
						   var obj = JSON.parse(JSON.stringify(data));
						   notificacionError(obj.responseText);
					   },
					   success: function(data) {
						   
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
   //funcion de sumar cantidades
   function sumarCantidad(){
		var cantidadActual = parseInt($('#cantidadActual').val());
		var cantidadIngresada;
		if($('#cantidad').val() ==  ''){
			cantidadIngresada=0;
		}else{
			cantidadIngresada = parseInt($('#cantidad').val());
		}
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
	}
   //actualizar la cantidad de lo seleccionado
   function ActualizarProd(){
		var codigoP=$('#codigoProducto').val();
		var codigoB=$('#bodega').val();
		var codigoE=$('#estanteria').val();
		var codigoS=$('#seccion').val();
		var descripP=$('#descripcion').val();
		var unidadM=$('#unidad').val();
		var cantidadT=$('#cantidadTotal').val();
		$.post('ActualizarProducto', {
			codigop : codigoP,
			codigob: codigoB,
			codigoe: codigoE,
			codigos: codigoS,
			descrip: descripP,
			unidad: unidadM,
			cantidad: cantidadT
		}, function(responseText) {
			$('#notificacion').text(responseText);
			
			$('#codigoProducto').val("");
			$('#descripcion').val("");
			$('#unidad').val("");
			$('#cantidad').val("");
			$('#cantidadTotal').val("");
			$('#cantidadActual').val("");
			$("#bodega option[value="+""+"]").attr("selected",true);
			$("#estanteria option[value="+""+"]").attr("selected",true);
			$("#seccion option[value="+""+"]").attr("selected",true);
			
		});
	}
   function generarDiferencias(){
	   $.ajax({
		   type : 'POST',
		   url: 'GenerarDiferencias',
		   dataType: 'html',
		   error: function(data) {
		      var obj = JSON.parse(JSON.stringify(data));
		      alert(obj.responseText);
		   },
		   success: function(data) {
			   console.log(JSON.stringify(data));
			   $('#contenedorDiferencias').empty();
			   cargarDiferencias();
		   }
		});
   }
   function cargarDiferencias(){
	   $.ajax({
		   method : 'POST',
		   url: 'CargarDiferencias',
		   dataType: 'json',
		   error: function(data) {
			   var obj = JSON.parse(JSON.stringify(data));
			   $('#notificacionError').fadeIn(1000);
			   $('#notificacionError').text(obj.responseText);
			   $('#notificacionError').fadeOut(2000);
		   },
		   success: function(data) {

			   $('#contenedorDiferencias').empty();
			   var tabla = $('<table id="tablaDatosDiferencia"></table>');
			   var thead = $('<thead></thead>');
			   var enc = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>');
			   thead.appendTo(tabla);
			   enc.appendTo(thead);
			   tabla.appendTo('#contenedorDiferencias');
			   var $tabla = $('#tablaDatosDiferencia');
			   $tabla.bootstrapTable({
						height: 600,
						data: data,
						pagination: true,
						classes: 'table table-striped table-hover table-bordered',
						pageSize: 10,
						pageList: [10, 25, 50, 100, 200],
						search: true,
						sortable: true,
		   				undefinedText: '',
		   				showColumns: true,
						columns: [
						{
				           field: 'codigoProducto',
				           title: 'C\u00F3digo Producto',
				           sortable: true
						}, 
						{
				           field: 'conteo',
				           title: 'Conteo',
				           sortable: true,
//				           editable: {
//		                   	type: 'text',
//		                   	showbuttons: false,
//		                   	emptytext: ''
//		                   }
						},
						{
				           field: 'familia',
				           title: 'Familia',
		                   visible: false
						},
						{
					       field: 'marca',
					       title: 'Marca',
		                   visible: false
						},
						{
						   field: 'diferencia',
						   title: 'Diferencia',
						   sortable: true,
						},
						{
							field: 'teorico',
							title: 'Te\u00F3rico'
						},
						{
							field: 'reservado',
						    title: 'Reservado'
						},
		                {
		                    field: 'estanteriaID',
		                    title: 'Estanter\u00EDa',
		                    sortable: true,
		                    visible: false
		                },
		                {
		                    field: 'seccionID',
		                    title: 'Secci\u00F3n',
		                    sortable: true,
		                    visible: false
		                },
		                {
		                    field: 'unidad',
		                    title: 'Unidad',
		                    visible: false
		                }
						]
					});
			   $tabla.on('editable-save.bs.table', function(e, field,row,oldValue){
				   var codigo = row.codigoProducto.split(' ');
				   $.ajax({
					   type : 'POST',
					   url : 'TomarConteoDiferencia',
					   dataType : 'html',
					   data : {
						   unidad: row.unidad,
						   codigop: codigo[0],
						   codigob: row.bodegaID,
						   codigos: row.seccionID,
						   codigoe: row.estanteriaID,
						   cantidad: row.conteo,
						   
					   },
					   error : function(e){
						   var obj = JSON.parse(JSON.stringify(data))
						   $('#notificacionError').text(obj.responseText);
						   $('#notificacionError').fadeOut(500);
						   $('#notificacionError').fadeOut(500);
					   },
					   success : function(data){
						   console.log(data);
						   $('#notificacionExito').text(data);
						   $('#notificacionExito').fadeIn(500);
						   $('#notificacionExito').fadeOut(1000);
						   generarDiferencias();
					   }
				   });
			   });
		   }
		});
   }
  }(window.jQuery, window, document));