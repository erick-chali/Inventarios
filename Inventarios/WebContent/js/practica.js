(function($, window, document) {
   $(function() {
		$(window).resize(function () {
	           $('#datosVarios').bootstrapTable('resetView');
	       });
	   $('#datosVarios').bootstrapTable({
		   		height: 100,
				pagination: true,
				pageSize: 50,
				pageList: [10, 25, 50, 100, 200],
				undefinedText: '',
				classes: 'table table-condensed',
			columns: [
			{
           field: 'codigoProducto',
           title: 'C\u00F3digo',
           editable: {
        	   type: 'text',
        	   showbuttons: false,
        	   emptytext: ''
           }
       }, 
       {
           field: 'unidad',
           title: 'UM',
       },
       {
           field: 'descripcion',
           title: 'Descripcion'
       },
       {
           field: 'cantidad',
           title: 'Cant.'
       },
       {
           field: 'disponible',
           title: 'Disp.'
       },
       {
           field: 'precio',
           title: 'PU'
       },
       {
           field: 'porcentaje',
           title: '%'
       },
       {
           field: 'descuento',
           title: 'Desc.'
       },
       {
           field: 'importe',
           title: 'Importe'
       },
       {
           field: 'bodega',
           title: 'BD'
       },
       {
           field: 'envvia',
           title: 'Envia'
       },
       {
           field: 'descuentoMaximo',
           title: 'DM'
       },
       {
           field: 'observaciones',
           title: 'Observaciones'
       }
       ]
	   });
   
   	$tabla = $('#datosVarios');
		   $tabla.bootstrapTable('insertRow', {
           index: 1,
           row: {
               codigoProducto: '001101'
           }
       });
		   
   });

  }(window.jQuery, window, document));

