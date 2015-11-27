<%@page import="java.sql.SQLException"%>
<%@page import="com.imsa.inventario.conexion.ConectarDB"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.CallableStatement"%>
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
        <title>Conteo2</title>
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
            <li class="active"><a href="agregar2.jsp" id="conteo2">Toma 2</a></li>
            <li><a href="buscar.jsp" id="inventario">Inventario</a></li>
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
        <h5 class="text-left" id="hoy"></h5>
        <h4 class="text-center" id="txtToma">${textoToma}</h4>
        <div id="tope">
        </div>
        
	<div class="panel panel-default">
            <div class="panel-heading"></div>
                <div class="panel-body ">
                    <div class="row">
                        <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1">
                        	<label>Estanter&iacute;a</label>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-5 col-lg-5">
                        	<select id="estanteria" class="input-sm form-control">
                        		<option>Estanter&iacute;a</option>
                        	</select>      
                        </div>
                        <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1">
                        	<label>Secci&oacute;n</label>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-5 col-lg-5">
                        	
							<select id="seccion" class="input-sm form-control">
								<option>Secci&oacute;n</option>
							</select>
                        </div>
                    </div>
                </div>
            <div class="panel-footer">
            	
            </div>
	</div>
	
	<div class="table-responsive">
		<div id="tablaDatosToma2" >
			<table id="tablaProductosContados"></table>
		</div>
	</div>
	
	<div class="container">
		<h4 id="notificacionExito" class="alert alert-success" role="alert"></h4>
        <h4 id="notificacionError" class="alert alert-danger" role="alert"></h4>
		<h4 id="notificacionInfo" class="alert alert-info" role="alert"></h4>
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
	<script src="js/scriptConteo2.js"></script>
</body>
</html>