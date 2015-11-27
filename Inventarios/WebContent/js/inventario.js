(function($, window, document) {

	$(function() {
		   verificarP1();
		
		$('.mensajes').hide();
		cargarProductosPorUsuario();
//			   	method: 'POST',
//			   	url: 'CargarProductosPorUsuario',
//			   	queryParams: function (p) {
//			   	    return { 
//			   	    	codigoProducto: $('#codigo').text(),
//			   	    	algo: $('#codigo').text(),
//			   	    	algoMas: 'algoMas'
//			   	    };
//			   	},
				
//		$.fn.editable.defaults.mode = 'inline';
//		$('#productosUsuario').on('editable-shown.bs.table', function (field, row, $el, editable){
//			$(window).resize(function () {
//		        $('#productosUsuario').bootstrapTable('resetView');
//		    });
//		});
//		$('#productosUsuario').on('editable-save.bs.table', function (e, field, row, oldValue){
//			
//			console.log('Campo: ' + field);
//			console.log('row.campo: ' + row.cantidad);
//			console.log('Value: ' + oldValue);
//		});
		$(window).resize(function () {
	        $('#productosUsuario').bootstrapTable('resetView');
	    });
	});/**FIN DEL DOCUMENT.READY**/
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
						   
//						   if(data=='2'){
//							   if(conteo1 == 1 && conteo2 == 1){
//								   window.location = "agregar.jsp";
//							   }
//						   }else
					   }
					});
			   }
			});
	   }
	function cargarProductosPorUsuario(){
		$.ajax({
			   type : 'POST',
			   url : 'CargarProductosPorUsuario',
			   dataType : 'json',
			   error : function(data){
//				   alert(JSON.stringify(data));
//				   console.log(JSON.stringify(data));
//				   var obj = JSON.parse(JSON.stringify(data))
				   notificacionError(obj.responseText);
			   },
			   success : function(data){
				   
				   $('#tablaDatos').empty();
				   var tabla = $('<table id="productosUsuario"></table>');
				   var thead = $('<thead></thead>');
				   var enc = $('<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>');
				   thead.appendTo(tabla);
				   enc.appendTo(thead);
				   tabla.appendTo('#tablaDatos');
				   var $tabla = $('#productosUsuario');
				   $tabla.bootstrapTable({
		   				height: 400,
		   				data : data,
		   				pagination: true,
		   				smartDisplay: true,
		   				pageSize: 50,
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
	                    field: 'cantidad',
	                    title: 'Cantidad',
	                    editable: {
	                    	type: 'text',
	                    	showbuttons: false,
	                    	emptytext: ''
	                    }
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
	                    title: 'Secci\u00F3n',
	                    width: '150px'
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
				   $.fn.editable.defaults.mode = 'inline';
				   $tabla.on('editable-save.bs.table', function(e, field,row,oldValue){
					   console.log(row.codigoProducto);
					   console.log(row.seccionID);
					   console.log(row.estanteriaID);
					   console.log(row.cantidad);
					   $.ajax({
						   type : 'POST',
						   url : 'TomarConteo',
						   dataType : 'html',
						   data : {
							   unidad: row.unidad,
							   codigop: row.codigoProducto,
							   codigos: row.seccionID,
							   codigoe: row.estanteriaID,
							   cantidad: row.cantidad,
							   
						   },
						   error : function(e){
							   var obj = JSON.parse(JSON.stringify(data));
							   notificacionError(obj.responseText);
						   },
						   success : function(data){
							   notificacionExito(data);
						   }
					   });
				   });
//				   $tabla.on('click-cell.bs.table', function (e, field, value, row, $element) {
//		   				if(field=='cantidad'){
//							$.fn.editable.defaults.mode = 'inline';
//							$(document).on('keydown',$element, function(e){
//								if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//										(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
//							            (e.keyCode >= 35 && e.keyCode <= 40)) {
//							                 return;
//								}
//								if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//									e.preventDefault();
//								}
//							});
//							$element.editable({
//							    type: 'text',
//							    title: 'Ingrese Cantidad',
//							    showbuttons: false,
//							    defaultValue: '',
//							    emptytext: ''
//							});
//							$element.on('save', function(e, params) {
//								$.ajax({
//								   type : 'POST',
//								   url : 'TomarConteo',
//								   dataType : 'html',
//								   data : {
//									   unidad: row.unidad,
//									   codigop: row.codigoProducto,
//									   codigob: row.bodegaID,
//									   codigos: row.seccionID,
//									   codigoe: row.estanteriaID,
//									   cantidad: params.newValue,
//									   
//								   },
//								   error : function(e){
//									   var obj = JSON.parse(JSON.stringify(data))
//									   $('#notificacionError').text(obj.responseText);
//									   $('#notificacionExito').hide();
//									   $('#notificacionError').show();
//									   $('#notificacionError').fadeOut(2500,complete);
//								   },
//								   success : function(data){
//									   $('#exito').text(data);
//									   $('#exito').show();
//									   $('#exito').fadeOut(3000, 'linear');
//									   console.log($element.parent().index());
//									   $tabla.bootstrapTable('updateCell',{
//										   index: $element.parent().index(),
//										   field: 'cantidad',
//										   value: parseInt(params.newValue)
//									   });
//								   }
//							   });
//						    });
//						}else{
//						}
//		   			});
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
}(window.jQuery, window, document));