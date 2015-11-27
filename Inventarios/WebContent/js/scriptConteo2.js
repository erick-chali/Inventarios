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
	   
		/**Ir a buscar datos del codigo ingresado en toma 2*/
		   $("#codigoToma2222").keydown(function(e){

				
				if(e.keyCode==13 || e.keyCode==9){
					$('#tablaDatosToma2').empty();
					var codP = $(this).val();
					var texto = $("#txtToma").text();
					var codB = separarTexto(texto);
					$.get('CargarProductosDiferencia',
							{codigoP:codP,codigoB:codB},
							function(responseJson) {
						   if(responseJson!=null){
							   
							   var contenedor = $("#tablaDatosToma2");
							   var table1 = $("<table id='datosToma2' class='table table-striped table-bordered table-condensed'></table>");
						       var thead = $("<thead></thead>");
						       var tbody = $("<tbody></tbody>");
						       var rowHead = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>");
						       rowHead.children().eq(0).text("Codigo Producto");
						       rowHead.children().eq(1).text("Cantidad Actual");
						       rowHead.children().eq(2).text("Cantidad");
						       rowHead.children().eq(3).text("Bodega");
						       rowHead.children().eq(4).text("Estanteria");
						       rowHead.children().eq(5).text("Seccion");
						       
						       rowHead.appendTo(thead);
						       table1.appendTo(contenedor);
						       
						       thead.appendTo(table1);
						       tbody.appendTo(table1);
						       
						       $.each(responseJson, function(key,value) {
						    	   
						    	   $("#codigoToma2").val(value['codP'])
					               $("#descripcion").val(value['descP']);
					               $("#unidad").val(value['uniP']);
						            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> <td><input type='number' id='cantidad' value='0'><button  type='button' id='conteo'>Contar</button></td> <td></td> <td></td> <td></td></tr>");
						               rowNew.children().children().eq(0).text(value['codP']);
						               rowNew.children().eq(1).text(parseFloat(value['cantidad']).toFixed(1));
						               rowNew.children().eq(3).text(value['bodega']);
						               rowNew.children().eq(4).text(value['estanteria']);
						               rowNew.children().eq(5).text(value['seccion']);
						               rowNew.appendTo($("table tbody"));
						               
						               
						       });
						       
						       $('#datosToma2').dataTable( {
						    	   "scrollY" : 200,
						    	   "scrollX" : true,
							        "language": {
							            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
							        }
						       	
							    });
						       $("#codigoToma2").focusout();
						       }
						   });
				}
			});
//		   $(document).on('click-cell.bs.table','#tablaConteo2',function(field, value, row, $element){
//		   $('#tablaConteo2').on('click-cell.bs.table', function (e, field, value, row, $element) {
//			   
//		   });
		   
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
  }(window.jQuery, window, document));
