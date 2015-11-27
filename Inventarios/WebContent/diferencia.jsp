<%@page import="java.sql.SQLException"%>
<%@page import="com.imsa.inventario.conexion.ConectarDB"%>
<%@page import="com.imsa.inventario.dao.ObtenerToma"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.CallableStatement"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
    <head>
        <meta charset="utf-8">
        <meta lang="es">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="img/inventario.ico">
        <title>Diferencias</title>
        <link type="text/css" rel="stylesheet" href="css/bootstrap.css">
        <link type="text/css" rel="stylesheet" href="css/bootstrap-table.css">
        <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
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
          <a class="navbar-brand" href="">Diferencias</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="agregar.jsp" id="conteo1">Toma 1</a></li>
            <li><a href="agregar2.jsp" id="conteo2">Toma 2</a></li>
            <li ><a href="buscar.jsp" id="inventario">Inventario</a></li>
            <li><a href="admin.jsp" id="auditoria">Auditor&iacute;a</a></li>
            <li class="active"><a href="diferencia.jsp" id="diferencia">Diferencias</a></li>
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
        <h3 class="text-center">Diferencias</h3>
        <div id="tope"></div>
        
		<h3 id="notificacionExito" class="alert alert-success" role="alert"></h3>
        <h3 id="notificacionError" class="alert alert-danger" role="alert"></h3>
		<h3 id="notificacionInfo" class="alert alert-info" role="alert"></h3>
        <div id="contenedorDiferencias" class="table-responsive">
        	<table id="tablaDatosDiferencia"></table>
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
	    <script src="js/scriptDiferencia.js"></script>
	</body>
</html>