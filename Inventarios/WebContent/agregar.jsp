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
        <title>Toma 1</title>
        <link type="text/css" rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.0/bootstrap-table.min.css">
        <!-- 
        <link type="text/css" rel="stylesheet" href="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css">
         -->
        <link rel="stylesheet" href="css/animate.css">
        <link type="text/css" rel="stylesheet" href="css/style.css">
        
		
        
    </head>
    <body>
	<!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" id="barraNav">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">Tomar Inventario</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active" id="toma1"><a href="agregar.jsp" class="active" id="conteo1">Toma 1</a></li>
            <li ><a href="agregar2.jsp" id="conteo2">Toma 2</a></li>
            <li ><a href="buscar.jsp" id="inventario">Inventario</a></li>
            <li><a href="admin.jsp" id="auditoria">Auditor&iacute;a</a></li>
            <li><a href="diferencia.jsp" id="diferencia">Diferencias</a></li>
            <!---agegar mas <li> para agregar mas opciones--->
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a>Usuario Conectado: ${usuarioGlobal}</a></li>
            <li><a></a></li>
            <li><a href="Logout">Cerrar Sesión</a></li>
          </ul> 
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <img alt="Instalaciones Modernas" src="img/s.jpg" class="center-block">
    	<h5 class="text-left" id="hoy"></h5>
        <h4 class="text-center" id="txtToma">${textoToma}</h4>
        <div id="tope"></div>
    <button id="btnOcultarContenedor" class="btn btn-default visible-xs visible-sm">Ocultar</button>
    <div class="panel panel-default">
            <div class="panel-heading"></div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-4 col-md-4" id="contenedorCombos">
                            
                            <label for="estanteria" class="text-right">Estanteria</label>
                            <select id="estanteria" class="form-control" class="required">
				                    
			                	</select>
			                	<label for="seccionA" class="text-right">Seccion</label>
			                	<select id="seccionA" class="form-control" class="required">
				                    
			                	</select>
                            
                        </div>
                        <div class="col-sm-4 col-md-4">
                            
                            <label for="codigoProducto" class="text-right">Codigo Producto</label>
                            <input type="checkbox" id="esDF">
                            <input class="form-control" type="text" id="codigoProductoDF" placeholder="Codigo ProductoDF">
                            <input class="form-control" type="number" id="codigoProducto" placeholder="Codigo Producto">
                            
                            <div class="col-sm-12 col-md-12">
                            	<button class="btn btn-default col-xs-6 col-sm-6 col-md-6" id="popAbrir"data-toggle="modal" data-target="#popBuscaProd" style="background-color: #CCEEFF">Buscar Productos</button>
                            	<button class="btn btn-primary col-xs-6 col-sm-6 col-md-6 visible-xs visible-sm" id="buscarProducto" >Buscar</button>
                            </div>
                            
                            
                            <label for="descripcion" class="text-right">Descripción</label>
                            <input class="form-control"  type="text" id="descripcion" name="descripcion" placeholder="Descripción" disabled>
                            <label for="unidad">Unidad de Medida</label>
                            <input class="form-control" type="text" id="unidad" name="unidad" placeholder="Unidad Medida" disabled>  
                            
                                
                        </div>
                        <div class="col-sm-4 col-md-4">
                            <label for="cantidadActual" class="text-right">Cantidad Actual</label>
                            <input class="form-control" type="text" id="cantidadActual" name="cantidad" placeholder="Cantidad Actual" disabled>
                            <label for="cantidad" class="text-right">Cantidad Producto</label>
                            <input class="form-control" type="number" id="cantidad" placeholder="*Cantidad" >
                            <label for="total" class="text-right">Total</label>
                            <input class="form-control" type="text" id="cantidadTotal" placeholder="*Cantidad" disabled>
                        </div>
                        <div class="col-sm-12 col-md-12">
                        	<button class="btn btn-default btn-lg" type="button" id="tomarInventario" style="background-color: #CCEEFF">Agregar a Inventario</button>
                        </div>
                    </div>
                </div>
            <div class="panel-footer">
				<h3 id="notificacionExito" class="alert alert-success" role="alert"></h3>
        		<h3 id="notificacionError" class="alert alert-danger" role="alert"></h3>
				<h3 id="notificacionInfo" class="alert alert-info" role="alert"></h3>
            </div>
        </div>
	<div class="container">
	</div>
    <div class="modal fade " id="popBuscaProd">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button class="close" data-dismiss="modal">&times;</button>
				    <h4>Buscar Informacion del Producto</h4>
				</div><!-- Encabezado  -->
				<div class="modal-body">
					<label for="popCodigoProducto">Codigo Producto</label>
					<input id="popCodigoProducto" class="form-control" type="number">
					<label for="popDescripcionProducto">Descripcion de Producto</label>
				    <input id="popDescripcionProducto" class="form-control" type="text">
				    <label class="text-danger" id="lblMensaje"></label>
				   	<button type="button" class="btn btn-default btn-lg form-control" id="popBuscarProducto" name="popBuscarProducto">
                    	<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                    <div id="tablaPOP" >
	                    
	            	</div>
				</div><!-- Componentes  -->
			</div><!-- Contenido  -->
		</div><!-- Dialog  -->
	</div><!--Ventana Pop Up Buscar Producto -->
    
    
    <div class="modal fade " id="popAlertaConteo">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button class="close" data-dismiss="modal">&times;</button>
				    <h4>C&oacute;digo ya contado.</h4>
				</div><!-- Encabezado  -->
				<div class="modal-body">
					<label id="mensajeConteo"></label>
					<button type="button" class="btn btn-sm btn-success" id="alertaSi">S&iacute;</button>
					<button type="button" class="btn btn-sm btn-danger" id="alertaNo">No</button>
				</div><!-- Componentes  -->
			</div><!-- Contenido  -->
		</div><!-- Dialog  -->
	</div><!--Ventana Pop Up Buscar Producto -->
    
	<footer>
    	<h5 class="text-center"> ${usuarioGlobal}</h5>
    </footer>
    
    
    
	<script src="js/jquery-2.1.4.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.0/bootstrap-table.min.js"></script>
	<script src="js/bootstrap-table-es-MX.js"></script>
	<script src="js/bootstrap-notify.min.js"></script>
	<script src="js/scriptConteo1.js"></script>
	<!-- 
	
	<script src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
	<script src="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>
	 -->
</body>
</html>
		