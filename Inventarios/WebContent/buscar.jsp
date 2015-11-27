<%@page import="java.util.concurrent.Callable"%>
<%@page import="java.sql.CallableStatement"%>
<%@page import="java.sql.SQLException"%>
<%@page import="com.imsa.inventario.conexion.ConectarDB"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta lang="es">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="img/inventario.ico">
        <title>Diferencias</title>
        <link type="text/css" rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.0/bootstrap-table.min.css">
        <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
        
        <link rel="stylesheet" href="css/animate.css">
        <link type="text/css" rel="stylesheet" href="css/style.css">
		
        
    </head>
    <body>
 
		<!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">Editar</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="agregar.jsp" id="conteo1">Toma 1</a></li>
            <li><a href="agregar2.jsp" id="conteo2">Toma 2</a></li>
            <li class="active"><a href="buscar.jsp" id="inventario">Inventario</a></li>
            <li><a href="admin.jsp" id="auditoria">Auditor&iacute;a</a></li>
            <li><a href="diferencia.jsp" id="diferencia">Diferencias</a></li>
            <!---agegar mas <li> para agregar mas opciones--->
          </ul>
          <ul class="nav navbar-nav navbar-right">
          	<li><a></a></li>
            <li><a>Usuario Conectado: ${usuarioGlobal} </a></li>
            <li><a></a></li>
            <li><a href="Logout">Cerrar Sesión</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <img alt="Instalaciones Modernas" src="img/s.jpg" align="middle" id="logo" class="center-block">
    	<h5 id="hoy" class="text-right"></h5>
        <h3 class="text-center">Inventario de Productos</h3>
        <div id="tope"></div>
        <div class="table-responsive">
			<div id="tablaDatos" class="container">
			</div>
		</div>
        <!--  
        <div class="table-responsive">
			<div id="tablaDatos" class="container">
				<table id="productosUsuario" data-toggle="table" 
						data-height="400"
						data-url="CargarProductosPorUsuario"
						data-method="GET"
						data-pagination=true
						data-search=true
						data-undefined-text=""
						data-striped=true
				>
					<thead>
						<tr>
							<th data-field="noToma" data-sortable=true>Toma</th>
							<th data-field="codigoProducto" data-sortable=true>Codigo Producto</th>
							<th data-field="descripcion" data-sortable=true>Descripcion</th>
							<th data-field="unidad" data-sortable=true>Unidad</th>
							<th data-field="cantidad" data-sortable=true data-editable="true">Cantidad</th>
							<th data-field="bodega" data-sortable=true>Bodega</th>
							<th data-field="estanteria" data-sortable=true>Estanteria</th>
							<th data-field="seccion" data-sortable=true>Seccion</th>
							<th data-field="bodegaID" data-visible=false>BodegaID</th>
							<th data-field="seccionID" data-visible=false>SeccionID</th>
							<th data-field="estanteriaID" data-visible=false>EstanteriaID</th>
						</tr>
					</thead>
				</table>
			</div>
        </div>
        -->
        <div class="alert alert-danger mensajes" role="alert" id="errores">
  			<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  			<h5 id="mensajeError"></h5>
  		</div>
  		<div class="alert alert-success mensajes" role="alert" id="exito">
  			<span class="glyphicon glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
  			<h5 id="mensajeExito"></h5>
  		</div>
  		<div class="alert alert-info mensajes" role="alert" id="infor">
  			<span class="glyphicon glyphicon glyphicon-info-sign" aria-hidden="true"></span>
  			<h5 id="mensajeInfo"></h5>
  		</div>
	
	
	<footer>
		<h5 class="text-center"> ${usuarioGlobal}</h5>    
	</footer>
	    
	    
	    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
	    
	    <script src="js/bootstrap.min.js"></script>
	    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.0/bootstrap-table.min.js"></script>
	    <script src="js/bootstrap-table-es-MX.js"></script>
	    <script src="js/bootstrap-table-editable.js"></script>
	    <script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
	<script src="js/bootstrap-notify.min.js"></script>
	    <script src="js/inventario.js"></script>
	</body>
</html>

