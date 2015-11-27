$(document).ready(function(){
	setTimeout(function(){
		   verificarP1();
	    }, 100);
	   setTimeout(function(){
		   verificarP2();
	    }, 200);
	   setTimeout(function(){
		   verificarP3();
	    }, 300);
	   setTimeout(function(){
		   verificarP4();
	    }, 400);
	   setTimeout(function(){
		   verificarP5();
	    }, 500);
	//funcion que verifica los permisos del usuario
	   function verificarP1(id){
		   $.get('Permisos',{
				opcion:$('#conteo1').get(0).id
				},function(responseJson) {
					if(responseJson!=null){
						$.each(responseJson, function(key, value) { 
							if(parseInt(value['permiso'])==1){
								$('#conteo1').show();
							}else{
								$('#conteo1').hide();
							}
					    });
					}
			});
	   }
	   function verificarP2(id){
		   $.get('Permisos',{
				opcion:$('#conteo2').get(0).id
				},function(responseJson) {
					if(responseJson!=null){
						$.each(responseJson, function(key, value) {
							if(parseInt(value['permiso'])==1){
								$('#conteo2').show();
							}else{
								$('#conteo2').hide();
							}
					    });
					}
			});
	   }
	   function verificarP3(id){
		   $.get('Permisos',{
				opcion:$('#inventario').get(0).id
				},function(responseJson) {
					if(responseJson!=null){
						$.each(responseJson, function(key, value) {
							if(parseInt(value['permiso'])==1){
								$('#inventario').show();
							}else{
								$('#inventario').hide();
							}
					    });
					}
			});
	   }
	   function verificarP4(id){
		   $.get('Permisos',{
				opcion:$('#auditoria').get(0).id
				},function(responseJson) {
					if(responseJson!=null){
						$.each(responseJson, function(key, value) {
							if(parseInt(value['permiso'])==1){
								$('#auditoria').show();
							}else{
								$('#auditoria').hide();
							}
					    });
					}
			});
	   }
	   function verificarP5(id){
		   $.get('Permisos',{
				opcion:$('#diferencia').get(0).id
				},function(responseJson) {
					if(responseJson!=null){
						$.each(responseJson, function(key, value) {
							if(parseInt(value['permiso'])==1){
								
								$('#diferencia').show();
							}else{
								$('#diferencia').hide();
							}
					    });
					}
			});
	   }
	cargarTabla();
	var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = 
        ((''+day).length<2 ? '0' : '') + day + '/' +
        ((''+month).length<2 ? '0' : '') + month + '/' +
        d.getFullYear();
	$("#hoy").text(output);
	//validar Campos
	
	
	$('#notificacion').hide();
	$("#popAbrir").click(function(event){
		$("#popCodigoProducto").val("");
		$("#popDescripcionProducto").val("");
		var seccion = document.getElementById("seccion");
		var estanteria = document.getElementById("estanteria");
		var bodega = document.getElementById("bodega");
		if(bodega.value == null || bodega.value == "" || seccion.value == null || seccion.value == "" || estanteria.value == null || estanteria.value == ""){
			$('#popDatosBusqueda tr').each(function(){
				 $(this).remove();
			  });
			$("#popBuscaProd").modal("toggle");
			$("#notificacion").text("las busquedas necesitan bodega, seccion y estanteria");
		}else{
			$('#popDatosBusqueda tr').each(function(){
				 $(this).remove();
			  });
		}
		
		
	});
	
	//Buscar datos en ventana POP
  $("#popBuscarProducto").click(function(event){
		  $('#popDatosBusqueda tr').each(function(){
				 $(this).remove(); 
			  });
		  var codP = $('#popCodigoProducto').val();
		  var descP = $('#popDescripcionProducto').val();
		  var codB = $('#bodega').val();
		  var codE = $('#estanteria').val();
		  var codS = $('#seccionA').val();
			  $.get('BuscaProducto',{
				  codigo:codP,
				  desc:descP,
				  codb:codB,
				  code:codE,
				  cods:codS
				  },function(responseJson) {
			   if(responseJson!=null){
			       $("#popDatosBusqueda").find("tr:gt(0)").remove();
			       var table1 = $("#popDatosBusqueda");
			       var rowHead = $("<tr><th></th><th></th><th></th><th></th><th></th></tr>");
			       rowHead.children().eq(0).text("Codigo Producto");
			       rowHead.children().eq(1).text("Descripcion Producto");
			       rowHead.children().eq(2).text("Unidad de Medida");
			       rowHead.children().eq(3).text("Descripcion Unidad");
			       rowHead.children().eq(4).text("Cantidad");
			       rowHead.appendTo(table1);
			       $.each(responseJson, function(key,value) {
			            var rowNew = $("<tr><td><a href='#'></a></td><td></td><td></td><td></td><td></td></tr>");
			               rowNew.children().children().eq(0).text(value['codigoProducto']);
			               rowNew.children().eq(1).text(value['descripcionProducto']);
			               rowNew.children().eq(2).text(value['unidadMedida']);
			               rowNew.children().eq(3).text(value['descripcionUnidad']);
			               rowNew.children().eq(4).text(value['cantidad']);
			               rowNew.appendTo(table1);
			       });
			       }
			   });
			  $("#tablaPOP").show();
});
  
  
//  $jq("table[id$='datosToma2'] td:nth-child(3)").live('click',function(event){
  	$jq("button[id$='conteo2']").live('click',function(event){
	
	  var $td= $(this).closest('tr').children('td');
	  var $td2= $(this).closest('tr').children('td').children('input');
	  $.post('Conteo2', {
			codigop: $td.eq(0).text(),
			codigob: $td.eq(3).text(),
			codigoe: $td.eq(5).text(),
			codigos: $td.eq(4).text(),
			unidad: $('#unidad').val(),
			cantidad: $td2.eq(0).val()
		}, function(responseText) {
			$td.eq(1).text(responseText)
			$td2.eq(0).val('0');
		});
	  
		
	});
  //para darle accion a la tabla que se carga automaticamente en busqueda
  $jq("table[id$='datosBusqueda'] td:nth-child(1)").live('click',function(event) 
		{  
		//prevenir que se ejecute la accion del link  
		event.preventDefault();  
		var $td= $(this).closest('tr').children('td');  
		var codProd = $td.eq(0).text();  
		var descProd = $td.eq(1).text();
		var conteo1 = $td.eq(2).text();
		var unidad = $td.eq(3).text();
		var bodegaProd = $td.eq(7).text();
		var seccionId = $td.eq(8).text();
		var estanteriaId = $td.eq(9).text();
		$("#codigoProducto").val(codProd); 
		$("#descripcion").val(descProd);
		$("#unidad").val(unidad);
		$("#cantidadActual").val(conteo1);
		$("#bodega").val(bodegaProd);
		$("#seccion").val(seccionId);
		$("#estanteria").val(estanteriaId);
			
		sumarCantidadA();
		}  
  
	);
	
  //tabla dentro de la ventana emergente
	$jq("table[id$='popDatosBusqueda'] td:nth-child(1)").live('click',function(event) 
			{  
			//Para evitar que el link actue.  
			event.preventDefault();  
			var $td= $(this).closest('tr').children('td');
			
			$("#codigoProducto").val($td.eq(0).text()); 
			$("#descripcion").val($td.eq(1).text()); 
			$("#unidad").val($td.eq(3).text());
			$("#cantidadActual").val($td.eq(4).text());
			$("#popBuscaProd").modal("toggle");
			}
			
		);
	
	$jq("table[id$='datosDiferencia'] td:nth-child(1)").live('click',function(event) 
			{
			//Para evitar que el link actue.  
			event.preventDefault();  
			var $td= $(this).closest('tr').children('td');
			
			var codProd = $td.eq(0).text();  
			var codBodega =$td.eq(3).text();
			$('#popProductosDiferencias tr').each(function(){
				 $(this).remove();
			  });
			$.get('CargarProductosDiferencia',
					{codigoP:codProd,codigoB:codBodega},
					function(responseJson) {
				   if(responseJson!=null){
				       $("#popProductosDiferencias").find("tr:gt(0)").remove();
				       var table1 = $("#popProductosDiferencias");
				       var rowHead = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th></tr>");
				       rowHead.children().eq(0).text("Codigo Producto");
				       rowHead.children().eq(1).text("Descripcion Producto");
				       rowHead.children().eq(2).text("Unidad de Medida");
				       rowHead.children().eq(3).text("Cantidad");
				       rowHead.children().eq(4).text("Bodega");
				       rowHead.children().eq(5).text("Seccion");
				       rowHead.children().eq(6).text("Estanteria");
				       
				       rowHead.appendTo(table1);
				       $.each(responseJson, function(key,value) {
				            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>");
				               rowNew.children().children().eq(0).text(value['codP']);
				               rowNew.children().eq(1).text(value['descP']);
				               rowNew.children().eq(2).text(value['uniP']);
				               rowNew.children().eq(3).text(value['cantidad']);
				               rowNew.children().eq(4).text(value['bodega']);
				               rowNew.children().eq(5).text(value['seccion']);
				               rowNew.children().eq(6).text(value['estanteria']);
				               rowNew.appendTo(table1);
				       });
				       }
				   });
				  $("#popProductosDiferencias").show();
			}
			
		);
	
	//editar de la tabla popProductosDiferencia
	
	$jq("table[id$='popProductosDiferencias'] td:nth-child(1)").live('click',function(event) 
			{
			//Para evitar que el link actue.  
			event.preventDefault();  
			var $td= $(this).closest('tr').children('td');
			var codProd = $td.eq(0).text();  
			var descProd = $td.eq(1).text();
			var unidad = $td.eq(2).text();
			var cantidad = $td.eq(3).text();
			var bodega = $td.eq(4).text();
			var seccion = $td.eq(5).text();
			var estanteria = $td.eq(6).text();
			
			$("#codigoProducto").val(codProd); 
			$("#descripcion").val(descProd);
			$("#seccion").val(seccion);
			$("#estanteria").val(estanteria);
			$("#bodega").val(bodega);
			
			$("#unidad").val(unidad);
			
			$("#cantidadActual").val(cantidad);
			}
			
		);
	
	
	
	
	//Manejo de cantidades AGREGAR PRODUCTO
	$("#cantidad").keyup(function(){
		var cantidadActual = parseInt($('#cantidadActual').val());
		var cantidadIngresada = parseInt($('#cantidad').val());
		
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
	});
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
	//Manejo de cantidades EDITAR PRODUCTO
	$("#cantidadA").keyup(function(){
		var cantidadActual = parseInt($('#cantidadActual').val());
		var cantidadIngresada = parseInt($('#cantidadA').val());
		
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
	});
	function sumarCantidadA(){
		var cantidadActual = parseInt($('#cantidadActual').val());
		var cantidadIngresada;
		if($('#cantidadA').val() ==  ''){
			cantidadIngresada=0;
		}else{
			cantidadIngresada = parseInt($('#cantidadA').val());
		}
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
		$('#cantidadA').focus();
	}
	
	
	//Buscar datos del codigo ingresado al presionar enter
	$(document).on('keydown','#codigoProducto', function(e){
		if(e.keyCode==13||e.keyCode==9){
			$.ajax({
				   type : 'POST',
				   url: 'BuscarProducto',
				   dataType: 'text',
				   data: {
				      codigoProducto : $(this).val(),
				      bodegaID : $('#bodega').val(),
				      seccionID : $('#seccionA').val(),
				      estanteriaID : $("#estanteria").val(),
				      
				   },
				   error: function(data) {
				      alert(data);
				   },
				   success: function(data) {
					   $.each(data, function(index, element) {
						   $(this).val(element.codigoProducto);
						   $('#descripcion').val(element.descripcion);
						   $('#unidad').val(element.unidadInventario);
						   $('#cantidadActual').val(element.conteo1);
					   });
				   }
				});
		}
	});
	$("#codigoooooo").keydown(function(e){
		if(e.keyCode==13 || e.keyCode==9){
			var seccion = document.getElementById("seccionA");
			var estanteria = document.getElementById("estanteria");
			var bodega = document.getElementById("bodega");
			if(bodega.value == null || bodega.value == "" || seccion.value == null || seccion.value == "" || estanteria.value == null || estanteria.value == ""){
				$("#notificacion").text("Necesita seleccionar bodega, seccion y estanteria");
			}else{
				
				$.get('AutocompletarCodigo',{
					codP:$("#codigoProducto").val(),
					codb:$("#bodega").val(),
					code:$("#estanteria").val(),
					cods:$("#seccionA").val()
					},function(responseJson) {
					   if(responseJson!=null){
					       $.each(responseJson, function(key, value) {
					            $("#codigoProducto").val(value['codigoProducto']);
					            $("#descri+" +
					            		"pcion").val(value['descripProducto']);
					            $("#unidad").val(value['unidadMedida']);
					            $("#cantidadActual").val(value['cantidad']);
							    
					       });
					       sumarCantidad();
					       }
					   
					   });
				$("#cantidad").focus();
				
			}
		}
	});
	
	//buscar producto toma 2
	$("#codigoToma2").keydown(function(e){
		if(e.keyCode==13 || e.keyCode==9){
			var codP = $(this).val();
			var texto = $("#txtToma").text();
			
			var codB = separarTexto(texto);
			$.get('CargarProductosDiferencia',
					{codigoP:codP,codigoB:codB},
					function(responseJson) {
				   if(responseJson!=null){
					   $('#datosToma2 tr').each(function(){
							 $(this).remove();
						  });
				       var table1 = $("#datosToma2");
				       var head = $("<thead></thead>");
				       var rowHead = $("<tr> <th></th> <th></th> <th></th> <th></th> <th></th> <th></th> </tr>");
				       rowHead.children().eq(0).text("Codigo Producto");
				       rowHead.children().eq(1).text("Cantidad Actual");
				       rowHead.children().eq(2).text("Cantidad");
				       rowHead.children().eq(3).text("Bodega");
				       rowHead.children().eq(4).text("Seccion");
				       rowHead.children().eq(5).text("Estanteria");
				       
				       rowHead.appendTo(head);
				       head.appendTo(table1);
				       var tbody = $("<tbody></tbody>");
				       
				       $.each(responseJson, function(key,value) {
				            var rowNew = $("<tr> <td><a href='#'></a></td> <td></td> <td><input type='number' id='cantidad' value='0'><button  type='button' id='conteo2'>Contar</button></td> <td></td> <td></td> <td></td></tr>");
				               rowNew.children().children().eq(0).text(value['codP']);
				               rowNew.children().eq(1).text(parseFloat(value['cantidad']).toFixed(1));
				               rowNew.children().eq(3).text(value['bodega']);
				               rowNew.children().eq(4).text(value['seccion']);
				               rowNew.children().eq(5).text(value['estanteria']);
				               rowNew.appendTo(tbody);
				               $("#codigoToma2").val(value['codP'])
				               $("#descripcion").val(value['descP']);
				               $("#unidad").val(value['uniP']);
				       });
				       tbody.appendTo(table1);
				       }
				   });
				  $("#datosToma2").show();
		}
	});
	
	//funcion autocompletar al presionar tab Buscar Producto
	$("#codigoProducto1").keydown(function(e){
		if(e.keyCode==13){
			var cod = $("#codigoProducto1").val();
			$.get('AutocompletarCodigo',{codP:cod},function(responseJson) {
				   if(responseJson!=null){
				       
				       $.each(responseJson, function(key, value) {
				            $("#codigoProducto").val(value['codigoProducto']);
				            $("#descripcion").val(value['descripProducto']);
				            $("#unidad").val(value['unidadMedida']);
				       });
				       }
				   });
		$("#popEditar").modal();
		}
	});
	//tomar Inventario
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
	function Total(){
		var cantidadActual = parseInt($('#cantidadActual').val());
		var cantidadIngresada = parseInt($('#cantidad').val());
		var total = $('#cantidadTotal').val((cantidadActual + cantidadIngresada));
	}
	//Agregar al presionar Enter en cantidad
	$("#cantidad").keydown(function (e){
		if(e.keyCode==13){
			if($('#cantidad').val() === ''){
				$('#notificacion').text("debe ingresar al menos cero 0");
			}else{
				agregarAInventario();
			}
		}
	});
	$('#tomarInventario').click(function (event){
		var total =  parseInt($('#cantidadTotal').val());
//		if(total<0){
//			$('#notificacion').text('La cantidad total debe ser menor o igual a cero');
//		}else{
			agregarAInventario();
//		}
		
	});
	
	//Actualizar Inventario
	$('#actualizarProd').click(function (event){
		var total =  parseInt($("#cantidadTotal").val());
		if(total<0){
			$("#notificacion").text("La cantidad total debe ser menor o igual a cero");
		}else{
			ActualizarProd();
		}
		
	});
	//Agregar al presionar Enter en cantidad
	$("#cantidadA").keydown(function (e){
		if(e.keyCode==13){
			ActualizarProd();
			
		}
	});
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
			$('#cantidadA').val("");
			$('#cantidadTotal').val("");
			$('#cantidadActual').val("");
			$("#bodega option[value="+""+"]").attr("selected",true);
			$("#estanteria option[value="+""+"]").attr("selected",true);
			$("#seccion option[value="+""+"]").attr("selected",true);
			
		});
		location.reload();
	}
	
	
	function valoresCombo(){
		var bodega;
		var seccion;
		var estanteria;
	}
	function cargarTabla(){
		  $.get('CargarProductos',function(responseJson) {
			   if(responseJson!=null){
			       var contenedor = $("#tablaDatos");
			       var table1 = $("<table id='datosBusqueda' class='table table-striped table-bordered table-condensed'></table>");
			       var thead = $("<thead></thead>");
			       
			       var rowHead = $("<tr> <th ></th> <th ></th> <th ></th> <th ></th> <th ></th> " +
			       						"<th ></th> <th ></th> <th ></th> <th ></th> <th ></th> </tr>");
			       var tbody=$("<tbody></tbody>");
			       rowHead.children().eq(0).text("Codigo Producto");
			       rowHead.children().eq(1).text("Descripcion");
			       rowHead.children().eq(2).text("Cantidad");
			       rowHead.children().eq(3).text("Unidad");
			       rowHead.children().eq(4).text("Bodega");
			       rowHead.children().eq(5).text("Seccion");
			       rowHead.children().eq(6).text("Estanteria");
			       rowHead.children().eq(7).text("Cod. Bod.");
			       rowHead.children().eq(8).text("Cod. Sec.");
			       rowHead.children().eq(9).text("Cod. Est.");
			       
			       
			       rowHead.appendTo(thead);
			       table1.appendTo(contenedor);
			       thead.appendTo(table1);
			       tbody.appendTo(table1);
			       $.each(responseJson, function(key,value) {
			    	   var rowNew = $("<tr><td><a href='#' data-toggle='modal' data-target='#popEditar'></a></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr>");
			               rowNew.children().children().eq(0).text(value['codP']);
			               rowNew.children().eq(1).text(value['descP']);
			               rowNew.children().eq(2).text(parseInt(value['conteo']));
			               rowNew.children().eq(3).text(value['unidad']);
			               rowNew.children().eq(4).text(value['descB']);
			               rowNew.children().eq(5).text(value['descS']);
			               rowNew.children().eq(6).text(value['descE']);
			               rowNew.children().eq(7).text(value['codB']);
			               rowNew.children().eq(8).text(value['codS']);
			               rowNew.children().eq(9).text(value['codE']);
			               rowNew.appendTo($("table tbody"));
			       });
			       $('#datosBusqueda').dataTable( {
			    	   "scrollY" : 200,
			    	   "scrollX" : true,
				        "language": {
				            "url": "//cdn.datatables.net/plug-ins/1.10.7/i18n/Spanish.json"   	
				        }
			       	
				    });
			       
			       }
			   });
		  		
	}
	
	//funcion cuando autocompletar on focus
	$( "#descripcion" ).focus(function() {
		var cod = $("#codigoProducto").val();
		$.get('AutocompletarCodigo',{codP:cod},function(responseJson) {
			   if(responseJson!=null){
			       
			       $.each(responseJson, function(key, value) {
			            $("#codigoProducto").val(value['codigoProducto']);
			            $("#descripcion").val(value['descripProducto']);
			            $("#unidad").val(value['unidadMedida']);
			       });
			       }
			   });
		
		});
	//Funcion para validar solo numeros
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
	 
	//funcion split
	function separarTexto(codigo){
		var cadena = codigo;
	    var particiones = cadena.split(' ');
	    
	    return particiones[4];
	}
	
	$( "input[type=text]" ).focus(function() {
		$( this ).css({'background-color':'F5FFD6'});
	});
	
	function esMuestra(){
		var opcion = $('#estanteria');
		var estanteriaID = opcion.val();
		$.get('EsMuestra', {
			codigoe: estanteriaID
		}, function(responseText) {
			$("#cantidad").val(responseText);
		});
	}
	$('#estanteria').change(function(){
		 var opcion = $(this).find('option:selected');
		 var idEst = $(opcion).val();
		 $.get('EsMuestra', {
				codigoe: idEst
			}, function(responseText) {
				$('#cantidad').val(responseText);
			});
	});
	$('#estanteria').change(function(){
		 var opcion = $(this).find('option:selected');
		 var idEst = $(opcion).val();
//		 $.ajax({
//			   type : 'POST',
//			   url: 'BuscaSeccion',
//			   dataType: 'json',
//			   data: {
//			      codigoe : idEst
//			      
//			   },
//			   error: function(data) {
//			      alert(data);
//			   },
//			   success: function(data) {
//				   alert(JSON.stringify(data));
//				    
//				   	var select = $("#seccionA");
//					select.empty();
//					select.append("<option value=''>Seccion</option>");
//				   $.each(data, function(index, element) {
//					   alert(element.codigoSeccion + ' ' + element.descripcionSeccion);
//					   select.append("<option value='" + element.codigoSeccion + "'>" + element.descripcionSeccion + "</option>");
//				   });
//			   }
//			});
		 $.post('BuscaSeccion', {
				codigoe: idEst
			}, function(responseJson) {
				
				if(responseJson!=null){
					var select = $("#seccionA");
					select.empty();
					select.append("<option value=''>Seccion</option>");
					$.each(responseJson, function(key, value) {
						alert('Done');
//						select.append("<option value='" + value['codigoSeccion'] + "'>" + value['descripcionSeccion'] + "</option>");

			       });
				}
			});
	});
	
});
	  