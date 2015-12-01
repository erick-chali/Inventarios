(function($, window, document) {

  
 $(function() {
	 $('#usuario').focus();
	 $('#btnInicia').click(function(){
		 if($('#usuario').val()==''||$('#clave').val()==''||$('#noToma').val()=='0'){
			 
			alert('Necesita ingresar usuario, clave y seleccionar toma.'); 
			if($('#usuario').val()==''){
				 $('#usuario').focus();
				 $('#usuario').click();
			 }else if($('#clave').val()==''){
				 $('#clave').focus();
				 $('#clave').click();
			 }else if($('#noToma').val()=='0'){
				 $('#noToma').focus();
				 $('#noToma').click();
			 }
		 }else{
			 $.ajax({
				   type : 'POST',
				   url: 'Login',
				   dataType: 'text',
				   data: {
				      usuario : $('#usuario').val(),
				      clave : $('#clave').val(),
				      noToma : $('#noToma').val(),
				      texto : $("#noToma option:selected").text(),
				      
				   },
				   error: function(data) {
				      
				   },
				   success: function(data) {
					   if(data == "1"){
						   location.href = 'agregar.jsp'
					   }else if(data == '0'){
						   alert('Usuario o clave incorrectos');
					   }else if(data == '2'){
						   alert('Usuario no esta activo, avocarse con admin de sistema.');
					   }else{
						   console.log(JSON.stringify(data));
						   alert('Error:' + data);
					   }
				   }
				});
		 }
			
		});
 });
 //resto del codigo
}(window.jQuery, window, document));