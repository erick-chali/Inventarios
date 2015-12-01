(function($, window, document) {

    
   $(function() {

	   verificarP1();

		$(window).resize(function () {
	        $('#tablaProductosContados').bootstrapTable('resetView');
	    });
	   $('#notificacion').hide();
	   $('#notificacionExito').hide();
	   $('#notificacionInfo').hide();
		   $('#notificacionError').hide();
		   $(window).resize(function () {
		        $('#tablaConteo2').bootstrapTable('resetView');
		    });
	   /**Limpiar la caja de codigo de cualquier texto*/
//	   cargarBodegas();
	   $("#codigoToma2").focus(function (){
		   $(this).val("");
	   });
	   $("#bodega").focus();
	   $("#bodega").click();
	   $('#seccionAgregar').change(function(){
		   $('#btnAgregarProducto').prop('disabled', false);
	   });
	   $('#modalAgregarProducto').on('shown.bs.modal', function () {
		   cargarEstanteriaAgregar();
		   $('#btnAgregarProducto').prop('disabled', true);
		   $('#txtAgregarDescripcion').val('');
		   $('#txtAgregarUnidad').val('');
		   $('#seccionAgregar').empty();
		   $('#txtAgregarCantidad').val('');
		   $('#txtAgregarCodigo').val('');
		   $('#lblErrorAgregar').text('');
	   })
	   $(document).on('click','#btnNuevo', function(e){
		   $('#modalAgregarProducto').modal('toggle');
	   });
	   $(document).on('keydown','#txtAgregarCodigo', function(e){

		   if(e.keyCode==13||e.keyCode==9){
			   if($('#txtAgregarCodigo').val()==''){
				   $('#lblErrorAgregar').text('Debe ingresar un c\u00F3digo para buscar');
				   $('#txtAgregarCodigo').focus();
			   }else{	
				   $('#lblErrorAgregar').text('');
				   console.log('Buscando...');
				   buscarProducto($('#txtAgregarCodigo').val()).done(function(data){
					   $.each(data, function(index, element) {
						   console.log('Respuesta: ' + element.codigoProducto);
						   $('#txtAgregarCodigo').val($.trim(element.codigoProducto));
						   $('#txtAgregarDescripcion').val(element.descripcion);
						   $('#txtAgregarUnidad').val(element.unidadInventario);
						   $('#estanteriaAgregar').focus();
					   });
					   if(data==''){
						   $('#lblErrorAgregar').text('C\u00F3digo: ' + $('#codigoProducto').val() + ' no Existe.');
						   $('#txtAgregarCodigo').focus();
					   }
				   });
			   }
		   }
			
		});
	   $(document).on('click','#btnAgregarProducto', function(){
		   if($('#txtAgregarCodigo').val()=='' || $('#txtAgregarCantidad').val()=='' || $('#estanteriaAgregar').val()==0 || $('#seccionAgregar').val()==0){
			   $('#lblErrorAgregar').text('Necesita llenar todos los campos.');
		   }else{
			   $.ajax({
				   type : 'POST',
				   url : 'TomarConteo',
				   dataType : 'html',
				   data : {
					   codigop: $('#txtAgregarCodigo').val(),
					   codigos: $('#seccionAgregar').val(),
					   codigoe: $('#estanteriaAgregar').val(),
					   cantidad: $('#txtAgregarCantidad').val(),
					   
				   },
				   error : function(e){
					   var obj = JSON.parse(JSON.stringify(data))
					   $('#lblErrorAgregar').text(obj.responseText);
				   },
				   success : function(data){
					   $('#lblErrorAgregar').text('');
					   $('#modalAgregarProducto').modal('toggle');
					   notificacionExito(data)
				   }
			   });
		   }
	   });
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
	   $('#estanteriaAgregar').change(function(){
			 var opcion = $(this).find('option:selected');
			 var idEst = $(opcion).val();
			 $.ajax({
				   method : 'POST',
				   url: 'BuscaSeccion',
				   dataType: 'json',
				   data: {
					   codigoe: $('#estanteriaAgregar').val()
				   },
				   error: function(data) {
					   var obj = JSON.parse(JSON.stringify(data));
					   $('#notificacionError').hide();
					   $('#notificacionError').text(obj.responseText);
					   $('#notificacionError').show();
					   $('#notificacionError').fadeOut(4000);
				   },
				   success: function(data) {
					   var select = $("#seccionAgregar");
					   select.empty();
					   select.append("<option value='0'>Seccion</option>");
					   $.each(data, function(index, element) {
						   select.append("<option value='" + element.codigoSeccion + "'>" + element.descripcionSeccion + "</option>");
					   });
				   }
				});
		  });
	   $('#estanteria').change(function(){
			 var opcion = $(this).find('option:selected');
			 var idEst = $(opcion).val();
			 $.ajax({
				   method : 'POST',
				   url: 'BuscaSeccion',
				   dataType: 'json',
				   data: {
					   codigoe: $('#estanteria').val()
				   },
				   error: function(data) {
					   var obj = JSON.parse(JSON.stringify(data));
					   $('#notificacionError').hide();
					   $('#notificacionError').text(obj.responseText);
					   $('#notificacionError').show();
					   $('#notificacionError').fadeOut(4000);
				   },
				   success: function(data) {
					   var select = $("#seccion");
					   select.empty();
					   select.append("<option value='0'>Seccion</option>");
					   $.each(data, function(index, element) {
						   select.append("<option value='" + element.codigoSeccion + "'>" + element.descripcionSeccion + "</option>");
					   });
				   }
				});
		  });
	   $('#seccion').change(function(){
		   var $tabla = $('#tablaProductosContados');
		   $tabla.bootstrapTable({
   				height: 300,
   				url: 'BuscarCodigo',
   				method: 'GET',
   				search: true,
   				queryParams: function(p){
   					return{
   						estanteriaID: $('#estanteria').val(),
	   					seccionID: $('#seccion').val()
   					};
   					
   				},
   				pagination: true,
   				pageSize: 50,
   				pageList: [10, 25, 50, 100, 200],
   				undefinedText: '',
   				showRefresh: true,
   			columns: [
   			{
                field: 'codigoProducto',
                title: 'C\u00F3digo'
            }, 
            {
                field: 'descripcion',
                title: 'Descripcion'
            }, 
            {
                field: 'cantidad',
                title: 'Cant. Toma 2',
                width: '200px',
                editable: {
                	type: 'number',
                	showbuttons: true,
                	emptytext: ''
                }
            },
            {
                field: 'unidadMedida',
                title: 'UM'
            }
            ]
   			});
		   $.fn.editable.defaults.mode = 'inline';

		   $tabla.on('editable-shown.bs.table', function(e, field, row, $el, editable){
			   $('#tablaProductosContados').bootstrapTable('resetView');
			   console.log(editable);
			   console.log(JSON.stringify(editable));
		   });
		   $tabla.on('editable-save.bs.table', function(e, field,row,oldValue){
			   $.ajax({
				   type : 'POST',
				   url : 'TomarConteo',
				   dataType : 'html',
				   data : {
					   unidad: row.unidadMedida,
					   codigop: row.codigoProducto,
					   codigos: $('#seccion').val(),
					   codigoe: $('#estanteria').val(),
					   cantidad: row.cantidad,
					   
				   },
				   error : function(e){
					   var obj = JSON.parse(JSON.stringify(data))
					   $('#notificacionError').text(obj.responseText);
					   $('#notifica cionError').fadeOut(500);
					   $('#notificacionError').fadeOut(500);
				   },
				   success : function(data){
					   notificacionExito(data);
				   }
			   });
		   });
	   });
//	   $(document).on('click', '#tablaConteo2 tbody tr', function(){
//		   alert($(this).index());
//	   });
	   $(document).on('keydown','#codigoToma2', function(e){
		   if(e.keyCode==13){
			   if($('#codigoToma2').val()==''||$('#bodega').val()=='0'){
				   $('#notificacionInfo').text('Necesita ingresar un codigo y seleccionar bodega para buscar.');
				   $('#notificacionInfo').show();
				   $('#notificacionInfo').fadeOut(3000);
				   if($('#bodega').val()=='0'){
					   $('#bodega').click();
					   $('#bodega').focus();
				   }else if($('#codigoToma2').val()==''){
					   $('#codigoToma2').click();
					   $('#codigoToma2').focus();
				   }
			   }else{
				   buscarCodigo();
			   }
		   }
		   
	   });
		   
   });/**Fin de document.ready*/
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
					   
					   if(data=='2'){
						   if(conteo1 == 1 && conteo2 == 1){
							   window.location = "agregar.jsp";
						   }
					   }
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
   //Funcion para separar el texto de la toma y obtener #bodega
   function separarTexto(codigo){
		var cadena = codigo;
	    var particiones = cadena.split(' ');
	    
	    return particiones[4];
	}
//   
   function buscarCodigo(){
	   $.ajax({
		   type : 'POST',
		   url: 'BuscarCodigo',
		   dataType: 'json',
		   data: {
			   codigoProducto : $('#codigoToma2').val(),
			   bodegaID: $('#bodega').val()
		   },
		   error: function(data) {
			   var obj = JSON.parse(JSON.stringify(data));
			   $('#notificacionError').text(obj.responseText);
			   $('#notificacionExito').hide();
			   $('#notificacionError').show();
		   },
		   success: function(data) {
			   $.each(data, function(index, element) {
				   $('#descripcion').val($.trim(element.descripcion));
				   $('#unidad').val($.trim(element.unidadMedida));
			   });
			   $('#tablaDatosToma2').empty();
			   var tabla = $('<table id="tablaConteo2"></table>');
			   var thead = $('<thead></thead>');
			   var enc = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th></tr>');
			   thead.appendTo(tabla);
			   enc.appendTo(thead);
			   tabla.appendTo('#tablaDatosToma2');
			   var $tabla = $('#tablaProductosContados');
			   $tabla.bootstrapTable({
	   				height: 300,
	   				url: 'CargarProductosUbicacion',
	   				method: 'GET',
	   				data : data,
	   				queryParams: function(p){
	   					return{
	   						estanteriaID: $('#estanteria').val(),
		   					seccionID: $('#seccion').val()
	   					};
	   					
	   				},
	   				pagination: true,
	   				pageSize: 50,
	   				pageList: [10, 25, 50, 100, 200],
	   				undefinedText: '',
	   				showRefresh: true,
	   			columns: [
	   			{
                    field: 'codigoProducto',
                    title: 'C\u00F3digo'
                }, 
                {
                    field: 'cantidad',
                    title: 'Cant. Toma 2',
                    width: '200px',
                    editable: {
                    	type: 'text',
                    	showbuttons: false,
                    	emptytext: ''
                    }
                },
                {
                    field: 'unidadMedida',
                    title: 'UM'
                },
                {
                    field: 'bodega',
                    title: 'Bodega'
                },
                {
                    field: 'estanteria',
                    title: 'Estanter\u00EDa'
                },
                {
                    field: 'seccion',
                    title: 'Secci\u00F3n'
                },
                {
                    field: 'estanteriaID',
                    title: 'Estanter\u00EDa'
                },
                {
                    field: 'seccionID',
                    title: 'Secci\u00F3n'
                }
                ]
	   			});
			   $.fn.editable.defaults.mode = 'inline';
			   $tabla.on('editable-save.bs.table', function(e, field,row,oldValue){
				   console.log(row.codigoProducto);
				   console.log(row.bodegaID);
				   console.log(row.seccionID);
				   console.log(row.estanteriaID);
				   console.log(row.cantidad);
				   $.ajax({
					   type : 'POST',
					   url : 'TomarConteo',
					   dataType : 'html',
					   data : {
						   unidad: row.unidadMedida,
						   codigop: row.codigoProducto,
						   codigob: row.bodegaID,
						   codigos: row.seccionID,
						   codigoe: row.estanteriaID,
						   cantidad: row.cantidad,
						   
					   },
					   error : function(e){
						   var obj = JSON.parse(JSON.stringify(data))
						   $('#notificacionError').text(obj.responseText);
						   $('#notificacionError').fadeOut(500);
						   $('#notificacionError').fadeOut(500);
					   },
					   success : function(data){
						   $('#').text(data);
						   $('#exito').fadeIn(500);
						   $('#exito').fadeOut(500);
					   }
				   });
			   });
//								   $tabla.bootstrapTable('updateCell',{
//									   index: $element.parent().index(),
//									   field: 'cantidad',
//									   value: parseInt(params.newValue)
//								   });
		   }
		});
   }
   function cargarBodegas(){
	   $.ajax({
		   type : 'POST',
		   url: 'CargarBodegas',
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
			   
			   $('#notificacionError').text(obj.responseText);
			   $('#notificacionExito').hide();
			   $('#notificacionError').show();
		   },
		   success: function(data) {
			   var select = $("#bodega");
			   select.empty();
			   select.append("<option value='0'>Bodega</option>");
			   $.each(data, function(index, element) {
				   select.append("<option value='" + element.bodegaID + "'>" + element.descripcionBodega + "</option>");
			   });
		   }
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
				from: "bottom",
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
	function cargarEstanteriaAgregar(){
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
				   var select = $("#estanteriaAgregar");
				   select.empty();
				   select.append("<option value='0'>Estanteria</option>");
				   $.each(data, function(index, element) {
					   select.append("<option value='" + element.estanteria_ID + "'>" + element.descripcion + "</option>");
				   });
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
			      seccionID : 1,
			      estanteriaID : 1,
			      
			   },
			   error: function(data) {
				   var obj = JSON.parse(JSON.stringify(data));
				   notificacionError(obj.responseText);
			   }
			});
	}
  }(window.jQuery, window, document));
