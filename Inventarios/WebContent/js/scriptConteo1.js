/**
 *Aqui todas las funciones que conectan las paginas jsp con servlet por medio de jQuery
 */
(function($, window, document) {

   $(function() {
	   var notificacion;
	   $(function () {
		    $(window).resize(function () {
		        $('#tablaProductoEmergente').bootstrapTable('resetView');
		    });
		});
	   $('#barraNav').hide();
	   $('#notificacionExito').hide();
	   $('#notificacionError').hide();
	   $('#notificacionInfo').hide();
	   setTimeout(function(){
		   verificarP1();
	    }, 200);
	   
//	   $(window).on('beforeunload', function(){
//		   return 'Esta seguro que desea cerrar?';
//	   });
//	   
//	   $(window).on('unload', function(){
//		   $.ajax({
//			   type : 'POST',
//			   url: 'CargarBodegas',
//			   dataType: 'json',
//			   error: function(data) {
//				   var obj = JSON.parse(JSON.stringify(data));
//				   notificacionError(obj.responseText);
//			   },
//			   success: function(data) {
//				   
//			   }
//			});
//	   });
	   
	   
//	   setTimeout(function(){
//		   verificarP2();
//	    }, 400);
//	   setTimeout(function(){
//		   verificarP3();
//	    }, 600);
//	   setTimeout(function(){
//		   verificarP4();
//	    }, 800);
//	   setTimeout(function(){
//		   verificarP5();
//	    }, 1000);
		$('#barraNav').show();

		$('#codigoProductoDF').hide();


		$("#bodega").focus();
		$("#bodega").click();
	 //Ocultar Notificacion
	   $('#notificacion').hide();
	   
	   $.ajax({
		   method : 'POST',
		   url: 'CargarEstanteria',
		   dataType: 'json',
		   error: function(data) {
			   var obj = JSON.parse(JSON.stringify(data));
			   $('#notificacionError').hide();
			   $('#notificacionError').text(obj.responseText);
			   $('#notificacionError').show();
			   $('#notificacionError').fadeOut(4000);
		   },
		   success: function(data) {
			   var select = $("#estanteria");
			   select.empty();
			   select.append("<option value='0'>Estanteria</option>");
			   $.each(data, function(index, element) {
				   select.append("<option value='" + element.estanteria_ID + "'>" + element.descripcion + "</option>");
			   });
		   }
		});
	   $(document).on('click', '#esDF', function(){
		   if($("#esDF").is(':checked')){
			   $('#codigoProducto').hide();
			   $('#codigoProductoDF').show();
			   $('#codigoProductoDF').focus();
			   $('#codigoProductoDF').click();
		   }else{
			   $('#codigoProductoDF').hide();
			   $('#codigoProducto').show();
			   $('#codigoProducto').focus();
			   $('#codigoProducto').click();
		   }
	   });
	   $(document).on('keyup', '#cantidad', function(e){
		   sumarCantidad();
	   }); 
//	   $("#cantidad").keyup(function(){
//	   	suvmarCantidad();
//	   });
	   $(document).on('click','#cantidad', function(){
		   	$(this).select();
			$(this).focus();
	   });
	   $(document).on('click','#codigoProducto', function(){
			$(this).select();
			$(this).focus();
	   });
	   $(document).on('keydown','#bodega', function(e){
		   if(e.keyCode==13){
			   $('#estanteria').focus();
			   $('#estanteria').click();
		   }
	   });
	   $(document).on('keydown','#estanteria', function(e){
		   if(e.keyCode==13){
			   $('#seccionA').focus();
			   $('#seccionA').click();
		   }
	   });
	   $(document).on('keydown','#seccionA', function(e){
		   if(e.keyCode==13){
			   $('#codigoProducto').focus();
			   $('#codigoProducto').click();
		   }
	   });

	   $(document).on('keydown','#bodega', function(e){
		   $('#estanteria').focus();
		   $('#estanteria').click();
	   });
	 //Buscar los datos del codigo de producto ingresado al presionar enter
	   
	   $(document).on('keydown', '#popCodigoProducto', function(e){
		  if(e.keyCode==13 || e.keyCode == 9){
			  e.preventDefault();
			  if($('#popCodigoProducto').val() == '' ){
				  $('#lblMensaje').text('Debe ingresar un codigo para buscar.');
			  }else{
				  $('#lblMensaje').text('');
				  buscarProductoEmergente();
			  }
		  } 
	   });
	   $(document).on('keydown', '#popDescripcionProducto', function(e){
			  if(e.keyCode==13 || e.keyCode == 9){
				  if($('#popDescripcionProducto').val() == '' ){
					  $('#lblMensaje').text('Debe ingresar descripcion para buscar.');
				  }else{
					  $('#lblMensaje').text('');
					  buscarProductoEmergente();
				  }
			  } 
		   });
	   $(document).on('keydown','#codigoProducto', function(e){

		   if(e.keyCode==13||e.keyCode==9){
			   if($('#seccionA').val()=='0'||$('#estanteria').val()=='0'){
				   notificacionInfo('Las b\u00FAsquedas necesitan: bodega, secci\u00F3n y estanter\u00CDa.');
				   
		   		   if($('#seccionA').val()=='0'){
					   $('#seccionA').focus();
					   $('#seccionA').click();
				   }
				   else if($('#estanteria').val()=='0'){
					   $('#estanteria').focus();
					   $('#estanteria').click();
				   }
			   }else if($('#codigoProducto').val()==''){
				   notificacionInfo('Debe ingresar un c\u00F3digo para contar');
				   $('#codigoProducto').focus();
			   }else{	
				   buscarProducto($('#codigoProducto').val()).done(function(data){
					   console.log(JSON.stringify(data));
					   $.each(data, function(index, element) {
						   $('#codigoProducto').val($.trim(element.codigoProducto));
						   $('#descripcion').val(element.descripcion);
						   $('#unidad').val(element.unidadInventario);
						   $('#cantidadActual').val(element.conteo1);
						   console.log('Conteo1: ' +element.conteo1);
					   });
					   if(data==''){
						   notificacionAlerta('C\u00F3digo: ' + $('#codigoProducto').val() + ' no Existe.');
						   
						   $('#codigoProducto').focus();
						   $('#codigoProducto').click();
					   }else{
						   sumarCantidad();
						   $('#cantidad').focus();
						   $('#cantidad').click();
					   }
					   if(parseInt($('#cantidadActual').val())>0){
						   $('#mensajeConteo').text('El producto:'+ $('#codigoProducto').val()
								   + ' ya fue contado.' +
								   '\nCantidad Actual: \n' + $('#cantidadActual').val()
						   );
						   $('#popAlertaConteo').modal('toggle');
					   }else{
						   sumarCantidad();
						   $('#cantidad').focus();
						   $('#cantidad').click();
					   }
				   });
			   }
		   }
			
		});
	   $(document).on('keydown','#codigoProductoDF', function(e){

		   if(e.keyCode==13||e.keyCode==9){
			   if($('#bodega').val()=='0'||$('#seccionA').val()=='0'||$('#estanteria').val()=='0'){
				   notificacionInfo('Las b\u00FAsquedas necesitan: bodega, secci\u00F3n y estanter\u00CDa.');
				   
		   		   if($('#bodega').val()=='0'){
					   $('#bodega').focus();
					   $('#bodega').click();
				   }else if($('#seccionA').val()=='0'){
					   $('#seccionA').focus();
					   $('#seccionA').click();
				   }
				   else if($('#estanteria').val()=='0'){
					   $('#estanteria').focus();
					   $('#estanteria').click();
				   }
			   }else if($('#codigoProductoDF').val()==''){
				   notificacionInfo('Debe ingresar un c\u00F3digo para ingresar');
			   }else{
				   buscarProducto($('#codigoProductoDF').val()).done(function(data){
					   console.log(JSON.stringify(data));
					   $.each(data, function(index, element) {
						   $('#codigoProductoDF').val($.trim(element.codigoProducto));
						   $('#descripcion').val(element.descripcion);
						   $('#unidad').val(element.unidadInventario);
						   $('#cantidadActual').val(element.conteo1);
						   console.log('Conteo1: ' +element.conteo1);
					   });
					   if(data==''){
						   notificacionAlerta('C\u00F3digo: ' + $('#codigoProductoDF').val() + ' no EXISTE.');
						   $('#codigoProductoDF').focus();
						   $('#codigoProducto').click();
					   }else{
						   sumarCantidad();
						   $('#cantidad').focus();
						   $('#cantidad').click();
					   }
					   if(parseInt($('#cantidadActual').val())>0){
						   $('#mensajeConteo').text('El producto ya fue contado:'+
								   '\nC\u00F3digo: ' + $('#codigoProductoDF').val() +
								   '\nCantidad Actual: \n' + $('#cantidadActual').val()
						   );
						   $('#popAlertaConteo').modal('toggle');
					   }else{
						   $('#cantidad').focus();
						   $('#cantidad').click();
					   }
				   });
			   }
		   }
			
		});
	   /*Tomar conteo 1 con el evento Enter en campo cantidad*/
	   $(document).on('keydown','#cantidad', function(e){
		   if(e.keyCode==13 || e.keyCode==190 || e.keyCode == 110 || e.keyCode == 9){
			   
			   if($("#estanteria").val() == '0' || $("#seccionA").val() == '0'){
				   notificacionInfo('seleccione bodega, seccion y estanteria');
//			   }else if(parseInt($('#cantidadActual').val())==parseInt($('#cantidad').val())){
			   }else if($('#cantidadTotal').val()<0){
				   notificacionAlerta('La cantidad total no puede ser menor a cero');
				   document.getElementById('cantidad').focus();
			   }else{
				   if($('#esDF').is(':checked')){
					   tomarConteo($('#codigoProductoDF').val()).done(function(data){
						   notificacionExito(data);
						   $('#codigoProductoDF').val('');
						   $('#descripcion').val('');
						   $('#unidad').val('');
						   $('#cantidadTotal').val('');
						   $('#cantidadActual').val('');
						   esMuestra();
						   $('#codigoProductoDF').focus();
						   $('#codigoProductoDF').click();
					   });
				   }else{
					   tomarConteo($('#codigoProducto').val()).done(function(data){
						   notificacionExito(data);
						   $('#codigoProducto').val('');
						   $('#descripcion').val('');
						   $('#unidad').val('');
						   $('#cantidadTotal').val('');
						   $('#cantidadActual').val('');
						   esMuestra();
						   $('#codigoProducto').focus();
						   $('#codigoProducto').click();
					   });
				   }
				   
			   }
		   }
	   });
	   /*Tomar Conteo 1 con el boton de "Agregar" */
	   $('#tomarInventario').click(function (event){
			var total =  parseInt($('#cantidadTotal').val());
			if($("#estanteria").val() == '0' || $("#seccionA").val() == '0'){
				notificacionInfo('seleccione bodega, seccion y estanteria');
			}else{
				if($('#esDF').is(':checked')){
					   tomarConteo($('#codigoProductoDF').val()).done(function(data){
						   notificacionExito(data);
						   $('#codigoProductoDF').val('');
						   $('#codigoProductoDF').focus();
						   $('#codigoProductoDF').click(); 
						   $('#descripcion').val('');
						   $('#unidad').val('');
						   $('#cantidadTotal').val('');
						   $('#cantidadActual').val('');
						   esMuestra();
					   });
				   }else{
					   tomarConteo($('#codigoProducto').val()).done(function(data){
						   notificacionExito(data);
						   $('#codigoProducto').val('');
						   $('#descripcion').val('');
						   $('#unidad').val('');
						   $('#cantidadTotal').val('');
						   $('#cantidadActual').val('');
						   esMuestra();
						   $('#codigoProducto').focus();
						   $('#codigoProducto').click();
					   });
				   }
			}
	   });
	   /**Permitir solo numeros y signo menos en el campo de cantidad*/
	   $("#cantidad").keydown(function (e) {
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 189]) !== -1 ||
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 return;
	        }
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	  });
	  /**capturar el evento de cambio de estanterias en el combo y ejecutar la funcion EsMuestra*/
	  $('#estanteria').change(function(){
		 var opcion = $(this).find('option:selected');
		 var idEst = $(opcion).val();
		 $.get('EsMuestra', {
			codigoe: idEst
			}, function(responseText) {
				$('#cantidad').val(responseText);
			});
		 $.get('BuscaSeccion', {
				codigoe: idEst
			}, function(responseJson) {
				
				if(responseJson!=null){
					var select = $("#seccionA");
					select.empty();
					select.append("<option value='0'>Seccion</option>");
					$.each(responseJson, function(key, value) {
						select.append("<option value='" + value['codigoSeccion'] + "'>" + value['descripcionSeccion'] + "</option>");
			       });
				}
			});
	  });
	  $('#alertaSi').click(function(e){
		  $('#popAlertaConteo').modal('toggle');
		  $('#cantidad').click();
		  
	  });
	  $('#alertaNo').click(function(e){
		  $('#popAlertaConteo').modal('toggle');
		  $('#codigoProducto').val('');
		  $('#descripcion').val('');
		  $('#unidad').val('');
		  $('#cantidadTotal').val('');
		  $('#cantidadActual').val('');
		  esMuestra();
		  $('#codigoProducto').click();
	  });
	  $('#buscarProducto').click(function(e){
//		  if($('#bodega').val()=='0'||$('#seccionA').val()=='0'||$('#estanteria').val()=='0'){
//			   notificacionInfo('Las b\u00FAsquedas necesitan: bodega, secci\u00F3n y estanter\u00CDa.');
//			   
//	   		   if($('#bodega').val()=='0'){
//				   $('#bodega').focus();
//				   $('#bodega').click();
//			   }else if($('#seccionA').val()=='0'){
//				   $('#seccionA').focus();
//				   $('#seccionA').click();
//			   }
//			   else if($('#estanteria').val()=='0'){
//				   $('#estanteria').focus();
//				   $('#estanteria').click();
//			   }
//		   }else if($('#codigoProducto').val()==''){
//			   notificacionInfo('Debe ingresar un c\u00F3digo para ingresar');
//		   }else{
			   cargarDatosProducto();
//		   }
	  });
	  $('#btnOcultarContenedor').click(function(event){
		  $('#contenedorCombos').toggle('slow');
	  });
	  
	  /**Boton para abrir la ventana emergente*/
	  $('#popAbrir').click(function(event){
			$('#popCodigoProducto').val("");
			$('#popDescripcionProducto').val("");
			$('#tablaPOP').empty();
			if($('#seccionA').val()=='0'||$('#bodega').val()=='0'||$('#estanteria').val()=='0'){
				alert('Las b\u00FAsquedas necesitan bodega, seccion y estanteria');
				$('#popBuscaProd').modal('toggle');
				$('#popCodigoProducto').focus();
			}
			
			
		});
	  
	  /**Buscar coincidencias de producto o descripcion del mismo en ventana emergente*/
	  $(document).on('click','#popBuscarProducto',function(){
		  if($('#popCodigoProducto').val()==''&&$('#popDescripcionProducto').val()==''){
			  $('#lblMensaje').text('Debe ingresar almenos 1 campo para poder buscar.');
			  
		  }else{
			  $('#lblMensaje').text('');
			  buscarProductoEmergente();
		  }
	  });
	  
	  
	  /**Llenar los campos: cantidad Actual, codigo, descripcion con datos de la tabla*/
//	  $jq("table[id$='popDatosBusqueda'] td:nth-child(1)").live('click',function(event) 
//				{  
//				//Para evitar que el link actue.  
//				event.preventDefault();  
//				var $td= $(this).closest('tr').children('td');
//				
//				$("#codigoProducto").val($td.eq(0).text()); 
//				$("#descripcion").val($td.eq(1).text()); 
//				$("#unidad").val($td.eq(3).text());
//				$("#cantidadActual").val($td.eq(4).text());
//				
//				$("#popBuscaProd").modal("toggle");
//				sumarCantidad();
//				}
//				
//			);
	  
   });/**Fin el document.ready()*/
   function sleep(milliseconds) {
	   var start = new Date().getTime();
	   for (var i = 0; i < 1e7; i++) {
	     if (i > milliseconds){
	       break;
	     }
	   }
	 }
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
			   if(conteo1==0 && conteo2 ==0 && inventario == 0){
				   if(auditoria==1){
					   window.location = "admin.jsp";
				   }else{
					   window.location = "diferencia.jsp";
				   }
			   }
			   $.ajax({
				   type : 'POST',
				   url: 'BuscarEstado',
				   dataType: 'html',
				   error: function(data) {
					   var obj = JSON.parse(JSON.stringify(data));
					   notificacionError(obj.responseText);
				   },
				   success: function(data) {
					   
					   if(data=='3'){
						   if(conteo1 == 1 && conteo2 == 1){
							   window.location = "agregar2.jsp";
						   }
//						   else if(conteo1==0 && conteo2==0){
//							   if(auditoria==1){
//								   window.location = "admin.jsp";
//							   }else{
//								   if(diferencia==1){
//									   window.location = "diferencia.jsp"
//								   }
//							   }
//						   }
					   }
//					   else if(data=='2'){
//						   if(conteo1 == 1 && conteo2 == 1){
//							   window.location = "agregar2.jsp";
//						   }else if(conteo1==0 && conteo2==0){
//							   if(auditoria==1){
//								   window.location = "admin.jsp";
//							   }else{
//								   if(diferencia==1){
//									   window.location = "diferencia.jsp"
//								   }
//							   }
//						   }
//					   }
				   }
				});
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
			   notificacionError(obj.responseText);
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
			   notificacionError(obj.responseText);
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

			   notificacionError(obj.responseText);
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
			   notificacionError(obj.responseText);
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
   //funcion para sumar cantidad actual con cantidad ingresada
   function sumarCantidad(){
		var cantidadActual;
		var cantidadIngresada;
		if($('#cantidad').val() ==  ''){
			cantidadIngresada=0;
		}else{
			cantidadIngresada = parseInt($('#cantidad').val());
		}
		if($('#cantidadActual').val()==''){
			cantidadActual = 0;
		}else{
			cantidadActual = parseInt($('#cantidadActual').val());
		}
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
   }
   
   function tomarConteo(codigoProducto){
	   
	   return $.ajax({
		   type : 'POST',
		   url: 'TomarConteo',
		   dataType: 'html',
		   data: {
			   codigop : codigoProducto,
			   codigob: $('#bodega').val(),
			   codigoe: $('#estanteria').val(),
			   codigos: $('#seccionA').val(),
			   descrip: $('#descripcion').val(),
			   unidad: $('#unidad').val(),
			   cantidad: $('#cantidadTotal').val()
		   },
		   error: function(data) {
			   var obj = JSON.parse(JSON.stringify(data));
			   notificacionError(obj.responseText);
		   }
		});
   }
   function buscarProductoEmergente(){
	   $('#tablaPOP').empty();
	   $.ajax({
		   type : 'POST',
		   url: 'BuscarProductoEmergente',
		   dataType: 'json',
		   data: {
			   codigoProducto : $('#popCodigoProducto').val(),
			   bodegaID: $('#bodega').val(),
			   estanteriaID: $('#estanteria').val(),
			   seccionID: $('#seccionA').val(),
			   descripcion: $('#popDescripcionProducto').val(),
		   },
		   error: function(data) {
		      var obj = JSON.parse(JSON.stringify(data));
			   notificacionError(obj.responseText);
		   },
		   success: function(data) {
			   var tabla = $('<table id="tablaProductoEmergente"></table>');
			   var thead = $('<thead></thead>');
			   var enc = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>');
			   thead.appendTo(tabla);
			   enc.appendTo(thead);
			   tabla.appendTo('#tablaPOP');
			   var $tabla = $('#tablaProductoEmergente');
			   $tabla.bootstrapTable({
	   				height: 200,
	   				data : data,
	   				pagination: true,
	   				pageSize: 50,
	   				pageList: [10, 25, 50, 100, 200],
//	   				onClickRow: function (row, $element) {
//	   					
//	   				},
	   			columns: [
	   			{
                    field: 'codigoProducto',
                    title: 'Codigo Producto',
                    width: '200px'
                }, 
                {
                    field: 'descripcion',
                    title: 'Descripcion',
                    width: '700px'
                },
                {
                    field: 'unidadInventario',
                    title: 'Unidad',
                    width: '200px'
                },
                {
                    field: 'conteo1',
                    title: 'Cant. Act.',
                    width: '200px'
                }
                ]
	   			});
			   $('#tablaProductoEmergente').on('click-row.bs.table', function (e, row, $element) {
				   $('#popBuscaProd').modal('toggle');
				   $('#codigoProducto').val($.trim(row.codigoProducto));
				   $('#descripcion').val(row.descripcion);
				   $('#unidad').val(row.unidadInventario);
				   $('#cantidadActual').val(row.conteo1);
				   sumarCantidad();
				   $('#cantidad').click();
				   $('#cantidad').focus();
			   });
		   }
		});
   }
   //funcion que toma todos los valores de la pantalla 
	function agregarAInventario(){
		var codigoP=$('#codigoProducto').val();
		var codigoB=$('#bodega').val();
		var codigoE=$('#estanteria').val();
		var codigoS=$('#seccionA').val();
		var descripP=$('#descripcion').val();
		var unidadM=$('#unidad').val();
		var cantidadT=$('#cantidadTotal').val();
		$.post('AgregarProducto', {
			codigop : codigoP,
			codigob: codigoB,
			codigoe: codigoE,
			codigos: codigoS,
			descrip: descripP,
			unidad: unidadM,
			cantidad: cantidadT
		}, function(responseText) {
			$('#notificacion').show();
			$('#notificacion').text(responseText);
			$('#codigoProducto').val("");
			$('#descripcion').val("");
			$('#unidad').val("");
			$('#cantidadTotal').val("");
			esMuestra();
			$('#cantidadActual').val("");
		});
		
		$("#codigoProducto").focus();
		
	}
	//funcion que verifica si la estanteria seleccionada es muestra o no
	function esMuestra(){
		var opcion = $('#estanteria');
		var estanteriaID = opcion.val();
		$.get('EsMuestra', {
			codigoe: estanteriaID
		}, function(responseText) {
			$("#cantidad").val(responseText);
		});
	}
	function notificacionError(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'danger',
			delay: 10000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "bottom",
				align: "center"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true,
		});
	}
	function notificacionExito(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'success',
			delay: 2500,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "right"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: false,
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message"><strong>{2}</strong></span>' +
		'</div>'
		});
	}
	function notificacionInfo(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'info',
			delay: 5000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "left"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true,
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message"><strong>{2}</strong></span>' +
		'</div>'
		});
	}
	function notificacionAlerta(mensaje){
		$.notify({
			// options
			message: mensaje 
		},{
			// settings
			element: 'body',
			type: 'warning',
			delay: 3000,
			spacing: 2,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "center"
			},
			animate: {
				enter: 'animated fadeInDown',
				exit: 'animated fadeOutUp'
			},
			newest_on_top: true,
			allow_dismiss: true,
			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="title">{1}</span>' +
			'<span data-notify="message"><strong>{2}</strong></span>' +
		'</div>'
		});
	}
	function cargarDatosProducto(){
		$.ajax({
			   type : 'POST',
			   url: 'BuscarProducto',
			   dataType: 'json',
			   data: {
			      codigoProducto : $('#codigoProducto').val(),
			      bodegaID : $('#bodega').val(),
			      seccionID : $('#seccionA').val(),
			      estanteriaID : $("#estanteria").val(),
			      
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   notificacionError(obj.responseText);
			   },
			   success: function(data) {
				   $.each(data, function(index, element) {
					   $('#codigoProducto').val($.trim(element.codigoProducto));
					   $('#descripcion').val(element.descripcion);
					   $('#unidad').val(element.unidadInventario);
					   $('#cantidadActual').val(element.conteo1);
				   });
				   if(data==''){
					   notificacionAlerta('C\u00F3digo de producto: ' + $('#codigoProducto').val() + ' no existe en la DB.');
					   
					   $('#codigoProducto').click();
				   }else{
					   sumarCantidad();
					   $('#cantidad').click();
				   }
				   
			   }
			});
	}
	function buscarProducto(codigoProducto){
		return $.ajax({
			   type : 'POST',
			   url: 'BuscarProducto',
			   dataType: 'json',
			   data: {
			      codigoProducto : codigoProducto,
			      bodegaID : $('#bodega').val(),
			      seccionID : $('#seccionA').val(),
			      estanteriaID : $("#estanteria").val(),
			      
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   notificacionError(obj.responseText);
			   }
			});
	}
  }(window.jQuery, window, document));



